import { useState, useEffect } from "react";

function Slideshow() {

    const images = Object.values(
        import.meta.glob('../assets/tourify-bohol/*.{jpg,png,jpeg}', { eager: true})
    )
        .map((mod) => mod.default)
        .sort()

    const [index, setIndex] = useState(0)

    //automatic slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [images.length])

    return (
    <div className="relative w-full">

      {/* IMAGE */}
      <img
        src={images[index]}
        alt="slide"
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-2xl transition duration-500"
      />

      {/* DOTS */}
      <div className="flex justify-center mt-3 gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow