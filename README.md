# Resume Site (Next.js)

中英双语、技术产品风格的简历网站，基于 Next.js App Router + TypeScript，支持静态导出到 GitHub Pages。

## 开发与构建

```bash
npm install
npm run dev
```

## 静态导出（GitHub Pages）

如果仓库是 `username.github.io`，无需设置 `basePath`。

如果仓库是项目站点（例如 `resume-site-next`），先设置环境变量：

```bash
set NEXT_PUBLIC_BASE_PATH=/resume-site-next
npm run export
```

导出产物在 `out/`，将其部署到 GitHub Pages。

## PDF 文件

把简历 PDF 放到 `public/assets/LiHui-Resume.pdf`。
