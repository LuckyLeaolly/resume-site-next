"use client";

import { useEffect, useState } from "react";

type SaveStatus = "idle" | "loading" | "saving" | "success" | "error";

export default function AdminPage() {
  const [jsonText, setJsonText] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [message, setMessage] = useState("等待加载数据...");

  const loadData = async () => {
    setStatus("loading");
    setMessage("正在加载数据库内容...");

    try {
      const response = await fetch("/api/portfolio", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`加载失败（${response.status}）`);
      }

      const data = (await response.json()) as unknown;
      setJsonText(JSON.stringify(data, null, 2));
      setStatus("success");
      setMessage("加载成功，可直接编辑并保存。");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";
      setStatus("error");
      setMessage(`加载失败：${errorMessage}`);
    }
  };

  const formatJson = () => {
    if (!jsonText.trim()) {
      setStatus("error");
      setMessage("当前内容为空，无法格式化。请输入 JSON。");
      return;
    }

    try {
      const parsed = JSON.parse(jsonText) as unknown;
      setJsonText(JSON.stringify(parsed, null, 2));
      setStatus("success");
      setMessage("格式化完成。");
    } catch {
      setStatus("error");
      setMessage("JSON 格式有误，请修正后再格式化。");
    }
  };

  const saveData = async () => {
    setStatus("saving");
    setMessage("正在保存到数据库...");

    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setStatus("error");
      setMessage("保存失败：JSON 格式错误。请先修正。");
      return;
    }

    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken.trim() ? { "x-admin-token": adminToken.trim() } : {}),
        },
        body: JSON.stringify(parsed),
      });

      if (response.status === 401) {
        throw new Error("鉴权失败，请检查 ADMIN_TOKEN。");
      }

      if (!response.ok) {
        throw new Error(`保存失败（${response.status}）`);
      }

      setStatus("success");
      setMessage("保存成功。前台刷新后即可看到最新内容。");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";
      setStatus("error");
      setMessage(`保存失败：${errorMessage}`);
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("portfolio_admin_token") || "";
      setAdminToken(token);
    } catch {
      // ignore localStorage errors
    }

    void loadData();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_admin_token", adminToken);
    } catch {
      // ignore localStorage errors
    }
  }, [adminToken]);

  return (
    <main className="admin-shell">
      <section className="admin-card">
        <div className="admin-head">
          <div>
            <h1>后台内容编辑</h1>
            <p>直接编辑 JSON 并保存到 SQLite 数据库（接口：`/api/portfolio`）。</p>
          </div>
          <a href="/" className="btn btn-ghost">
            返回首页
          </a>
        </div>

        <div className="admin-actions">
          <button type="button" className="btn btn-ghost" onClick={loadData} disabled={status === "loading" || status === "saving"}>
            重新加载
          </button>
          <button type="button" className="btn btn-ghost" onClick={formatJson} disabled={status === "loading" || status === "saving"}>
            格式化 JSON
          </button>
          <button type="button" className="btn btn-primary" onClick={saveData} disabled={status === "loading" || status === "saving"}>
            保存到数据库
          </button>
        </div>

        <label className="admin-editor-label" htmlFor="admin-token">
          管理令牌（可选）
        </label>
        <input
          id="admin-token"
          className="admin-token-input"
          type="password"
          value={adminToken}
          onChange={(event) => setAdminToken(event.target.value)}
          placeholder="若服务端设置了 ADMIN_TOKEN，请在此输入"
        />

        <div className="admin-status" data-status={status}>
          {message}
        </div>

        <label className="admin-editor-label" htmlFor="portfolio-json">
          内容 JSON
        </label>
        <textarea
          id="portfolio-json"
          className="admin-editor"
          value={jsonText}
          onChange={(event) => setJsonText(event.target.value)}
          spellCheck={false}
        />
      </section>
    </main>
  );
}
