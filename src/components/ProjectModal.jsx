import { useEffect, useState } from "react";
import AnimationSlideshow from "./AnimationSlideshow";

function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const images = project?.images || [];
  const activeIndex = images[index] ? index : 0;

  const nextSlide = () => {
    if (!images.length) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    if (!images.length) return;
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && images.length) {
        setIndex((prev) => (prev + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && images.length) {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose, images.length]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/82 p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/10 bg-slate-950 shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-white transition hover:bg-white/14"
        >
          X
        </button>

        <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-white/10 bg-[#050b16] lg:border-b-0 lg:border-r">
            <div className="relative flex h-[26rem] items-center justify-center bg-black sm:h-[32rem]">
              {images.length > 0 && (
                <AnimationSlideshow
                  images={images}
                  activeIndex={activeIndex}
                  title={project.title}
                  className="h-full w-full"
                />
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 rounded-full border border-white/10 bg-black/45 px-4 py-3 text-xl text-white transition hover:bg-black/65"
                  >
                    {"<"}
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 rounded-full border border-white/10 bg-black/45 px-4 py-3 text-xl text-white transition hover:bg-black/65"
                  >
                    {">"}
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-sm">
                  {images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={() => setIndex(imageIndex)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        imageIndex === activeIndex ? "bg-cyan-300" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 p-3 sm:grid-cols-5">
                {images.map((image, imageIndex) => (
                  <button
                    key={imageIndex}
                    onClick={() => setIndex(imageIndex)}
                    className={`overflow-hidden rounded-2xl border-2 transition ${
                      imageIndex === activeIndex
                        ? "border-cyan-300"
                        : "border-transparent hover:border-white/20"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} thumbnail ${imageIndex + 1}`}
                      className="h-20 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {project.category}
            </p>

            <h2 className="font-display mt-4 text-3xl font-semibold text-white">
              {project.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                {project.year}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                {project.role}
              </span>
            </div>

            <p className="mt-6 leading-8 text-slate-300">
              {project.summary || project.description}
            </p>

            {project.sourceUrl && (
              <div className="mt-8">
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-200/55 hover:bg-cyan-300/15"
                >
                  View Source on GitHub
                </a>
              </div>
            )}

            {project.highlights?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Highlights
                </h3>
                <div className="mt-4 space-y-3">
                  {project.highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Tech Used
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

export default ProjectModal;
