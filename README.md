# Resume Site (Next.js)

中英双语个人作品集网站，基于 Next.js App Router + TypeScript。

当前版本支持：

- 通过 `/api/portfolio` 接口读取内容
- 使用本地 SQLite 数据库存储内容（默认 `data/portfolio.db`）
- 首次启动自动写入种子数据

## 开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run start
```

## 缓存与异常恢复

为避免开发环境偶发的 `.next` chunk 缓存错乱（如 `Cannot find module './xxx.js'`），已配置：

- `npm run dev` 前自动执行 `clean:next`
- `npm run build` 前自动执行 `clean:next`

也可手动执行：

```bash
npm run clean:next
```

## 数据库路径（可选）

默认数据库文件路径为：

`data/portfolio.db`

可通过环境变量覆盖：

```bash
set PORTFOLIO_DB_PATH=C:/your-path/portfolio.db
```

## 内容更新

- 读取：`GET /api/portfolio`
- 更新：`PUT /api/portfolio`（Body 为完整 JSON 数据）

### 写入鉴权（推荐）

可设置环境变量 `ADMIN_TOKEN` 保护写接口：

```bash
set ADMIN_TOKEN=your-secret-token
```

设置后，`PUT /api/portfolio` 需在请求头携带：

- `x-admin-token: your-secret-token`
  或
- `Authorization: Bearer your-secret-token`

## 简易后台编辑入口

- 路径：`/admin`
- 功能：读取数据库内容、在线编辑 JSON、点击按钮保存到数据库
- 支持：填写 `ADMIN_TOKEN` 后保存（令牌仅保存在浏览器本地）
- 适用：单人维护或轻量运营场景
