"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { portfolioSeed } from "../lib/portfolio-seed";

type Language = "zh" | "en";
type SiteCopy = (typeof portfolioSeed)[Language];
type SectionCopy = { eyebrow: string; title: string; description: string };
type ProjectItem = SiteCopy["projects"][number];
type ProjectTrackKey = "all" | "vue" | "react" | "next" | "realtime";

const defaultContent = portfolioSeed as Record<Language, SiteCopy>;

const projectTrackLabels: Record<Language, Record<ProjectTrackKey, string>> = {
  zh: {
    all: "全部案例",
    vue: "Vue 业务系统",
    react: "React 数据产品",
    next: "Next 官网门户",
    realtime: "实时可视化",
  },
  en: {
    all: "All Cases",
    vue: "Vue Business",
    react: "React Products",
    next: "Next Portals",
    realtime: "Realtime Visuals",
  },
};

function getProjectKey(project: ProjectItem): string {
  return `${project.name}-${project.duration}`;
}

function getProjectTrackKeys(project: ProjectItem): ProjectTrackKey[] {
  const stack = project.stack.toLowerCase();
  const trackSet = new Set<ProjectTrackKey>();

  if (stack.includes("vue")) {
    trackSet.add("vue");
  }

  if (stack.includes("react")) {
    trackSet.add("react");
  }

  if (stack.includes("next")) {
    trackSet.add("next");
  }

  if (stack.includes("websocket") || stack.includes("echarts") || stack.includes("realtime")) {
    trackSet.add("realtime");
  }

  if (trackSet.size === 0) {
    trackSet.add("react");
  }

  return Array.from(trackSet);
}

function SectionHead({ eyebrow, title, description }: SectionCopy) {
  return (
    <div className="section-head">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("zh");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [contentMap, setContentMap] = useState<Record<Language, SiteCopy>>(defaultContent);
  const [activeProjectKey, setActiveProjectKey] = useState("");
  const [activeTrack, setActiveTrack] = useState<ProjectTrackKey>("all");

  useEffect(() => {
    let cancelled = false;

    const loadPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Partial<Record<Language, SiteCopy>>;

        if (!cancelled && data.zh && data.en) {
          setContentMap(data as Record<Language, SiteCopy>);
        }
      } catch {
        // keep local seed as fallback
      }
    };

    void loadPortfolioData();

    return () => {
      cancelled = true;
    };
  }, []);

  const content = useMemo(() => contentMap[language] ?? defaultContent[language], [contentMap, language]);
  const frontendShowcase = content.frontendShowcase ?? defaultContent[language].frontendShowcase;
  const hasFrontendNav = content.nav.some((item) => item.href.startsWith("#front"));
  const navItems: Array<{ href: string; label: string }> = hasFrontendNav
    ? content.nav.map((item) => ({ href: item.href, label: item.label }))
    : [
        ...content.nav.map((item) => ({ href: item.href, label: item.label })),
        { href: "#frontend", label: language === "zh" ? "前端力" : "Frontend" },
      ];

  const trackLabels = projectTrackLabels[language];
  const trackOptions = useMemo(() => {
    const counters: Record<ProjectTrackKey, number> = {
      all: content.projects.length,
      vue: 0,
      react: 0,
      next: 0,
      realtime: 0,
    };

    content.projects.forEach((project) => {
      getProjectTrackKeys(project).forEach((track) => {
        counters[track] += 1;
      });
    });

    const baseKeys: ProjectTrackKey[] = ["all", "vue", "react", "next", "realtime"];

    return baseKeys
      .filter((key) => key === "all" || counters[key] > 0)
      .map((key) => ({ key, label: trackLabels[key], count: counters[key] }));
  }, [content.projects, trackLabels]);

  const filteredProjects = useMemo(() => {
    if (activeTrack === "all") {
      return content.projects;
    }

    return content.projects.filter((project) => getProjectTrackKeys(project).includes(activeTrack));
  }, [activeTrack, content.projects]);

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);
  const hiddenProjectCount = Math.max(filteredProjects.length - 3, 0);
  const showMoreLabel =
    hiddenProjectCount > 0
      ? `${content.projectToggle.showMore} (+${hiddenProjectCount} ${content.projectToggle.hiddenCountSuffix})`
      : content.projectToggle.showMore;

  useEffect(() => {
    if (activeTrack !== "all" && !trackOptions.some((option) => option.key === activeTrack)) {
      setActiveTrack("all");
    }
  }, [activeTrack, trackOptions]);

  useEffect(() => {
    const primaryProject = filteredProjects[0];

    if (!primaryProject) {
      setActiveProjectKey("");
      return;
    }

    const firstKey = getProjectKey(primaryProject);

    if (!filteredProjects.some((project) => getProjectKey(project) === activeProjectKey)) {
      setActiveProjectKey(firstKey);
    }
  }, [activeProjectKey, filteredProjects]);

  useEffect(() => {
    if (filteredProjects.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveProjectKey((current) => {
        const index = filteredProjects.findIndex((project) => getProjectKey(project) === current);
        const nextIndex = index >= 0 ? (index + 1) % filteredProjects.length : 0;

        return getProjectKey(filteredProjects[nextIndex]);
      });
    }, 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, [filteredProjects]);

  const handleProjectPointerMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) * 2 - 1) * -4;
    const rotateY = ((x / rect.width) * 2 - 1) * 4;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--tiltX", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tiltY", `${rotateY.toFixed(2)}deg`);
  };

  const handleProjectPointerLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--mx", "-200px");
    card.style.setProperty("--my", "-200px");
    card.style.setProperty("--tiltX", "0deg");
    card.style.setProperty("--tiltY", "0deg");
  };

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="ambient-orb ambient-orb--left" />
        <span className="ambient-orb ambient-orb--right" />
        <span className="ambient-grid" />
      </div>

      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand">
            <strong>{content.brandName}</strong>
            <span>{content.brandRole}</span>
          </div>

          <nav className="site-nav" aria-label="site navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="lang-switch" role="group" aria-label="language switch">
            <button
              type="button"
              onClick={() => setLanguage("zh")}
              className={language === "zh" ? "is-active" : undefined}
            >
              中文
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={language === "en" ? "is-active" : undefined}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero panel" id="about">
          <div className="hero-main">
            <span className="hero-eyebrow">{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p>{content.hero.lead}</p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                {content.hero.primaryAction}
              </a>
              <a href="#contact" className="btn btn-ghost">
                {content.hero.secondaryAction}
              </a>
            </div>

            <div className="badge-row">
              {content.hero.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>

          <aside className="hero-side panel-soft">
            <h3>{content.hero.sideTitle}</h3>
            <p>{content.hero.sideDescription}</p>

            <div className="metric-grid">
              {content.metrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="section insight-section" id="insight">
          <SectionHead
            eyebrow={content.sections.insight.eyebrow}
            title={content.sections.insight.title}
            description={content.sections.insight.description}
          />
          <div className="insight-layout">
            <article className="insight-main panel">
              <p>{content.insight.statement}</p>
            </article>
            <article className="insight-card panel-soft">
              <h3>{content.insight.nowTitle}</h3>
              <ul>
                {content.insight.nowItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="insight-card panel-soft">
              <h3>{content.insight.principleTitle}</h3>
              <ul>
                {content.insight.principleItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="achievement">
          <SectionHead
            eyebrow={content.sections.achievement.eyebrow}
            title={content.sections.achievement.title}
            description={content.sections.achievement.description}
          />
          <div className="achievement-grid">
            {content.achievements.map((achievement) => (
              <article className="achievement-card panel" key={achievement.label}>
                <strong>{achievement.value}</strong>
                <h3>{achievement.label}</h3>
                <p>{achievement.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="capability">
          <SectionHead
            eyebrow={content.sections.capability.eyebrow}
            title={content.sections.capability.title}
            description={content.sections.capability.description}
          />
          <div className="capability-grid">
            {content.capabilities.map((capability) => (
              <article className="capability-card panel" key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.summary}</p>
                <div className="tag-list">
                  {capability.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="tooling">
          <SectionHead
            eyebrow={content.sections.tooling.eyebrow}
            title={content.sections.tooling.title}
            description={content.sections.tooling.description}
          />
          <div className="tooling-grid">
            {content.tooling.map((group) => (
              <article className="tooling-card panel-soft" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tooling-list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <SectionHead
            eyebrow={content.sections.experience.eyebrow}
            title={content.sections.experience.title}
            description={content.sections.experience.description}
          />
          <div className="timeline">
            {content.experiences.map((experience, index) => (
              <article className="timeline-item panel" key={`${experience.company}-${experience.period}`}>
                <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="timeline-main">
                  <h3>{experience.role}</h3>
                  <div className="timeline-meta">
                    <span>{experience.company}</span>
                    <span>{experience.period}</span>
                  </div>
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <SectionHead
            eyebrow={content.sections.projects.eyebrow}
            title={content.sections.projects.title}
            description={content.sections.projects.description}
          />
          <div className="project-tracks" role="tablist" aria-label={language === "zh" ? "项目分类" : "Project tracks"}>
            {trackOptions.map((option) => {
              const selected = activeTrack === option.key;

              return (
                <button
                  type="button"
                  role="tab"
                  key={option.key}
                  className={selected ? "is-active" : undefined}
                  aria-selected={selected}
                  onClick={() => {
                    setActiveTrack(option.key);
                    setShowAllProjects(false);
                  }}
                >
                  <span>{option.label}</span>
                  <em>{option.count}</em>
                </button>
              );
            })}
          </div>

          <div className="project-timeline" aria-hidden="true">
            {filteredProjects.map((project, index) => {
              const key = getProjectKey(project);
              const active = key === activeProjectKey;

              return (
                <span key={key} className={active ? "is-active" : undefined}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <small>{project.duration}</small>
                </span>
              );
            })}
          </div>

          <div className="project-toolbar">
            <span>{showAllProjects ? content.projectToggle.expandedHint : content.projectToggle.collapsedHint}</span>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setShowAllProjects((prev) => !prev)}
              aria-expanded={showAllProjects}
              aria-controls="project-grid"
            >
              {showAllProjects ? content.projectToggle.showLess : showMoreLabel}
            </button>
          </div>
          <div className="project-grid" id="project-grid">
            {visibleProjects.map((project, index) => {
              const motionStyle = { "--delay": `${index * 90}ms` } as CSSProperties;
              const projectKey = getProjectKey(project);
              const projectTracks = getProjectTrackKeys(project);
              const isActiveProject = projectKey === activeProjectKey;

              return (
                <article
                  className={`project-card panel motion-project${isActiveProject ? " is-active" : ""}`}
                  key={projectKey}
                  style={motionStyle}
                  onMouseMove={handleProjectPointerMove}
                  onMouseLeave={handleProjectPointerLeave}
                  onMouseEnter={() => setActiveProjectKey(projectKey)}
                >
                  <div className="project-motion-bar" aria-hidden="true">
                    <span />
                  </div>
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <span>{project.duration}</span>
                  </div>

                  <div className="project-track-tags" aria-label={language === "zh" ? "技术方向" : "Tech tracks"}>
                    {projectTracks.map((track) => (
                      <span key={`${projectKey}-${track}`}>{trackLabels[track]}</span>
                    ))}
                  </div>

                  <div className="project-meta">
                    <div>
                      <small>{content.projectMeta.roleLabel}</small>
                      <p>{project.role}</p>
                    </div>
                    <div>
                      <small>{content.projectMeta.scopeLabel}</small>
                      <p>{project.scope}</p>
                    </div>
                    <div>
                      <small>{content.projectMeta.stackLabel}</small>
                      <p>{project.stack}</p>
                    </div>
                  </div>

                  <div className="project-story">
                    <p>
                      <span>{content.projectMeta.challengeLabel}</span>
                      {project.challenge}
                    </p>
                    <p>
                      <span>{content.projectMeta.strategyLabel}</span>
                      {project.strategy}
                    </p>
                  </div>

                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="impact-tags" aria-label={content.projectMeta.impactLabel}>
                    {project.impact.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="project-outcome">
                    <strong>{content.projectMeta.outcomeLabel}</strong>
                    <span>{project.outcome}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section frontend-section" id="frontend">
          <SectionHead
            eyebrow={frontendShowcase.eyebrow}
            title={frontendShowcase.title}
            description={frontendShowcase.description}
          />
          <div className="frontend-grid">
            {frontendShowcase.pillars.map((pillar, index) => {
              const motionStyle = { "--delay": `${index * 80}ms` } as CSSProperties;

              return (
                <article className="frontend-card panel motion-project" key={pillar.title} style={motionStyle}>
                  <div className="frontend-card-head">
                    <span>{pillar.metric}</span>
                    <h3>{pillar.title}</h3>
                  </div>
                  <p>{pillar.detail}</p>
                  <ul>
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <article className="frontend-lab panel-soft">
            <div className="frontend-lab-head">
              <h3>{frontendShowcase.labTitle}</h3>
              <p>{frontendShowcase.labDescription}</p>
            </div>

            <div className="frontend-lab-grid">
              {frontendShowcase.labMetrics.map((metric) => {
                const meterStyle = { "--meter": metric.progress } as CSSProperties;

                return (
                  <article className="frontend-lab-item" key={`${metric.label}-${metric.value}`} style={meterStyle}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.detail}</p>
                    <i className="frontend-meter" aria-hidden="true" />
                  </article>
                );
              })}
            </div>

            <div className="frontend-gates" aria-label={frontendShowcase.gatesLabel}>
              {frontendShowcase.qualityGates.map((gate) => (
                <span key={gate}>{gate}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="section" id="process">
          <SectionHead
            eyebrow={content.sections.process.eyebrow}
            title={content.sections.process.title}
            description={content.sections.process.description}
          />
          <div className="process-grid">
            {content.process.map((step) => (
              <article className="process-card panel-soft" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <SectionHead
            eyebrow={content.sections.contact.eyebrow}
            title={content.sections.contact.title}
            description={content.sections.contact.description}
          />
          <div className="contact-layout">
            <article className="contact-card panel">
              <div>
                <span>{content.contact.phoneLabel}</span>
                <a href={`tel:${content.contact.phone.replace(/\s+/g, "")}`}>{content.contact.phone}</a>
              </div>
              <div>
                <span>{content.contact.emailLabel}</span>
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              </div>
              <div>
                <span>{content.contact.locationLabel}</span>
                <strong>{content.contact.location}</strong>
              </div>
              <div>
                <span>{content.contact.availabilityLabel}</span>
                <strong>{content.contact.availability}</strong>
              </div>
              <div>
                <span>{content.contact.responseLabel}</span>
                <strong>{content.contact.response}</strong>
              </div>
            </article>

            <article className="contact-card panel-soft">
              <h3>{content.contact.collaborationTitle}</h3>
              <ul>
                {content.contact.collaborationItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">{content.footer}</footer>
    </>
  );
}
