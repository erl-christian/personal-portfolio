import { useMemo } from "react";

function getImageOrder(path) {
  const match = path.match(/tb(\d+)/i);
  return match ? Number(match[1]) : 0;
}

export default function useGalleryImages() {
  const galleryImages = useMemo(() => {
    return Object.values(
      import.meta.glob("../assets/tourify-bohol/*.{jpg,png,jpeg}", {
        eager: true,
      })
    )
      .map((mod) => mod.default)
      .sort((first, second) => getImageOrder(first) - getImageOrder(second));
  }, []);

  return galleryImages;
}
