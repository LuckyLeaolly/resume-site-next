"use client";

import { useEffect, useState } from "react";

type Lang = "zh" | "en";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const withBasePath = (path: string) => `${basePath}${path}`;

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem("lang");
      } catch (error) {
        return null;
      }
    })();

    if (stored === "zh" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.lang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("lang", lang);
    } catch (error) {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    revealItems.forEach((item, index) => {
      window.setTimeout(() => {
        item.classList.add("is-visible");
      }, index * 120);
    });
  }, []);

  const resumeHref = withBasePath("/assets/LiHui-Resume.pdf");

  return (
    <>
      <div className="bg-grid" aria-hidden="true"></div>
      <header className="site-header">
        <div className="brand">
          <div className="brand-name">李慧</div>
          <div className="brand-role">
            <span className="lang lang-zh inline">前端开发工程师</span>
            <span className="lang lang-en inline">Front-end Engineer</span>
          </div>
        </div>
        <nav className="site-nav">
          <a href="#about">
            <span className="lang lang-zh inline">关于</span>
            <span className="lang lang-en inline">About</span>
          </a>
          <a href="#skills">
            <span className="lang lang-zh inline">技能</span>
            <span className="lang lang-en inline">Skills</span>
          </a>
          <a href="#experience">
            <span className="lang lang-zh inline">经历</span>
            <span className="lang lang-en inline">Experience</span>
          </a>
          <a href="#projects">
            <span className="lang lang-zh inline">项目</span>
            <span className="lang lang-en inline">Projects</span>
          </a>
          <a href="#education">
            <span className="lang lang-zh inline">教育</span>
            <span className="lang lang-en inline">Education</span>
          </a>
          <a href="#contact">
            <span className="lang lang-zh inline">联系</span>
            <span className="lang lang-en inline">Contact</span>
          </a>
        </nav>
        <div className="lang-switch">
          <button
            type="button"
            className={lang === "zh" ? "is-active" : undefined}
            data-lang-switch="zh"
            onClick={() => setLang("zh")}
            aria-pressed={lang === "zh"}
          >
            中文
          </button>
          <button
            type="button"
            className={lang === "en" ? "is-active" : undefined}
            data-lang-switch="en"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content" data-reveal>
            <div className="eyebrow">
              <span className="tag">Technical Product</span>
              <span className="lang lang-zh inline">工程化驱动的产品落地</span>
              <span className="lang lang-en inline">
                Engineering-led product delivery
              </span>
            </div>
            <h1>
              <span className="lang lang-zh">把复杂业务拆成清晰、可维护的产品体验</span>
              <span className="lang lang-en">
                Turn complex workflows into clear, maintainable product experiences.
              </span>
            </h1>
            <p className="lead">
              <span className="lang lang-zh">
                8年前端经验，覆盖教育、电商、O2O等行业，擅长中后台与多端交付，关注性能、稳定性与工程效率。
              </span>
              <span className="lang lang-en">
                8 years of front-end experience across education, e-commerce, and O2O. Strong
                in admin systems and multi-platform delivery with a focus on performance,
                stability, and engineering efficiency.
              </span>
            </p>
            <div className="cta">
              <a className="button primary" href={resumeHref} target="_blank" rel="noopener">
                <span className="lang lang-zh inline">下载PDF</span>
                <span className="lang lang-en inline">Download PDF</span>
              </a>
              <a className="button ghost" href="#projects">
                <span className="lang lang-zh inline">查看项目</span>
                <span className="lang lang-en inline">View Projects</span>
              </a>
            </div>
            <div className="hero-tags">
              <span className="chip">React / Vue</span>
              <span className="chip">SSR / Performance</span>
              <span className="chip">uni-app / Taro</span>
              <span className="chip">Component System</span>
            </div>
          </div>
          <div className="hero-card" data-reveal>
            <div className="spec">
              <div className="spec-row">
                <span className="spec-label">
                  <span className="lang lang-zh inline">经验</span>
                  <span className="lang lang-en inline">Experience</span>
                </span>
                <span className="spec-value">8+ years</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <span className="lang lang-zh inline">领域</span>
                  <span className="lang lang-en inline">Domains</span>
                </span>
                <span className="spec-value">
                  <span className="lang lang-zh inline">教育 / 电商 / O2O</span>
                  <span className="lang lang-en inline">Education / E-commerce / O2O</span>
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <span className="lang lang-zh inline">平台</span>
                  <span className="lang lang-en inline">Platforms</span>
                </span>
                <span className="spec-value">
                  <span className="lang lang-zh inline">Web / 小程序 / App</span>
                  <span className="lang lang-en inline">Web / Mini Program / App</span>
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <span className="lang lang-zh inline">重点</span>
                  <span className="lang lang-en inline">Focus</span>
                </span>
                <span className="spec-value">
                  <span className="lang lang-zh inline">工程化 / 体验 / 稳定性</span>
                  <span className="lang lang-en inline">Engineering / UX / Stability</span>
                </span>
              </div>
            </div>
            <div className="spec-foot">
              <span className="lang lang-zh">可提供项目细节与方案复盘</span>
              <span className="lang lang-en">Available for detailed project walkthroughs.</span>
            </div>
          </div>
        </section>
        <section id="about" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                <span className="lang lang-zh">个人概览</span>
                <span className="lang lang-en">Profile Snapshot</span>
              </h2>
              <p className="section-desc">
                <span className="lang lang-zh">
                  以产品交付为中心的前端工程师，擅长在复杂业务下保持代码结构清晰与交付节奏稳定。
                </span>
                <span className="lang lang-en">
                  A product-minded front-end engineer who keeps delivery stable and codebases
                  clean under complex business constraints.
                </span>
              </p>
            </div>
            <div className="about-grid">
              <div className="about-text" data-reveal>
                <p className="lang lang-zh">
                  长期负责核心链路与平台能力建设，覆盖架构拆分、组件库沉淀、性能优化与稳定性治理。能够在需求快速变化的情况下，控制技术债并保持迭代效率。
                </p>
                <p className="lang lang-en">
                  Led core flows and platform capabilities, including architecture modularization,
                  component systems, performance tuning, and stability improvements. Able to
                  balance delivery speed with technical debt control.
                </p>
                <ul className="checklist lang lang-zh">
                  <li>中后台系统与业务平台的结构化交付</li>
                  <li>跨端业务落地（Web / 小程序 / App）</li>
                  <li>工程化与监控体系建设，保障可观测性</li>
                </ul>
                <ul className="checklist lang lang-en">
                  <li>Structured delivery for admin systems and business platforms</li>
                  <li>Multi-platform delivery across Web, Mini Program, and App</li>
                  <li>Engineering and observability systems to keep reliability visible</li>
                </ul>
              </div>
              <div className="about-cards" data-reveal>
                <div className="card">
                  <h3>
                    <span className="lang lang-zh">架构与工程化</span>
                    <span className="lang lang-en">Architecture & Engineering</span>
                  </h3>
                  <p className="lang lang-zh">组件库、脚手架、代码规范、CI/CD，提升一致性与协作效率。</p>
                  <p className="lang lang-en">
                    Component systems, scaffolding, code standards, and CI/CD to improve
                    consistency and collaboration.
                  </p>
                </div>
                <div className="card">
                  <h3>
                    <span className="lang lang-zh">性能与体验</span>
                    <span className="lang lang-en">Performance & UX</span>
                  </h3>
                  <p className="lang lang-zh">SSR、缓存、拆包、监控与问题定位，确保关键链路稳定。</p>
                  <p className="lang lang-en">
                    SSR, caching, bundling, and monitoring to keep critical flows fast and
                    stable.
                  </p>
                </div>
                <div className="card">
                  <h3>
                    <span className="lang lang-zh">跨端交付</span>
                    <span className="lang lang-en">Cross-platform Delivery</span>
                  </h3>
                  <p className="lang lang-zh">uni-app / Taro / 小程序 / Hybrid，保证多端一致体验。</p>
                  <p className="lang lang-en">
                    uni-app, Taro, Mini Program, and Hybrid delivery with consistent UX.
                  </p>
                </div>
                <div className="card">
                  <h3>
                    <span className="lang lang-zh">协作与沉淀</span>
                    <span className="lang lang-en">Collaboration & Enablement</span>
                  </h3>
                  <p className="lang lang-zh">接口规范、技术文档与最佳实践沉淀，降低新成员上手成本。</p>
                  <p className="lang lang-en">
                    API standards, documentation, and best practices to reduce onboarding
                    cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                <span className="lang lang-zh">技能栈</span>
                <span className="lang lang-en">Core Skills</span>
              </h2>
            </div>
            <div className="skills-grid" data-reveal>
              <div className="skill-group">
                <h3>
                  <span className="lang lang-zh">语言</span>
                  <span className="lang lang-en">Languages</span>
                </h3>
                <div className="skill-tags">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript (ES6+)</span>
                  <span>TypeScript</span>
                </div>
              </div>
              <div className="skill-group">
                <h3>
                  <span className="lang lang-zh">框架</span>
                  <span className="lang lang-en">Frameworks</span>
                </h3>
                <div className="skill-tags">
                  <span>React</span>
                  <span>Vue</span>
                  <span>Nuxt2</span>
                  <span>Umi</span>
                  <span>Redux / RTK</span>
                  <span>Pinia / Vuex</span>
                </div>
              </div>
              <div className="skill-group">
                <h3>
                  <span className="lang lang-zh">工程化</span>
                  <span className="lang lang-en">Engineering</span>
                </h3>
                <div className="skill-tags">
                  <span>Webpack</span>
                  <span>Vite</span>
                  <span>Rollup</span>
                  <span>ESLint</span>
                  <span>Prettier</span>
                  <span>Commitlint</span>
                  <span>Husky</span>
                </div>
              </div>
              <div className="skill-group">
                <h3>
                  <span className="lang lang-zh">跨端</span>
                  <span className="lang lang-en">Cross-platform</span>
                </h3>
                <div className="skill-tags">
                  <span>uni-app</span>
                  <span>Taro</span>
                  <span>小程序</span>
                  <span>Hybrid</span>
                </div>
              </div>
              <div className="skill-group">
                <h3>
                  <span className="lang lang-zh">其他</span>
                  <span className="lang lang-en">Others</span>
                </h3>
                <div className="skill-tags">
                  <span>Node.js / Koa</span>
                  <span>SSR</span>
                  <span>WebSocket</span>
                  <span>Sentry</span>
                  <span>MySQL</span>
                  <span>Docker (familiar)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="experience" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                <span className="lang lang-zh">工作经历</span>
                <span className="lang lang-en">Experience</span>
              </h2>
            </div>
            <div className="experience-list">
              <article className="experience-card" data-reveal>
                <header>
                  <h3>上海博为峰软件技术股份有限公司</h3>
                  <div className="exp-meta">
                    <span className="lang lang-zh inline">前端开发工程师（前端组长）</span>
                    <span className="lang lang-en inline">Front-end Engineer (Team Lead)</span>
                    <span>2021.02 - 2025.09</span>
                  </div>
                </header>
                <ul className="lang lang-zh">
                  <li>主导网校平台前端架构升级，推动模块化拆分与复用。</li>
                  <li>建设公共组件库与质量体系（ESLint / Commitlint），提升交付一致性。</li>
                  <li>与后端协作优化接口与缓存策略，保障核心页面稳定。</li>
                </ul>
                <ul className="lang lang-en">
                  <li>
                    Led front-end architecture upgrades and modularization for the education
                    platform.
                  </li>
                  <li>
                    Built shared component library and quality gates (ESLint / Commitlint).
                  </li>
                  <li>
                    Partnered with backend on API and caching strategies to stabilize key pages.
                  </li>
                </ul>
              </article>
              <article className="experience-card" data-reveal>
                <header>
                  <h3>上海费芮网络科技有限公司</h3>
                  <div className="exp-meta">
                    <span className="lang lang-zh inline">前端开发工程师</span>
                    <span className="lang lang-en inline">Front-end Engineer</span>
                    <span>2019.03 - 2021.01</span>
                  </div>
                </header>
                <ul className="lang lang-zh">
                  <li>负责多个项目全周期交付，保障质量与进度。</li>
                  <li>维护组件库与脚手架，提升复用与开发效率。</li>
                  <li>推动前端规范与自动化构建流程落地。</li>
                </ul>
                <ul className="lang lang-en">
                  <li>Delivered multiple projects end-to-end with quality and timeline control.</li>
                  <li>Maintained the component library and scaffolding to improve reuse.</li>
                  <li>Drove front-end standards and automated build workflows.</li>
                </ul>
              </article>
              <article className="experience-card" data-reveal>
                <header>
                  <h3>蓝色起源企业管理（上海）有限公司</h3>
                  <div className="exp-meta">
                    <span className="lang lang-zh inline">前端开发工程师</span>
                    <span className="lang lang-en inline">Front-end Engineer</span>
                    <span>2018.03 - 2019.03</span>
                  </div>
                </header>
                <ul className="lang lang-zh">
                  <li>交付企业官网、中后台、电商与小程序等定制化项目。</li>
                  <li>参与技术选型与核心模块实现，输出技术文档。</li>
                  <li>保障多项目并行交付与客户沟通协作。</li>
                </ul>
                <ul className="lang lang-en">
                  <li>Delivered customized websites, admin systems, e-commerce, and mini programs.</li>
                  <li>Contributed to technical selection and core module implementation.</li>
                  <li>Coordinated multi-project delivery and client communication.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>
        <section id="projects" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                <span className="lang lang-zh">项目详情</span>
                <span className="lang lang-en">Selected Projects</span>
              </h2>
              <p className="section-desc">
                <span className="lang lang-zh">
                  以下项目按业务复杂度与能力覆盖度选择，均可进行技术方案复盘。
                </span>
                <span className="lang lang-en">
                  Projects below are selected for complexity and capability coverage, available
                  for walkthroughs.
                </span>
              </p>
            </div>
            <div className="projects-list" data-reveal>
              <details open>
                <summary>
                  <span className="lang lang-zh inline">学掌门网校商城（B/C端）</span>
                  <span className="lang lang-en inline">
                    XueZhangMen Academy Commerce (B/C)
                  </span>
                  <span className="project-tag">2021-2025</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>Nuxt2 / Vue2 / Element UI / Node.js / Koa / uni-app</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>负责课程、会员、订单、支付等核心链路开发与对接。</li>
                    <li>构建SSR/预渲染与缓存策略，优化首屏与列表加载体验。</li>
                    <li>封装通用组件与前端监控JSSDK，统一错误与行为采集。</li>
                    <li>接入微信/支付宝支付与回调，保障交易链路稳定。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Delivered core flows for courses, membership, orders, and payments.</li>
                    <li>Built SSR/pre-rendering with caching to improve initial load experience.</li>
                    <li>Created reusable components and monitoring SDK for error and behavior tracking.</li>
                    <li>Integrated WeChat/Alipay payments and callbacks for stable transactions.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">核心交易链路更稳定，首屏体验与可维护性提升。</span>
                    <span className="lang lang-en">
                      Stabilized critical purchase flows and improved initial-load UX and
                      maintainability.
                    </span>
                  </div>
                </div>
              </details>
              <details>
                <summary>
                  <span className="lang lang-zh inline">学掌门网校后台管理</span>
                  <span className="lang lang-en inline">XueZhangMen Admin Platform</span>
                  <span className="project-tag">2021-2025</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>React18 / Redux Toolkit / AntD / Webpack5 / Echarts</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>交付教师、学生、销售多角色后台模块与核心业务功能。</li>
                    <li>封装动态表单与通用权限/登录组件，沉淀复用能力。</li>
                    <li>统一日志与埋点上报，提升问题定位效率。</li>
                    <li>使用Web Worker处理批量计算卡顿，适配多比例大屏。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Delivered multi-role admin modules for teachers, students, and sales teams.</li>
                    <li>Built reusable dynamic forms and auth/login components.</li>
                    <li>Standardized logging and tracking to improve issue diagnosis.</li>
                    <li>Used Web Worker to avoid UI jank and adapted for multi-ratio screens.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">复用能力提升，后台交互更流畅、排障更可控。</span>
                    <span className="lang lang-en">
                      Improved reuse, smoother interactions, and more controlled troubleshooting.
                    </span>
                  </div>
                </div>
              </details>
              <details>
                <summary>
                  <span className="lang lang-zh inline">统一认证中心 UAC</span>
                  <span className="lang lang-en inline">Unified Auth Center (UAC)</span>
                  <span className="project-tag">2022-2025</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>React / Umi Max / Ant Design / Node.js CLI</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>开发CLI脚手架与模板体系，支持交互式创建项目。</li>
                    <li>基于Swagger + TypeScript生成接口代码，减少重复CRUD。</li>
                    <li>输出接入文档与最佳实践，统一权限与菜单接入规范。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Built a CLI scaffolding tool with interactive project setup.</li>
                    <li>Generated API code from Swagger + TypeScript to reduce repetitive CRUD.</li>
                    <li>Produced onboarding docs and standards for permissions and menus.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">新项目接入成本降低，研发一致性提升。</span>
                    <span className="lang lang-en">
                      Lowered onboarding cost and improved development consistency.
                    </span>
                  </div>
                </div>
              </details>
              <details>
                <summary>
                  <span className="lang lang-zh inline">博为峰 TMS 协作系统</span>
                  <span className="lang lang-en inline">BWF TMS Collaboration Suite</span>
                  <span className="project-tag">2021-2025</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>React18 / TypeScript / RTK / Socket.IO / Yjs / Sentry</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>负责私聊、频道、话题、Markdown编辑与附件管理等核心功能。</li>
                    <li>使用Socket.IO + Yjs实现多人实时协作。</li>
                    <li>接入Sentry与性能监控，完善可观测性。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Built core features for chat, channels, topics, Markdown editor, and file management.</li>
                    <li>Implemented real-time collaboration with Socket.IO and Yjs.</li>
                    <li>Integrated Sentry and performance monitoring for observability.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">协作体验更稳定，问题可追踪、可定位。</span>
                    <span className="lang lang-en">
                      Stabilized collaboration and improved traceability of issues.
                    </span>
                  </div>
                </div>
              </details>
              <details>
                <summary>
                  <span className="lang lang-zh inline">雅菲妮外贸 ERP</span>
                  <span className="lang lang-en inline">Yafeini Trade ERP</span>
                  <span className="project-tag">2019-2021</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>Vue3 / Pinia / Vite / WebSocket / IndexedDB</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>负责采购、库存、订单、财务等核心模块的交付。</li>
                    <li>万级SKU表格采用虚拟滚动与分片加载，保证页面流畅。</li>
                    <li>多币种实时换算与关键业务加密，建立监控与异常追踪。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Delivered core modules for procurement, inventory, orders, and finance.</li>
                    <li>Used virtual scrolling and chunked loading for 10k+ SKU tables.</li>
                    <li>Implemented multi-currency conversion, encryption, and monitoring.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">大数据量场景更流畅，关键业务更安全可靠。</span>
                    <span className="lang lang-en">
                      Improved large-data responsiveness and business security.
                    </span>
                  </div>
                </div>
              </details>
              <details>
                <summary>
                  <span className="lang lang-zh inline">Starbucks 微信小程序</span>
                  <span className="lang lang-en inline">Starbucks Mini Program</span>
                  <span className="project-tag">2019-2021</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>Taro / React / TypeScript / Redux</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>负责点单链路与复杂优惠计算逻辑，保障高并发下稳定运行。</li>
                    <li>推动组件化与工程化规范，优化分包与懒加载策略。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Built ordering flows and complex discount calculations for high concurrency.</li>
                    <li>Drove componentization and bundling strategies with lazy loading.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">启动与交互体验提升，核心链路更稳定。</span>
                    <span className="lang lang-en">
                      Improved startup and interaction experience with stable core flows.
                    </span>
                  </div>
                </div>
              </details>
              <details>
                <summary>
                  <span className="lang lang-zh inline">费芮敏捷 SaaS 定制化平台</span>
                  <span className="lang lang-en inline">Feirui Agile SaaS Platform</span>
                  <span className="project-tag">2019-2021</span>
                </summary>
                <div className="details-body">
                  <div className="project-meta">
                    <div>
                      <strong className="lang lang-zh inline">角色</strong>
                      <strong className="lang lang-en inline">Role</strong>
                      <span className="lang lang-zh">前端开发工程师</span>
                      <span className="lang lang-en">Front-end Engineer</span>
                    </div>
                    <div>
                      <strong className="lang lang-zh inline">技术栈</strong>
                      <strong className="lang lang-en inline">Stack</strong>
                      <span>Vue2 / Element UI / qiankun / Low-Code / Monaco</span>
                    </div>
                  </div>
                  <ul className="project-list lang lang-zh">
                    <li>基于qiankun拆分主/子应用，支持并行开发与独立部署。</li>
                    <li>建设可视化表单构建器与动态渲染引擎，支撑配置化交付。</li>
                    <li>沉淀通用组件资产，减少重复开发。</li>
                  </ul>
                  <ul className="project-list lang lang-en">
                    <li>Split main and sub apps with qiankun for parallel development.</li>
                    <li>Built a visual form builder and dynamic rendering engine.</li>
                    <li>Delivered reusable component assets to reduce duplication.</li>
                  </ul>
                  <div className="project-impact">
                    <span className="impact-tag">Impact</span>
                    <span className="lang lang-zh">配置化交付效率提升，重复开发显著减少。</span>
                    <span className="lang lang-en">
                      Improved configurable delivery and reduced repeated work.
                    </span>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>
        <section id="education" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                <span className="lang lang-zh">教育经历</span>
                <span className="lang lang-en">Education</span>
              </h2>
            </div>
            <div className="education-list" data-reveal>
              <div className="education-item">
                <div>
                  <strong>江西水利职业学院</strong>
                  <span className="lang lang-zh">大专 | 计算机应用技术</span>
                  <span className="lang lang-en">Associate | Computer Applications</span>
                </div>
                <span>2015 - 2018</span>
              </div>
              <div className="education-item">
                <div>
                  <strong>南昌大学</strong>
                  <span className="lang lang-zh">本科 | 工商管理</span>
                  <span className="lang lang-en">Bachelor | Business Administration</span>
                </div>
                <span>2020 - 2023</span>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                <span className="lang lang-zh">联系</span>
                <span className="lang lang-en">Contact</span>
              </h2>
            </div>
            <div className="contact-card" data-reveal>
              <div>
                <span className="label">Email</span>
                <a href="mailto:leaolly333@163.com">leaolly333@163.com</a>
              </div>
              <div>
                <span className="label">
                  <span className="lang lang-zh inline">手机</span>
                  <span className="lang lang-en inline">Phone</span>
                </span>
                <span>193****8996</span>
              </div>
              <div>
                <span className="label">PDF</span>
                <a href={resumeHref} target="_blank" rel="noopener">
                  assets/LiHui-Resume.pdf
                </a>
              </div>
            </div>
            <p className="contact-note">
              <span className="lang lang-zh">如需公开完整手机号或新增社交链接，请告知。</span>
              <span className="lang lang-en">
                Let me know if you want to publish full phone number or add social links.
              </span>
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>© Li Hui</span>
      </footer>
    </>
  );
}
