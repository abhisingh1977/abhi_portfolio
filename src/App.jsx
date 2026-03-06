import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import CustomCursor from "./components/CustomCursor"
import AboutSection from "./components/AboutSection"
import ProjectSection from "./components/ProjectSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import ProgressBar from "./components/ProgressBar"


export default function App() {

  const [contactFormOpen, setContactFormOpen] = useState(false)

  useEffect(() => {
    // register scrolltrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // refresh scrolltrigger when the page is fully loaded
    ScrollTrigger.refresh()

    // clean up scrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])


  return (
    <>
      <Header contactFormOpen={contactFormOpen} setContactFormOpen={setContactFormOpen} />
      <HeroSection />
      <CustomCursor />
      <AboutSection />
      <ProjectSection />
      <ContactSection onContactClick={() => setContactFormOpen(true)} />
      <Footer />
      <ProgressBar />

    </>
  )
}