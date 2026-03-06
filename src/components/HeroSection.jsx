import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { FiLinkedin, FiFileText } from "react-icons/fi";


const HeroSection = () => {
    return (
        <section id="home" className="h-screen bg-gradient-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">

            {/* left section  */}

            <div className="z-40 xl:mb-0 mb-[20%]">
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 40,
                        damping: 25,
                        delay: 1.3,
                        duration: 1.2
                    }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6">Hi, I'm <span className="text-purple-500">Abhi</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 40,
                        damping: 25,
                        delay: 1.8,
                        duration: 1.5
                    }}

                    className="text-xl md:text-2xl lg:text-3xl text-purple-200 max-w-2xl">
                    I develop modern web apps, <br /> user interfaces and interactive experiences
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 40,
                        damping: 25,
                        delay: 2.2,
                        duration: 1.5
                    }}
                    className="flex gap-4 mt-8">

                    <a href="https://www.linkedin.com/in/abhi-aryan-7176b3327/" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
                        <FiLinkedin className="w-5 h-5" />
                        LinkedIn
                    </a>

                    <a href="/Abhi_Resume.pdf" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 border-2 border-white/30 hover:border-white text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10">
                        <FiFileText className="w-5 h-5" />
                        Resume
                    </a>

                </motion.div>
            </div>

            {/* right section  */}

            <Spline className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0 scale-125" scene="https://prod.spline.design/mxjrcpP1sHiIBoB0/scene.splinecode" />


        </section>
    )
}

export default HeroSection