import tourifyCover from "../assets/tourify (2).png";

function withFallback(images, fallbackImage) {
  return images.length ? images : [fallbackImage].filter(Boolean);
}

export default function getProjects(galleryImages = []) {
  const tourifyImages = withFallback(
    [tourifyCover, ...galleryImages.slice(0, 117)],
    tourifyCover
  );

  return [
    {
      id: 1,
      title: "Tourify Bohol App",
      category: "Mobile Tourism Experience",
      year: "2024",
      role: "UI / Frontend Concept",
      sourceUrl: "https://github.com/erl-christian/tourify-bohol-final.git",
      description:
        "A smart tourism guide and recommender app for Bohol with destination browsing, itinerary support, and image-forward mobile screens.",
      summary:
        "Tourify Bohol explores how tourism content can feel more visual, guided, and useful for travelers. The interface leans on destination imagery, guided browsing, and a layout style that keeps the user moving through places and recommendations with less friction.",
      cover: tourifyCover,
      images: tourifyImages,
      highlights: [
        "Mobile-first presentation for destinations and experiences",
        "Gallery-led screens to make attractions feel more immediate",
        "Clear visual hierarchy for exploration and recommendation flows",
      ],
      tech: ["React", "Tailwind", "Vite", "UI Design"],
    },
  ];
}
