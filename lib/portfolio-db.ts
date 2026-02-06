import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

type StatementLike = {
  get: () => unknown;
  run: (...args: unknown[]) => void;
};

type DatabaseLike = {
  exec: (sql: string) => void;
  prepare: (sql: string) => StatementLike;
  close: () => void;
};

const { DatabaseSync } = require("node:sqlite") as {
  DatabaseSync: new (path: string) => DatabaseLike;
};

const DB_PATH = process.env.PORTFOLIO_DB_PATH || join(process.cwd(), "data", "portfolio.db");

function withDatabase<T>(runner: (db: DatabaseLike) => T): T {
  mkdirSync(dirname(DB_PATH), { recursive: true });

  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio_store (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      payload TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  try {
    return runner(db);
  } finally {
    db.close();
  }
}

export function readPortfolioData(): unknown | null {
  return withDatabase((db) => {
    const row = db.prepare("SELECT payload FROM portfolio_store WHERE id = 1").get() as
      | { payload: string }
      | undefined;

    if (!row) {
      return null;
    }

    try {
      return JSON.parse(row.payload) as unknown;
    } catch {
      return null;
    }
  });
}

export function writePortfolioData(data: unknown): void {
  withDatabase((db) => {
    db.prepare(
      `
        INSERT INTO portfolio_store (id, payload, updated_at)
        VALUES (1, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          payload = excluded.payload,
          updated_at = excluded.updated_at
      `,
    ).run(JSON.stringify(data), new Date().toISOString());
  });
}
