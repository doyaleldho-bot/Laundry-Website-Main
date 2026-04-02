const Resposibility = () => {
  return (
    <section className="w-full flex justify-center px-4 sm:px-6 lg:px-18 py-12 md:py-16 bg-[#F7F7F7] ">
      <div className="max-w-[1440px] w-full">
        <div className="flex flex-col xl:flex-row gap-8 md:gap-10 xl:gap-50 items-center">
          {/* Image */}
          <div className="w-full xl:w-[527px] overflow-hidden rounded-lg">
            <img
              src="/images/HomePage/responsibility.svg"
              alt="Man with clean clothes"
              className="w-full h-[300px] sm:h-[360px] md:h-[420px] xl:h-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="w-full max-w-[628px] space-y-4 md:space-y-5 xl:space-y-6">
            <h2 className="font-medium font-['Reddit_Sans'] text-[22px] sm:text-[26px] md:text-[30px] xl:text-[36px] leading-tight text-[#1f2937]">
              Your Clothes, Our Responsibility
            </h2>

            <p className="font-regular font-['Reddit_Sans'] text-[14px] sm:text-[16px] md:text-[18px] xl:text-[20px] leading-relaxed text-[#4b5563]">
              We treat every garment with dedicated attention and professional
              care, using modern cleaning techniques and fabric-safe detergents
              to ensure freshness, softness, and long-lasting quality. From
              everyday wear to delicate fabrics and special outfits, each item
              is handled with precision and respect.
            </p>

            <p className="text-[14px] sm:text-[16px] md:text-[18px] xl:text-[20px] leading-relaxed text-[#4b5563]">
              With convenient doorstep pickup and delivery, timely service, and
              a strong focus on hygiene, we make laundry simple and stress-free.
              Our goal is to save your time while keeping your wardrobe looking,
              feeling, and smelling its best—every single time.
            </p>

            <p className="pt-2 md:pt-3 xl:pt-4">
              <span className="text-[14px] sm:text-[16px] md:text-[18px] xl:text-[20px] text-[#003399] leading-loose">
                Contact us today and experience truly hassle-free, reliable
                laundry service.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resposibility
