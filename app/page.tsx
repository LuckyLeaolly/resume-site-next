"use client";

import { useState } from "react";

type Language = "zh" | "en";

const content = {
  zh: {
    brandName: "李慧",
    brandRole: "前端开发工程师",
    nav: {
      about: "关于",
      skills: "能力",
      experience: "经历",
      projects: "项目",
      education: "教育",
      contact: "联系",
    },
    hero: {
      label: "简历概览",
      title: "前端开发工程师",
      lead:
        "8年工作经验，深耕教育、电商、O2O等领域，擅长性能优化、模块化开发与跨端适配，能高效协作推进复杂系统落地。",
      actions: {
        primary: "查看项目",
        secondary: "联系我",
      },
      badges: ["Vue / React", "性能优化", "工程化", "跨端开发"],
    },
    profile: {
      focusLabel: "经验",
      focusValue: "8年",
      locationLabel: "意向",
      locationValue: "前端开发工程师",
      availabilityLabel: "年龄",
      availabilityValue: "29岁",
      languagesLabel: "电话",
      languagesValue: "19318638996",
    },
    status: {
      title: "专长方向",
      items: [
        { label: "性能优化", value: "首屏 / 渲染" },
        { label: "模块化", value: "组件复用" },
        { label: "跨端适配", value: "Web / 小程序" },
      ],
    },
    sections: {
      skills: {
        eyebrow: "能力",
        title: "专业技能与技术栈",
        desc: "覆盖前端基础、框架组件、工程化与跨端能力，具备大型系统的交付经验。",
      },
      experience: {
        eyebrow: "经历",
        title: "工作经历",
        desc: "从中后台系统到 C 端业务，参与多条业务线的架构升级与性能优化。",
      },
      projects: {
        eyebrow: "项目",
        title: "重点项目",
        desc: "覆盖教育平台、电商系统、协同工具与企业级后台。",
      },
      education: {
        eyebrow: "教育",
        title: "教育经历",
        desc: "兼顾计算机应用与管理专业背景。",
      },
      contact: {
        eyebrow: "联系",
        title: "联系方式",
        desc: "欢迎联系沟通前端岗位或项目合作。",
      },
    },
    projectMeta: {
      roleLabel: "角色",
      stackLabel: "技术栈",
      focusLabel: "方向",
    },
    skills: [
      {
        title: "语言与基础",
        items: ["HTML5 / CSS3", "JavaScript", "ES6+", "TypeScript", "GitFlow"],
      },
      {
        title: "框架与组件",
        items: ["Vue / Vuex / Pinia", "React / Redux", "Ant Design / Element UI", "Vant / Arco / MUI"],
      },
      {
        title: "工程化与性能",
        items: ["Webpack", "Vite", "Rollup", "CI/CD", "性能优化", "前端监控"],
      },
      {
        title: "跨端与平台",
        items: ["uni-app", "Taro", "小程序", "Electron", "Node.js", "Docker"],
      },
    ],
    experiences: [
      {
        title: "前端开发工程师（前端组长）",
        company: "上海博为峰软件技术股份有限公司",
        period: "2021.02-2025.09",
        highlight:
          "主导教育平台前端架构升级与性能优化，模块化拆分提升维护性，引入 Webpack/Vite 与 CDN 优化，资源消耗降低 70%。",
      },
      {
        title: "前端开发工程师",
        company: "上海费芮网络科技有限公司",
        period: "2019.03-2021.01",
        highlight:
          "负责项目全周期交付与组件库维护，推动脚手架与构建优化落地，制定代码规范提升交付一致性与效率。",
      },
      {
        title: "前端开发工程师",
        company: "蓝色起源企业管理（上海）有限公司",
        period: "2018.03-2019.03",
        highlight:
          "主导多类型定制项目的前端落地，负责技术选型与核心功能实现，强化跨团队协作与需求转化能力。",
      },
    ],
    projects: [
      {
        title: "学掌门网校 PC Web 商城 & APP 商城",
        year: "2021.02-2025.09",
        role: "前端开发工程师",
        stack: "uni-app, Nuxt2, Vue2, Element UI, Node.js, Koa",
        focus: "教育电商、直播互动、支付体系",
        highlights: [
          "覆盖课程、会员、答题、支付等核心模块，支撑万级用户同时在线。",
          "对接微信/支付宝支付与 JWT 鉴权，提升交易稳定性与安全性。",
          "构建预渲染与缓存体系，SSR 冷启动耗时降低 84%。",
        ],
        impact: "平台活跃度与付费转化率持续提升。",
      },
      {
        title: "学掌门网校商城后台管理",
        year: "2021.02-2025.09",
        role: "前端开发工程师",
        stack: "React 18, Redux Toolkit, Webpack 5, Ant Design, Echarts",
        focus: "B 端系统、配置化表单、性能优化",
        highlights: [
          "二次封装动态表单，覆盖 15+ 业务场景快速配置。",
          "建设通用业务组件库，开发周期缩短约 30%。",
          "引入 Web Worker 与 ResizeObserver，提升大数据量交互体验。",
        ],
        impact: "首屏加载时间优化至 1.8s。",
      },
      {
        title: "统一认证中心 UAC",
        year: "2022.03-2025.09",
        role: "前端开发工程师",
        stack: "React, Umi Max, Ant Design, Tailwind CSS, Node.js",
        focus: "权限管理、脚手架、代码生成",
        highlights: [
          "基于 Commander/Inquirer 开发 CLI，支持交互式项目创建。",
          "引入 Swagger 接口代码生成，缩短 CRUD 开发周期。",
          "编写最佳实践文档，新项目启动时间缩短至 2 小时。",
        ],
        impact: "多业务线复用统一认证能力。",
      },
      {
        title: "博为峰 TMS 系统",
        year: "2021.07-2025.09",
        role: "前端开发工程师",
        stack: "React 18, TypeScript, RTK Query, Ant Design, Socket.IO, Yjs",
        focus: "团队协作、实时编辑、监控体系",
        highlights: [
          "实现频道协作、Markdown 输入与消息管理等核心功能。",
          "基于 Socket.IO + Yjs 实现多人实时协作编辑。",
          "对接 Performance API 上报性能与错误日志。",
        ],
        impact: "提升团队协作效率与可追踪性。",
      },
      {
        title: "雅菲妮外贸 ERP 产品系统",
        year: "2019.03-2021.01",
        role: "前端开发工程师",
        stack: "Vue 3, Element Plus, Pinia, Vite, WebSocket",
        focus: "复杂业务模块与性能优化",
        highlights: [
          "引入虚拟滚动与分片加载，实现万级 SKU 秒级渲染。",
          "构建财务结算中心并完成多币种实时换算。",
          "建设前端监控与埋点体系，故障响应提升 80%。",
        ],
        impact: "平台响应速度提升 30%。",
      },
    ],
    education: [
      {
        school: "江西水利职业学院",
        degree: "大专 · 计算机应用技术",
        year: "2015-2018",
      },
      {
        school: "南昌大学",
        degree: "本科 · 工商管理专业",
        year: "2020-2023",
      },
    ],
    contact: {
      phoneLabel: "电话",
      phone: "19318638996",
      emailLabel: "邮箱",
      email: "leaolly333@163.com",
      note: "熟悉敏捷研发流程，擅长跨团队协作与复杂系统交付。",
      workingStyleTitle: "工作方式",
      workingStyleItems: [
        "性能优化与稳定性保障",
        "模块化与高复用组件沉淀",
        "跨端适配与一致体验",
        "文档化与敏捷协作",
      ],
    },
    projectImpactLabel: "成果",
    footer: "© 2026 李慧 · 前端开发工程师",
  },
  en: {
    brandName: "Hui Li",
    brandRole: "Frontend Engineer",
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      label: "Resume Overview",
      title: "Frontend Engineer",
      lead:
        "8 years of frontend experience across education, ecommerce, and O2O, with strengths in performance optimization, modular development, and cross-platform delivery.",
      actions: {
        primary: "View Projects",
        secondary: "Contact",
      },
      badges: ["Vue / React", "Performance", "Engineering", "Cross-platform"],
    },
    profile: {
      focusLabel: "Experience",
      focusValue: "8 years",
      locationLabel: "Target role",
      locationValue: "Frontend Engineer",
      availabilityLabel: "Age",
      availabilityValue: "29",
      languagesLabel: "Phone",
      languagesValue: "19318638996",
    },
    status: {
      title: "Focus Areas",
      items: [
        { label: "Performance", value: "First paint / Rendering" },
        { label: "Modularity", value: "Component reuse" },
        { label: "Cross-platform", value: "Web / Mini Programs" },
      ],
    },
    sections: {
      skills: {
        eyebrow: "Capabilities",
        title: "Professional skills and stack",
        desc: "Covers frontend fundamentals, frameworks, engineering, and cross-platform delivery.",
      },
      experience: {
        eyebrow: "Experience",
        title: "Work experience",
        desc: "Delivered architecture upgrades and performance optimization across multiple business lines.",
      },
      projects: {
        eyebrow: "Projects",
        title: "Key projects",
        desc: "Education platforms, ecommerce systems, collaboration tools, and enterprise back office.",
      },
      education: {
        eyebrow: "Education",
        title: "Education",
        desc: "Background in computer applications and business administration.",
      },
      contact: {
        eyebrow: "Contact",
        title: "Get in touch",
        desc: "Open to frontend roles and project collaboration.",
      },
    },
    projectMeta: {
      roleLabel: "Role",
      stackLabel: "Stack",
      focusLabel: "Focus",
    },
    skills: [
      {
        title: "Frontend Core",
        items: ["HTML5 / CSS3", "JavaScript", "ES6+", "TypeScript", "GitFlow"],
      },
      {
        title: "Frameworks & UI",
        items: ["Vue / Vuex / Pinia", "React / Redux", "Ant Design / Element UI", "Vant / Arco / MUI"],
      },
      {
        title: "Engineering & Performance",
        items: ["Webpack", "Vite", "Rollup", "CI/CD", "Performance", "Frontend Monitoring"],
      },
      {
        title: "Cross-platform & Platform",
        items: ["uni-app", "Taro", "Mini Programs", "Electron", "Node.js", "Docker"],
      },
    ],
    experiences: [
      {
        title: "Frontend Engineer (Team Lead)",
        company: "Shanghai Bowefeng Software Technology Co., Ltd.",
        period: "2021.02-2025.09",
        highlight:
          "Led architecture upgrades and performance optimization for an education platform, improving maintainability and reducing CDN resource consumption by 70%.",
      },
      {
        title: "Frontend Engineer",
        company: "Shanghai Feirui Network Technology Co., Ltd.",
        period: "2019.03-2021.01",
        highlight:
          "Owned end-to-end delivery and component library evolution, driving scaffolding and build optimization to raise delivery consistency.",
      },
      {
        title: "Frontend Engineer",
        company: "Blue Origin Enterprise Management (Shanghai) Co., Ltd.",
        period: "2018.03-2019.03",
        highlight:
          "Delivered customized web projects and led core module implementation with strong cross-team communication.",
      },
    ],
    projects: [
      {
        title: "Xuezhangmen Online School PC Web & App Mall",
        year: "2021.02-2025.09",
        role: "Frontend Engineer",
        stack: "uni-app, Nuxt2, Vue2, Element UI, Node.js, Koa",
        focus: "Education commerce, live streaming, payments",
        highlights: [
          "Delivered core modules for courses, membership, quizzes, and payments supporting massive concurrency.",
          "Integrated WeChat/Alipay payments and JWT-based auth to improve transaction stability.",
          "Built prerendering and caching to reduce SSR cold start by 84%.",
        ],
        impact: "Sustained growth in user engagement and paid conversion.",
      },
      {
        title: "Xuezhangmen Admin Console",
        year: "2021.02-2025.09",
        role: "Frontend Engineer",
        stack: "React 18, Redux Toolkit, Webpack 5, Ant Design, Echarts",
        focus: "B-side system, configurable forms, performance",
        highlights: [
          "Extended dynamic form components for 15+ business scenarios.",
          "Built reusable business components to shorten delivery cycles by ~30%.",
          "Applied Web Worker and ResizeObserver to improve heavy-data UX.",
        ],
        impact: "First paint optimized to 1.8s.",
      },
      {
        title: "Unified Authentication Center (UAC)",
        year: "2022.03-2025.09",
        role: "Frontend Engineer",
        stack: "React, Umi Max, Ant Design, Tailwind CSS, Node.js",
        focus: "Auth, scaffolding, code generation",
        highlights: [
          "Built a CLI with Commander/Inquirer for interactive project bootstrapping.",
          "Introduced Swagger-based API codegen to shorten CRUD delivery.",
          "Authored best-practice docs, reducing startup time to 2 hours.",
        ],
        impact: "Unified auth capabilities reused across business lines.",
      },
      {
        title: "Bowefeng TMS System",
        year: "2021.07-2025.09",
        role: "Frontend Engineer",
        stack: "React 18, TypeScript, RTK Query, Ant Design, Socket.IO, Yjs",
        focus: "Collaboration, realtime editing, monitoring",
        highlights: [
          "Delivered core features for channels, Markdown editing, and message management.",
          "Enabled multi-user realtime collaboration with Socket.IO + Yjs.",
          "Integrated Performance API for logs and telemetry.",
        ],
        impact: "Improved collaboration efficiency and observability.",
      },
      {
        title: "Yafeini Foreign Trade ERP",
        year: "2019.03-2021.01",
        role: "Frontend Engineer",
        stack: "Vue 3, Element Plus, Pinia, Vite, WebSocket",
        focus: "Complex business modules and performance",
        highlights: [
          "Applied virtual scrolling and chunked loading for 10k+ SKU rendering.",
          "Built financial settlement center with real-time multi-currency conversion.",
          "Established monitoring and analytics, improving incident response by 80%.",
        ],
        impact: "Platform response time improved by 30%.",
      },
    ],
    education: [
      {
        school: "Jiangxi Water Conservancy Vocational College",
        degree: "Associate · Computer Application Technology",
        year: "2015-2018",
      },
      {
        school: "Nanchang University",
        degree: "Bachelor · Business Administration",
        year: "2020-2023",
      },
    ],
    contact: {
      phoneLabel: "Phone",
      phone: "19318638996",
      emailLabel: "Email",
      email: "leaolly333@163.com",
      note: "Familiar with agile delivery and cross-team collaboration for complex systems.",
      workingStyleTitle: "Working style",
      workingStyleItems: [
        "Performance and stability focused",
        "Modular and reusable components",
        "Cross-platform experience consistency",
        "Documentation-first collaboration",
      ],
    },
    projectImpactLabel: "Impact",
    footer: "© 2026 Hui Li · Frontend Engineer",
  },
} as const;

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("zh");
  const copy = content[language];

  return (
    <>
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-name">{copy.brandName}</span>
          <span className="brand-role">{copy.brandRole}</span>
        </div>
        <nav className="top-nav">
          <a href="#about">{copy.nav.about}</a>
          <a href="#skills">{copy.nav.skills}</a>
          <a href="#experience">{copy.nav.experience}</a>
          <a href="#projects">{copy.nav.projects}</a>
          <a href="#education">{copy.nav.education}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className="lang-switch">
          <button
            type="button"
            className={language === "zh" ? "is-active" : ""}
            onClick={() => setLanguage("zh")}
          >
            中文
          </button>
          <button
            type="button"
            className={language === "en" ? "is-active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="about">
          <div className="hero-left">
            <span className="hero-label">{copy.hero.label}</span>
            <h1 className="hero-title">{copy.hero.title}</h1>
            <p className="hero-lead">{copy.hero.lead}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                {copy.hero.actions.primary}
              </a>
              <a className="button ghost" href="#contact">
                {copy.hero.actions.secondary}
              </a>
            </div>
            <div className="hero-badges">
              {copy.hero.badges.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <div className="profile-card">
              <div className="profile-row">
                <span className="profile-label">{copy.profile.focusLabel}</span>
                <strong>{copy.profile.focusValue}</strong>
              </div>
              <div className="profile-row">
                <span className="profile-label">{copy.profile.locationLabel}</span>
                <strong>{copy.profile.locationValue}</strong>
              </div>
              <div className="profile-row">
                <span className="profile-label">{copy.profile.availabilityLabel}</span>
                <strong>{copy.profile.availabilityValue}</strong>
              </div>
              <div className="profile-row">
                <span className="profile-label">{copy.profile.languagesLabel}</span>
                <strong>{copy.profile.languagesValue}</strong>
              </div>
            </div>
            <div className="status-card">
              <div className="status-title">{copy.status.title}</div>
              <ul className="status-list">
                {copy.status.items.map((item) => (
                  <li className="status-item" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{copy.sections.skills.eyebrow}</span>
              <h2>{copy.sections.skills.title}</h2>
              <p className="section-desc">{copy.sections.skills.desc}</p>
            </div>
            <div className="skills-grid">
              {copy.skills.map((skill) => (
                <article className="skill-card" key={skill.title}>
                  <h3>{skill.title}</h3>
                  <div className="tag-list">
                    {skill.items.map((item) => (
                      <span className="tag-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{copy.sections.experience.eyebrow}</span>
              <h2>{copy.sections.experience.title}</h2>
              <p className="section-desc">{copy.sections.experience.desc}</p>
            </div>
            <div className="experience-list">
              {copy.experiences.map((exp) => (
                <article className="experience-item" key={exp.title}>
                  <h3>{exp.title}</h3>
                  <div className="exp-meta">
                    <span>{exp.company}</span>
                    <span>{exp.period}</span>
                  </div>
                  <p>{exp.highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{copy.sections.projects.eyebrow}</span>
              <h2>{copy.sections.projects.title}</h2>
              <p className="section-desc">{copy.sections.projects.desc}</p>
            </div>
            <div className="project-grid">
              {copy.projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-head">
                    <span className="project-title">{project.title}</span>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <div className="project-meta">
                    <div>
                      <span className="meta-label">{copy.projectMeta.roleLabel}</span>
                      <div>{project.role}</div>
                    </div>
                    <div>
                      <span className="meta-label">{copy.projectMeta.stackLabel}</span>
                      <div>{project.stack}</div>
                    </div>
                    <div>
                      <span className="meta-label">{copy.projectMeta.focusLabel}</span>
                      <div>{project.focus}</div>
                    </div>
                  </div>
                  <ul className="project-list">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">{copy.projectImpactLabel}</span>
                    <span>{project.impact}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="education">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{copy.sections.education.eyebrow}</span>
              <h2>{copy.sections.education.title}</h2>
              <p className="section-desc">{copy.sections.education.desc}</p>
            </div>
            <div className="education-list">
              {copy.education.map((item) => (
                <div className="education-item" key={item.school}>
                  <div>
                    <strong>{item.school}</strong>
                    <span>{item.degree}</span>
                  </div>
                  <span>{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{copy.sections.contact.eyebrow}</span>
              <h2>{copy.sections.contact.title}</h2>
              <p className="section-desc">{copy.sections.contact.desc}</p>
            </div>
            <div className="profile-layout">
              <div className="contact-card">
                <div>
                  <span className="label">{copy.contact.phoneLabel}</span>
                  <strong>{copy.contact.phone}</strong>
                </div>
                <div>
                  <span className="label">{copy.contact.emailLabel}</span>
                  <strong>{copy.contact.email}</strong>
                </div>
                <p className="contact-note">{copy.contact.note}</p>
              </div>
              <div className="panel">
                <h3>{copy.contact.workingStyleTitle}</h3>
                <ul className="checklist">
                  {copy.contact.workingStyleItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">{copy.footer}</footer>
    </>
  );
}
