const ChooseUs = () => {
  return (
    <div>
      {/* Why choose US */}
      {/* image */}
      <div>
        <section>
          <div
            className=" relative w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('/images/HomePage/4ca83e5f47cb1f266860c0379a9d32ddf36e923c.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="text-center text-white max-w-2xl px-4 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[120%] relative">
              <p className="font-['Reddit_Sans'] font-medium leading-tight">
                Your clothes are safe with us, always…
              </p>

              <p className="font-['Reddit_Sans'] font-normal mt-2">
                100% trusted care from wash to delivery.
              </p>
            </div>
          </div>

          {/* properties */}
          <div className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Image */}
              <div className="flex justify-center order-2 md:order-1">
                <img
                  src="/images/ChooseUs.webp"
                  alt="Laundry care"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md object-cover"
                />
              </div>

              {/* Right - Content */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-bold text-[#448AFF] mb-4">
                  Why choose us?
                </h2>
                <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-semibold font-['Reddit_Sans'] text-[#474747] mb-6">
                  Simple, fast, and fabric-safe laundry
                </h3>

                <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                  We make laundry easy and stress-free. Our expert care, modern
                  machines, and gentle detergents keep your clothes fresh,
                  clean, and long-lasting. With quick turnaround times and
                  reliable service, we ensure your laundry is done right—every
                  time.
                </p>

                {/* Features List */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">
                      Hygienic and fabric-safe cleaning
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">
                      On-time pickup and delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">
                      Affordable and transparent pricing
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">
                      Skilled professionals & modern equipment
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">
                      Care for every fabric type
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base sm:text-lg text-gray-700">
                      Eco-friendly detergents
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ChooseUs
