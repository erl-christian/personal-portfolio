function AnimationSlideshow({
  images = [],
  activeIndex = 0,
  title = "Project image",
  className = "",
}) {
  if (!images.length) return null;

  const currentIndex = images[activeIndex] ? activeIndex : 0;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`.trim()}>
      {images.map((image, imageIndex) => (
        <img
          key={`${image}-${imageIndex}`}
          src={image}
          alt={`${title} ${imageIndex + 1}`}
          className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
            imageIndex === currentIndex
              ? "scale-100 opacity-100"
              : "scale-105 opacity-0"
          } object-contain`}
        />
      ))}
    </div>
  );
}

export default AnimationSlideshow;
