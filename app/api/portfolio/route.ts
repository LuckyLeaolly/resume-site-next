import { NextResponse } from "next/server";

import { readPortfolioData, writePortfolioData } from "../../../lib/portfolio-db";
import { portfolioSeed } from "../../../lib/portfolio-seed";

export const dynamic = "force-dynamic";

function canWrite(request: Request): boolean {
  const expectedToken = process.env.ADMIN_TOKEN?.trim();

  if (!expectedToken) {
    return true;
  }

  const headerToken = request.headers.get("x-admin-token")?.trim();

  if (headerToken && headerToken === expectedToken) {
    return true;
  }

  const authHeader = request.headers.get("authorization")?.trim();

  if (authHeader?.startsWith("Bearer ")) {
    const bearerToken = authHeader.slice("Bearer ".length).trim();
    return bearerToken === expectedToken;
  }

  return false;
}

export async function GET() {
  const data = readPortfolioData();

  if (!data) {
    writePortfolioData(portfolioSeed);
    return NextResponse.json(portfolioSeed);
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  if (!canWrite(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as unknown;
    writePortfolioData(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }
}
