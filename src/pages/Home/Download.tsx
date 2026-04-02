import React from "react"
import appStoreIcon from "../../assets/icons/app-store.svg"
import googlePlayIcon from "../../assets/icons//google-play.svg"

const Download: React.FC = () => {
  return (
    <section className="relative w-full h-170  md:h-240 lg:h-180 md:py-19  lg:py-50  xl:py-60 ">
      <div
        className="py-6 "
        style={{ backgroundColor: "#EEEEFF", width: "100%" }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 1440,
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          <div className="rounded-md overflow-visible">
            <div
              className="flex flex-col lg:flex-row items-center gap-6 relative"
              style={{ height: 314 }}
            >
              {/* Left - phone image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start lg:pl-12 -mt-10 lg:-mt-20">
                <img
                  src="/images/HomePage/Free_iPhone_16_Pro_laundry2 1.svg"
                  alt="App phones"
                  className="w-[280px] md:w-[420px] lg:w-[567px] h-auto object-contain"
                  style={{ width: "100%", maxWidth: 567 }}
                />
              </div>

              {/* Right - heading + store buttons */}
              <div className="w-full lg:w-1/2 text-center px-4 lg:px-12">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#448AFF] font-['Reddit_Sans'] font-bold inline-block text-center max-w-[480px]">
                    Download Juggle Laundry
                  </h2>

                  <p className="mt-2 text-[#0D3476] font-['Reddit_Sans'] font-medium text-center inline-block max-w-[480px]">
                    We are available on your favorite platforms
                  </p>

                  <p className="mt-1 text-[#0D3476] font-['Reddit_Sans'] font-medium text-center inline-block max-w-[480px]">
                    App store & play store
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-center lg:justify-end lg:mr-40 gap-4">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#2f2f36] text-white rounded-md shadow-md hover:opacity-95 transition"
                    style={{ width: 155, height: 58 }}
                  >
                    <div className="flex items-center justify-center p-2">
                      <img
                        src={appStoreIcon}
                        alt="App Store"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col items-start leading-tight px-2">
                      <span className="text-xs">Get it on</span>
                      <span className="text-xs font-semibold">App store</span>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#2f2f36] text-white rounded-md shadow-md hover:opacity-95 transition"
                    style={{ width: 155, height: 58 }}
                  >
                    <div className="flex items-center justify-center p-2">
                      <img
                        src={googlePlayIcon}
                        alt="Play Store"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col items-start leading-tight px-2">
                      <span className="text-xs">Get it on</span>
                      <span className="text-xs font-semibold">Play store</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
