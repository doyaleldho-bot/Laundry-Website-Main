import React from "react"
interface HeroProps {
  img: string
  text1: string
  text2: string
  className?: string
}

const Hero: React.FC<HeroProps> = ({ img, text1, text2, className }) => {
  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[460px] xl:h-[500px] mb-16 overflow-hidden">
      <img
        src={img}
        alt="Laundry service"
        className="absolute  w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#8f8d8d] to-transparent z-10" />
      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-8 lg:px-16">
        <h1
          className={`${className} font-['Reddit_Sans'] font-semibold text-white text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px] xl:text-[64px] leading-[110%]  `}
        >
          {text1}
          <br />
          {text2} <span className="text-[#a0caea]">Doorstep</span>
        </h1>
      </div>
    </div>
  )
}

export default Hero
