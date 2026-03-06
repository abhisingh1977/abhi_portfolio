import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiInstagram, FiMenu, FiX, FiLinkedin } from 'react-icons/fi'
import { useState } from "react"

const Header = ({ contactFormOpen, setContactFormOpen }) => {
    //Toggle the menu 
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const openContactForm = () =>
        setContactFormOpen(true);

    const closeContactForm = () => {
        setContactFormOpen(false);
        setFormStatus('');
    };

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState(''); // '', 'success', 'error'
    const [statusMessage, setStatusMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('');

        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setFormStatus('success');
                setStatusMessage(data.message);
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus('error');
                setStatusMessage(data.message);
            }
        } catch (error) {
            setFormStatus('error');
            setStatusMessage('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <header className="absolute w-full z-50 transition-all duration-300">

            <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20'>

                {/* Logo/Name */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: "100",
                        damping: 25,
                        delay: 0.3,
                        duration: 1.2,
                    }}
                    className='flex items-center'>
                    <div className='h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-2'>
                        A
                    </div>

                    <span className='text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-100 bg-clip-text text-transparent'>Abhi Aryan

                    </span>
                </motion.div>

                {/* desktop Navigation */}
                <nav className='lg:flex hidden space-x-8'>
                    {["Home", "About", "Projects", "Contact"].map((item,
                        index) => {
                        const sectionIds = { Home: "#home", About: "#about", Projects: "#projects", Contact: "#contact" }
                        return (
                            <motion.a
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: "100",
                                    damping: 20,
                                    delay: 0.7 + index * 0.1

                                }}


                                className='relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group'
                                href={sectionIds[item]}>
                                {item}
                                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300'></span>
                            </motion.a>
                        )
                    })}
                </nav>

                {/* Social icons */}
                <div className='md:flex hidden items-center space-x-4'>

                    <motion.a
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className='text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition duration-300' href="https://github.com/abhisingh1977" target="_blank" rel="noopener noreferrer">
                        <FiGithub className='w-5 h-5' />
                    </motion.a>

                    <motion.a
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className='text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition duration-300' href="https://www.instagram.com/abhi___1977/" target="_blank" rel="noopener noreferrer">
                        <FiInstagram className='w-5 h-5' />
                    </motion.a>

                    <motion.a
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className='text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition duration-300' href="https://www.linkedin.com/in/abhi-aryan-7176b3327/" target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className='w-5 h-5' />
                    </motion.a>


                    {/* Hire Me  */}
                    <motion.button
                        onClick={openContactForm}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: "100",
                            damping: 25,
                            delay: 0.3,
                            duration: 1.2,
                        }}
                        className='ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to bg-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition duration-300'>
                        Hire Me
                    </motion.button>
                </div>

                {/* Mobile Menu Button       */}
                <div className='md:hidden flex items-center'>
                    <motion.button
                        whileTap={{ scale: 0.7 }}
                        onClick={toggleMenu}
                        className="text-gray-300">
                        {isOpen ? <FiX className='h-6 w-6' /> : <FiMenu className='h-6 w-6' />}
                    </motion.button>
                </div>

            </div>

            {/* Mobile Menu  */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                }}
                transition={{
                    duration: 0.5
                }}


                className='md:hidden overflow-hidden bg-white dark:bg-black shadow-lg px-4 space-y-5' >

                <nav className='flex flex-col space-y-3'>
                    {["Home", "About", "Projects", "Contact"].map((item) => {
                        const sectionIds = { Home: "#home", About: "#about", Projects: "#projects", Contact: "#contact" }
                        return (
                            <a onClick={toggleMenu} className='text-gray-300 font-medium py-2' key={item}
                                href={sectionIds[item]}>
                                {item}
                            </a>
                        )
                    })}

                </nav>
                <div className='pt-4 border-t dark:border-gray-700'>
                    <div className='flex space-x-5'>
                        <a href="https://github.com/abhisingh1977" target="_blank" rel="noopener noreferrer">
                            <FiGithub className='h-5 w-5 text-gray-300' />
                        </a>
                        <a href="https://www.instagram.com/abhi___1977/" target="_blank" rel="noopener noreferrer">
                            <FiInstagram className='h-5 w-5 text-gray-300' />
                        </a>
                        <a href="https://www.linkedin.com/in/abhi-aryan-7176b3327/" target="_blank" rel="noopener noreferrer">
                            <FiLinkedin className='h-5 w-5 text-gray-300' />
                        </a>
                    </div>

                    <button
                        onClick={() => {
                            toggleMenu()
                            openContactForm()
                        }}
                        className='mt-4 block w-full px-4 py-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold'>
                        Contact Me
                    </button>

                </div>

            </motion.div>

            {/* Contact Form */}
            <AnimatePresence>
                {contactFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}

                        className="fixed inset-0 bg-black/70 background-blur-sm z-50 flex items-center justify-center">


                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{
                                type: "spring",
                                stiffness: "200",
                                damping: 30,
                                duration: 0.8
                            }}

                            className='bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6'>

                            <div className='flex justify-between items-center mb-4'>
                                <h1 className='text-2xl font-bold text-gray-300'>
                                    Get in Touch
                                </h1>

                                <button onClick={closeContactForm}>
                                    <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                                </button>
                            </div>

                            {/* input forms*/}
                            <form className='space-y-4' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className='block text-sm font-medium text-gray-300 mb-1'>Name</label>
                                    <input type="text"
                                        id='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder='Your Name'
                                        required
                                        className='w-full px-4 py-2 border border-gray-600 rounded-lg focus:border-violet-500 bg-gray-700' />
                                </div>

                                <div>
                                    <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
                                    <input type="email"
                                        id='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder='Your Email'
                                        required
                                        className='w-full px-4 py-2 border border-gray-600 rounded-lg focus:border-violet-500 bg-gray-700' />
                                </div>

                                <div>
                                    <label htmlFor="message" className='block text-sm font-medium text-gray-300 mb-1'>Message</label>
                                    <textarea rows="4"
                                        id='message'
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder='How can I help you?'
                                        required
                                        className='w-full px-4 py-2 border border-gray-600 rounded-lg focus:border-violet-500 bg-gray-700' />
                                </div>

                                {/* Status message */}
                                {formStatus && (
                                    <div className={`text-sm text-center py-2 rounded-lg ${formStatus === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {statusMessage}
                                    </div>
                                )}

                                <motion.button
                                    type='submit'
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                                    className={`w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>


        </header>
    )
}

export default Header