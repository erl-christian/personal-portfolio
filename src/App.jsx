import "./App.css";
import { useEffect, useState } from "react";
import programImage from "./assets/program.png";
import ProjectModal from "./components/ProjectModal.jsx";
import getProjects from "./data/projects.js";
import useGalleryImages from "./hooks/useGalleryImage.js";

const navigation = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const profileFacts = [
  { label: "Education", value: "BS Information Technology" },
  { label: "Base", value: "Clarin, Bohol" },
  { label: "Focus", value: "Frontend, UI/UX, and digital visuals" },
  { label: "Email", value: "albuenaerlchristian@gmail.com" },
];

const strengths = [
  {
    title: "Frontend and interface work",
    copy:
      "I enjoy building clean, responsive screens that feel clear, practical, and easy to use.",
  },
  {
    title: "Creative production background",
    copy:
      "Video editing and design work taught me pacing, presentation, and how to shape a strong visual story.",
  },
  {
    title: "Adaptable problem solver",
    copy:
      "From tutoring to self-directed learning, I am used to learning quickly and turning feedback into better output.",
  },
];

const workExperience = [
  {
    period: "2020 - 2021",
    title: "Video Editor",
    org: "Freelance",
    copy:
      "Edited video content with attention to timing, visual clarity, and audience engagement.",
  },
  {
    period: "2023",
    title: "Student Tutor",
    org: "Self-employed",
    copy:
      "Helped students understand lessons more clearly while building patience, communication, and leadership.",
  },
];

const affiliations = [
  {
    period: "2022 - 2023",
    title: "Creative Staff",
    org: "Society of Young Computer Professionals",
    copy:
      "Supported organization materials and visual assets for school activities and announcements.",
  },
  {
    period: "2023 - 2024",
    title: "Creative Lead",
    org: "Society of Young Computer Professionals",
    copy:
      "Led the creative direction for school organization outputs and coordinated stronger visual consistency.",
  },
];

const skillGroups = [
  {
    title: "Development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind",
      "MySQL",
      "Java",
      "C#",
      "C",
    ],
  },
  {
    title: "Design and Media",
    items: [
      "Figma",
      "Canva",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "UI/UX Design",
    ],
  },
  {
    title: "Professional Skills",
    items: [
      "MS Word",
      "MS Excel",
      "MS PowerPoint",
      "Computer navigation",
      "Interpersonal skills",
      "Problem solving",
      "Decision making",
    ],
  },
];

const contactCards = [
  {
    label: "Email",
    value: "albuenaerlchristian@gmail.com",
    href: "mailto:albuenaerlchristian@gmail.com",
  },
  {
    label: "Contact Number",
    value: "09629320078",
    href: "tel:09629320078",
  },
  {
    label: "Location",
    value: "Sitio Halay Halay, Poblacion Centro, Clarin, Bohol 6330",
  },
];

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="reveal-up" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
        {copy}
      </p>
    </div>
  );
}

function TimelineItem({ period, title, org, copy }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.05]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
        {period}
      </p>
      <h3 className="font-display mt-3 text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm font-medium text-amber-300">{org}</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function SkillGroup({ title, items }) {
  return (
    <article className="reveal-up glass-panel rounded-[28px] p-6" data-reveal>
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function App() {
  const galleryImages = useGalleryImages();
  const projects = getProjects(galleryImages);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollData, setScrollData] = useState({ y: 0, progress: 0 });

  useEffect(() => {
    let frameId = 0;

    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextY = window.scrollY;
      setScrollData({
        y: nextY,
        progress: maxScroll > 0 ? nextY / maxScroll : 0,
      });
      frameId = 0;
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const heroPreview = galleryImages[4] || projects[0]?.cover || programImage;
  const heroDetail = galleryImages[9] || projects[0]?.cover || programImage;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <div
        className="fixed left-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-amber-300 via-cyan-300 to-sky-500"
        style={{ transform: `scaleX(${scrollData.progress})`, width: "100%" }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-[6%] top-28 h-48 w-48 rounded-full bg-amber-300/18 blur-3xl md:h-72 md:w-72"
          style={{
            transform: `translate3d(0, ${scrollData.y * 0.08}px, 0)`,
          }}
        />
        <div
          className="absolute right-[8%] top-[16rem] h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl md:h-80 md:w-80"
          style={{
            transform: `translate3d(0, ${scrollData.y * -0.05}px, 0)`,
          }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="font-display text-lg font-bold tracking-wide">
            Erl Albuena
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
          >
            Contact Me
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section
          id="home"
          className="grid min-h-[calc(100vh-5rem)] gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20"
        >
          <div className="reveal-up" data-reveal>
            <p className="eyebrow">Frontend Developer and Creative Builder</p>

            <h1 className="font-display mt-7 max-w-3xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-7xl">
              Erl Christian L. Albuena builds clear interfaces with strong visual
              direction.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I aim to enhance my knowledge and skills through practical
              experience in a professional environment. I bring strong work
              ethic, self-directed learning, and hands-on technical and creative
              experience that can support real projects.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="rounded-full bg-amber-300 px-6 py-3 text-center font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                View Projects
              </a>

              <a
                href="#about"
                className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/[0.03]"
              >
                About Me
              </a>

              <a
                href="https://github.com/erl-christian"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/[0.03]"
              >
                <i className="fi fi-brands-github text-2xl"></i>
              </a>
            </div>


            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {profileFacts.map((fact) => (
                <article
                  key={fact.label}
                  className="glass-panel rounded-[24px] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-100">
                    {fact.value}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal-up relative" data-reveal>
            <div className="absolute inset-0 scale-105 rounded-[40px] bg-gradient-to-br from-cyan-400/14 via-transparent to-amber-300/14 blur-2xl" />

            <div
              className="glass-panel shimmer-border relative overflow-hidden rounded-[36px] p-4"
              style={{
                transform: `translate3d(0, ${scrollData.y * -0.06}px, 0)`,
              }}
            >
              <div className="mb-4 flex items-center justify-between px-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                <span>Portfolio Preview</span>
                <span>One Page Layout</span>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900">
                <img
                  src={programImage}
                  alt="Programmer portfolio hero preview"
                  className="h-[26rem] w-full object-cover object-top"
                  style={{
                    transform: `scale(1.03) translate3d(0, ${
                      scrollData.y * -0.04
                    }px, 0)`,
                  }}
                />
              </div>
            </div>

            <article className="glass-panel animate-float absolute -left-4 bottom-8 hidden w-52 rounded-[24px] p-4 md:block">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                School Role
              </p>
              <p className="font-display mt-3 text-lg font-semibold text-white">
                Creative Lead
              </p>
              <p className="mt-1 text-sm text-amber-300">SYCP / 2023 - 2024</p>
            </article>

            <article
              className="glass-panel animate-drift absolute -right-3 top-10 hidden w-56 rounded-[24px] p-3 md:block"
              style={{
                transform: `translate3d(0, ${scrollData.y * 0.05}px, 0)`,
              }}
            >
              <img
                src={heroPreview}
                alt="Project preview"
                className="h-32 w-full rounded-[18px] object-cover"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-400">
                Selected Work
              </p>
              <p className="mt-2 text-sm text-slate-100">
                App UI concepts, portfolio work, and image-first tourism screens.
              </p>
            </article>

            <article
              className="glass-panel absolute right-8 top-[73%] hidden w-48 rounded-[22px] p-3 lg:block"
              style={{
                transform: `translate3d(0, ${scrollData.y * -0.03}px, 0)`,
              }}
            >
              <img
                src={heroDetail}
                alt="Tourism interface sample"
                className="h-24 w-full rounded-[16px] object-cover"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-400">
                Motion Focus
              </p>
              <p className="mt-2 text-sm text-slate-100">
                Scroll-led depth, layered cards, and cleaner storytelling.
              </p>
            </article>
          </div>
        </section>

        <section id="about" className="border-t border-white/10 py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="About"
              title="A one-page portfolio that reads like a story, not a list."
              copy="This portfolio is focused on the work and strengths that matter most: interface building, visual communication, and the discipline to keep learning fast in a professional environment."
            />

            <div className="grid gap-6">
              <article className="reveal-up glass-panel rounded-[30px] p-8" data-reveal>
                <p className="text-sm leading-8 text-slate-300">
                  I am a Bachelor of Science in Information Technology student
                  with experience across design, tutoring, editing, and frontend
                  implementation. That mix helps me think about both function and
                  presentation, from clean code and responsive layouts to better
                  structure, visuals, and user flow.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      Education
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-100">
                      Bachelor of Science in Information Technology
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      Current Goal
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-100">
                      Gain practical experience and contribute reliable work in a
                      professional team environment.
                    </p>
                  </div>
                </div>
              </article>

              <div className="grid gap-4 md:grid-cols-3">
                {strengths.map((item) => (
                  <article
                    key={item.title}
                    className="reveal-up rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
                    data-reveal
                  >
                    <h3 className="font-display text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {item.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-white/10 py-24">
          <SectionHeading
            eyebrow="Experience"
            title="Creative work, tutoring, and school leadership shaped how I work."
            copy="The experience here is early-stage, but it already shows a pattern: communicating clearly, solving problems, and producing better visual and technical output over time."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="reveal-up glass-panel rounded-[30px] p-8" data-reveal>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-white">
                  Work Experience
                </h3>
                <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                  Practical Work
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {workExperience.map((item) => (
                  <TimelineItem key={`${item.period}-${item.title}`} {...item} />
                ))}
              </div>
            </article>

            <article className="reveal-up glass-panel rounded-[30px] p-8" data-reveal>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-white">
                  School Affiliations
                </h3>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
                  Leadership
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {affiliations.map((item) => (
                  <TimelineItem key={`${item.period}-${item.title}`} {...item} />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-white/10 py-24">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="Skills"
              title="My toolkit covers frontend, design, media work, and communication."
              copy="The strongest fit is at the intersection of design thinking and implementation: shaping screens, refining the visual flow, and building usable interfaces with modern frontend tools."
            />

            <div className="grid gap-4 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <SkillGroup key={group.title} {...group} />
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-white/10 py-24">
          <SectionHeading
            eyebrow="Projects"
            title="Major Projects"
            copy="The page stays focused and fast. Project cards give a strong preview first, while the modal keeps the deeper gallery and supporting details out of the way until someone asks for them."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProject(project)}
                className={`reveal-up group relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/70 text-left transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${
                  index === 0 ? "xl:col-span-2 xl:grid xl:grid-cols-[1.1fr_0.9fr]" : ""
                }`}
                data-reveal
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                      index === 0 ? "h-full min-h-[22rem]" : "h-72"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                </div>

                <div className="relative flex flex-col justify-end p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    {project.category}
                  </p>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
                    <span>{project.year}</span>
                    <span className="font-semibold text-white">Open Details</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-24">
          <div className="reveal-up glass-panel rounded-[34px] p-8 sm:p-10" data-reveal>
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="font-display mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Ready for internship, junior opportunities, or creative
                  collaboration.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  If you want someone who can support frontend work, shape better
                  UI presentation, and keep improving through real project
                  experience, reach out. I am open to opportunities where I can
                  contribute and grow.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:albuenaerlchristian@gmail.com"
                    className="rounded-full bg-cyan-300 px-6 py-3 text-center font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  >
                    Send Email
                  </a>
                  <a
                    href="tel:09629320078"
                    className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-white/[0.03]"
                  >
                    Call Me
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {contactCards.map((card) =>
                  card.href ? (
                    <a
                      key={card.label}
                      href={card.href}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06]"
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                        {card.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white">
                        {card.value}
                      </p>
                    </a>
                  ) : (
                    <div
                      key={card.label}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                        {card.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white">
                        {card.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Erl Christian L. Albuena</p>
          <p>Frontend developer, UI-focused builder, and creative learner.</p>
        </div>
      </footer>

      <ProjectModal
        key={selectedProject?.id ?? "project-modal"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
