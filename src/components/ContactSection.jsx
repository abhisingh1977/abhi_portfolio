import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


const ContactSection = ({ onContactClick }) => {

    // main refs 
    const circleRef = useRef(null)
    const sectionRef = useRef(null)
    const initialTextRef = useRef(null)
    const finalTextRef = useRef(null)

    useEffect(() => {
        // register gsap plugin
        gsap.registerPlugin(ScrollTrigger)

        // make sure all scrollTrigger instances are properly killed
        const cleanup = () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.vars.trigger === sectionRef.current) {
                    st.kill(true)
                }
            })
        }

        // clean up any existing scrollTrigger
        cleanup()

        // set initial states
        gsap.set(circleRef.current, { scale: 1, backgroundColor: "white" })
        gsap.set(initialTextRef.current, { opacity: 1 })
        gsap.set(finalTextRef.current, { opacity: 0 })

        // create the main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                pinSpacing: true,
                scrub: 0.3,
                anticipatePin: 1,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
            }
        })

        // initial state to mid-zoom (0-50%)
        tl.to(
            circleRef.current,
            {
                scale: 5,
                backgroundColor: "#9333EA",
                ease: "power1.inOut",
                duration: 0.5,
            },
            0,
        )

        // fade out initial text during first half

        tl.to(
            initialTextRef.current,
            {
                opacity: 0,
                ease: "power1.inOut",
                duration: 0.2,
            },
            0.1,
        )

        // mid-zone to final state(50-100%)
        tl.to(
            circleRef.current,
            {
                scale: 17,
                backgroundColor: "#E9D5FF",
                boxShadow: "0 0 50px 20px rgba(233,213,255,0.3)",
                ease: "power2.inOut",
                duration: 0.5,
            },
            0.5,
        )

        // fade in final text during second half
        tl.to(
            finalTextRef.current,
            {
                opacity: 1,
                ease: "power2.in",
                duration: 0.2,
            },
            0.7,
        )

        // return cleanup function
        return cleanup

    }, [])


    return (
        <section
            ref={sectionRef}
            className="flex items-center justify-center bg-black relative h-screen overflow-hidden" id="contact">


            {/* simple circle with minimal nesting */}

            <div ref={circleRef}
                className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-gradient-to-r from-violet-400 to-pink-100">

                {/* initial text  */}
                <p ref={initialTextRef}
                    className="text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center justify-center text-center">
                    SCROLL DOWN
                </p>

                {/* final text  */}

                <div ref={finalTextRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] flex flex-col items-center justify-center text-center opacity-0">

                    <h1 className="text-black font-extrabold text-[5px] sm:text-[5.5px] md:text-[6px] leading-[1.2] mb-[4px]">
                        Step Into the Future <br /> with Abhi Aryan
                    </h1>

                    <p className="text-black text-[1.4px] sm:text-[1.6px] md:text-[1.8px] leading-[1.5] mb-[5px]">
                        Full-stack MERN stack developer building modern, scalable web applications using <br />MongoDB, Express.js, React, and Node.js.Focused on clean code,<br />responsive design, and efficient full-stack solutions
                    </p>

                    <button onClick={onContactClick} className="px-[5px] py-[1.5px] rounded-full bg-black text-white hover:bg-white hover:text-black transition-all duration-500 text-[1.3px] sm:text-[1.4px] text-nowrap flex items-center justify-center">
                        Contact Me
                    </button>
                </div>

            </div>

        </section>
    )
}

export default ContactSection