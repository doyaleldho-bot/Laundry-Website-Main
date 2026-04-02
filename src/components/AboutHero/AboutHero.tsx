import React, { useEffect, useState } from "react"
import "./AboutHero.css"
import api from "../../utils/api"

type Props = {
  imageSrc?: string
}

type AboutType = {
  title: string
  content: string
}

const AboutHero: React.FC<Props> = ({
  imageSrc = "/images/HomePage/hero.jpg",
}) => {
  const [about, setAbout] = useState<AboutType | null>(null)

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await api.get("/cms/page/ABOUT")

        // adjust this based on your backend response
        const data = res.data?.data || res.data

        setAbout({
          title: data.title,
          content: data.content,
        })
      } catch (error) {
        console.error("Failed to load about page", error)
      }
    }

    loadAbout()
  }, [])

  // Split content into paragraphs
  const splitIntoParagraphs = (text: string) => {
    if (!text) return []

    const sentences = text
      .split(/(?<=[.?!])\s*/)
      .map((s) => s.trim())
      .filter(Boolean)

    const grouped: string[] = []
    const groupSize = Math.ceil(sentences.length / 3)
    for (let i = 0; i < sentences.length; i += groupSize) {
      grouped.push(sentences.slice(i, i + groupSize).join(" "))
    }

    return grouped
  }

  const paragraphs = splitIntoParagraphs(about?.content || "")

  return (
    <section className="about-hero">
      <h2 className=" about-hero__heading font-['Reddit_Sans'] font-medium  text-[28px] leading-tight sm:text-[34px] md:text-[44px] lg:text-[56px] xl:text-[64px] ">
        Where Clean Meets <span className="about-hero__accent">Care</span>
      </h2>

      <div className="about-hero__image-wrap">
        <img
          src={imageSrc}
          alt="People handling laundry"
          className="about-hero__image"
          loading="lazy"
        />

        <div className="about-hero__badge  font-['Reddit_Sans'] font-semibold">
          About Us
        </div>
      </div>

      <div className="about-hero__content ">
        <div className="about-hero__left font-['Reddit_Sans'] ">
          <div className="about-hero__pre font-medium">Get to know</div>
          <h3 className="about-hero__title font-semibold">
            {about?.title || "Loading..."}
          </h3>
          <button className="about-hero__cta"> Schedule Pick - Up ↗</button>
          <img
            src="/images/HomePage/bubble.svg"
            alt=""
            className="w-[420px] h-[393px] -ml-5 hidden lg:block"
          />
        </div>

        <div className="about-hero__right space-y-4 font-['Reddit_Sans'] font-regular">
          {paragraphs.map((para, index) => (
            <p key={index}>{para.endsWith(".") ? para : `${para}.`}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutHero