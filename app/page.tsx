import CallToAction from "@/components/Home/CTA/CalltoAction";
import CurrentFocus from "@/components/Home/CurrentFocus/CurrentFocus";
import FeaturedWorks from "@/components/Home/FeaturedWorks/Featuredworks";
import Footer from "@/components/Home/Footer/Footer";
import Hero from "@/components/Home/Hero/Hero";
import Skills from "@/components/Home/Skills/Skills";
import Timeline from "@/components/Home/Timeline/Timeline";



export default function SajadWeb(){
  return (
    <>
      <Hero/>
      <CurrentFocus/>
      <FeaturedWorks/>
      <Skills/>
      <Timeline/>
      <CallToAction/>
      <Footer/>
    </>

  )
}