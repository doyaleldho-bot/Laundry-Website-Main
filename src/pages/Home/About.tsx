import AboutHero from "../../components/AboutHero/AboutHero"

const About = () => {
  return (
    <section id="about" className="-scroll-mt-1">
      <div className=" bg-[#F7F7F7] ">
        <AboutHero imageSrc={"/images/HomePage/aboutUs.svg"} />
      </div>
    </section>
  )
}

export default About
