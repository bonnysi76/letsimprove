"use client"

import { useState, useEffect, createContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Mail, Linkedin, Github, ExternalLink, Code, Sun, Moon, Monitor, Twitter } from "lucide-react"

// Theme context
type Theme = "light" | "blue-dark" | "black"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "blue-dark",
  setTheme: () => {},
})

export default function PortfolioWebsite() {
  // Theme state
  const [theme, setTheme] = useState<Theme>("blue-dark")
  const [activeSection, setActiveSection] = useState("profile")
  const [menuOpen, setMenuOpen] = useState(false)

  const [certificates] = useState([
    {
      name: "AWS Cloud Practitioner",
      preview: "/placeholder.svg?height=200&width=300",
      date: "May 2023",
    },
    {
      name: "Cisco CCNA",
      preview: "/placeholder.svg?height=200&width=300",
      date: "January 2023",
    },
    {
      name: "CompTIA Security+",
      preview: "/placeholder.svg?height=200&width=300",
      date: "August 2022",
    },
    {
      name: "Microsoft Azure Fundamentals",
      preview: "/placeholder.svg?height=200&width=300",
      date: "March 2023",
    },
  ])

  // Skills data
  const technicalSkills = [
    { name: "HTML", level: "Experienced" },
    { name: "CSS", level: "Experienced" },
    { name: "JavaScript", level: "Experienced" },
    { name: "Python", level: "Experienced" },
    { name: "Cisco Networking", level: "Intermediate" },
    { name: "SQL Server", level: "Intermediate" },
    { name: "AWS & Microsoft Azure", level: "Intermediate" },
    { name: "Technical Troubleshooting", level: "Experienced" },
    { name: "Network Security", level: "Intermediate" },
  ]

  const softwareSkills = [
    { name: "Resolving Software-Related Issues", level: "Experienced" },
    { name: "Documentation", level: "Experienced" },
    { name: "Application use support", level: "Experienced" },
    { name: "Client support", level: "Experienced" },
    { name: "Storing Database in SQL Server", level: "Experienced" },
    { name: "Troubleshoot Software", level: "Experienced" },
  ]

  const projects = [
    {
      title: "Wi-fi Hacking Investigation in Public Networks",
      description:
        "Investigated vulnerabilities in public Wi-Fi networks, analyzing encryption protocols (WEP, WPA, WPA3) through simulations to assess security risks.",
      skills: "Network security, ethical hacking, wireless protocols, simulation environments",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Mobile Application Development",
      description:
        "Developed and managed a mobile app that connects users with local eco-friendly service providers, addressing user growth and revenue diversification challenges.",
      skills: "Mobile app Development, business strategy, product management, sustainability focus",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Damn Vulnerable Web Application (DVWA) Security Assessment",
      description:
        "Conducted a comprehensive security assessment using DVWA to identify vulnerabilities like SQL injection, XSS, and CSRF.",
      skills: "Ethical hacking, penetration testing, vulnerability analysis, report writing",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Cyber Supply Chain Risk Management",
      description: "Designed a framework to detect and mitigate risks from compromised suppliers.",
      skills: "Supply chain security, risk management, monitoring, incident detection",
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  // Typewriter effect
  const [typedText, setTypedText] = useState("")
  const phrases = ["Software Developer", "Security and Network Engineer"]
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100
    const timer = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
      } else {
        setTypedText(currentPhrase.substring(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, phraseIndex, phrases])

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  // Theme-related styles
  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return {
          background: "bg-gray-100",
          text: "text-gray-800",
          cardBg: "bg-white",
          cardBorder: "border-gray-200",
          heading: "text-gray-900",
          subheading: "text-gray-700",
          accent: "text-[#191970]",
          accentBg: "bg-[#191970]",
          buttonText: "text-white",
          buttonBg: "bg-[#191970] hover:bg-[#0c0c47]",
          inputBg: "bg-white border-gray-300",
          navBg: "bg-white",
          footerBg: "bg-gray-200",
        }
      case "blue-dark":
        return {
          background: "bg-[#0c1e3e]",
          text: "text-gray-200",
          cardBg: "bg-[#162a4a]",
          cardBorder: "border-[#1e3a64]",
          heading: "text-white",
          subheading: "text-gray-300",
          accent: "text-[#4169E1]",
          accentBg: "bg-[#4169E1]",
          buttonText: "text-white",
          buttonBg: "bg-[#4169E1] hover:bg-[#3a5ecc]",
          inputBg: "bg-[#1e3a64] border-[#2a4a7a]",
          navBg: "bg-[#0c1e3e]/80 backdrop-blur-sm",
          footerBg: "bg-[#0a1835]",
        }
      case "black":
        return {
          background: "bg-black",
          text: "text-gray-300",
          cardBg: "bg-gray-900",
          cardBorder: "border-gray-800",
          heading: "text-white",
          subheading: "text-gray-400",
          accent: "text-[#2a4cad]",
          accentBg: "bg-[#2a4cad]",
          buttonText: "text-white",
          buttonBg: "bg-[#2a4cad] hover:bg-[#1e3a8a]",
          inputBg: "bg-gray-900 border-gray-800",
          navBg: "bg-black/80 backdrop-blur-sm",
          footerBg: "bg-black",
        }
    }
  }

  const styles = getThemeStyles()

  // Add a skills progress bar component
  const SkillBar = ({ skill, level }: { skill: string; level: string }) => {
    let percentage = 0

    switch (level) {
      case "Beginner":
        percentage = 30
        break
      case "Intermediate":
        percentage = 60
        break
      case "Experienced":
        percentage = 90
        break
      default:
        percentage = 75
    }

    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className={`font-medium ${styles.heading}`}>{skill}</span>
          <span className={styles.accent}>{level}</span>
        </div>
        <div className={`w-full h-2.5 bg-gray-700 rounded-full`}>
          <div className={`h-2.5 rounded-full ${styles.accentBg}`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    )
  }

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Add a testimonials section after the certificates section
  const testimonials = [
    {
      name: "John Smith",
      position: "CTO at TechCorp",
      text: "Bonny is an exceptional talent in network security. His work on our security assessment was thorough and insightful.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Sarah Johnson",
      position: "Project Manager",
      text: "Working with Bonny was a pleasure. His technical skills and communication abilities made our project a success.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Michael Chen",
      position: "Lead Developer",
      text: "Bonny's problem-solving skills are impressive. He quickly identified and resolved complex issues in our network infrastructure.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen ${styles.background} ${styles.text}`}>
        {/* Theme Switcher */}
        <div className="fixed top-6 right-6 z-50 flex gap-2">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-full ${theme === "light" ? styles.accentBg : "bg-gray-800"}`}
            aria-label="Light theme"
          >
            <Sun size={18} className={theme === "light" ? "text-white" : "text-gray-400"} />
          </button>
          <button
            onClick={() => setTheme("blue-dark")}
            className={`p-2 rounded-full ${theme === "blue-dark" ? styles.accentBg : "bg-gray-800"}`}
            aria-label="Blue dark theme"
          >
            <Monitor size={18} className={theme === "blue-dark" ? "text-white" : "text-gray-400"} />
          </button>
          <button
            onClick={() => setTheme("black")}
            className={`p-2 rounded-full ${theme === "black" ? styles.accentBg : "bg-gray-800"}`}
            aria-label="Black theme"
          >
            <Moon size={18} className={theme === "black" ? "text-white" : "text-gray-400"} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex justify-between items-center h-24 px-10 lg:px-20 ${styles.navBg}`}>
          <div className={`text-3xl font-bold ${styles.heading}`}>
            <span className={styles.accent}>Bonny</span> Modipa
          </div>
          <ul className="flex gap-8">
            {["about", "experience", "projects", "certificates", "testimonials", "contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={`text-lg capitalize hover:${styles.accent} transition-colors ${
                    activeSection === item ? styles.accent + " border-b-2 border-current" : ""
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <nav className={`md:hidden flex justify-between items-center h-20 px-6 ${styles.navBg}`}>
          <div className={`text-2xl font-bold ${styles.heading}`}>
            <span className={styles.accent}>Bonny</span> Modipa
          </div>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col justify-between w-8 h-6">
              <span
                className={`w-full h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
              ></span>
              <span className={`w-full h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}></span>
              <span
                className={`w-full h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              ></span>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`absolute right-0 mt-2 w-48 ${styles.cardBg} rounded-lg shadow-lg overflow-hidden z-50`}
                >
                  <ul className="py-2">
                    {["about", "experience", "projects", "certificates", "testimonials", "contact"].map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item}`}
                          className={`block px-4 py-2 ${styles.text} hover:${styles.accent}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="profile"
          className="min-h-[calc(100vh-6rem)] flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 ${styles.accent} shadow-lg shadow-blue-400/20`}
          >
            <img
              src="/placeholder.svg?height=320&width=320"
              alt="Bonny Modipa"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <p className={styles.accent + " mb-2"}>Hello, I'm</p>
            <h1 className={`text-4xl md:text-6xl font-bold mb-2 ${styles.heading}`}>Bonny Modipa</h1>
            <div className="h-8 mb-6">
              <p className="text-xl md:text-2xl">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href="/placeholder.svg" // Replace with actual CV file
                download="Bonny_Modipa_CV.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 bg-transparent border-2 border-current ${styles.accent} rounded-full hover:${styles.buttonBg} hover:${styles.buttonText} transition-colors flex items-center gap-2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download CV
              </motion.a>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${styles.buttonBg} ${styles.buttonText} rounded-full transition-colors`}
              >
                Contact Me
              </motion.button>
            </div>

            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <motion.a
                href="https://www.linkedin.com/in/kgothatso-modipa-45127324b"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className={`w-10 h-10 ${styles.cardBg} rounded-full flex items-center justify-center hover:${styles.accentBg} hover:${styles.buttonText} transition-colors`}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/bonnysi76"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className={`w-10 h-10 ${styles.cardBg} rounded-full flex items-center justify-center hover:${styles.accentBg} hover:${styles.buttonText} transition-colors`}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/bonny_ithole"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className={`w-10 h-10 ${styles.cardBg} rounded-full flex items-center justify-center hover:${styles.accentBg} hover:${styles.buttonText} transition-colors`}
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <a href="#about" className={`flex flex-col items-center ${styles.accent}`}>
              <span className="text-sm mb-2">Scroll Down</span>
              <ChevronDown className="animate-bounce" />
            </a>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={styles.accent + " mb-2"}>Get To Know More</p>
              <h2 className={`text-4xl font-bold ${styles.heading}`}>About Me</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Bonny Modipa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-5 -right-5 w-32 h-32 ${styles.accentBg} rounded-full flex items-center justify-center`}
                >
                  <span className={`${styles.buttonText} font-bold text-lg`}>
                    1+ Years
                    <br />
                    Experience
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className={`${styles.cardBg} p-6 rounded-xl`}>
                    <div
                      className={`w-12 h-12 ${theme === "light" ? "bg-gray-200" : "bg-gray-700"} rounded-full flex items-center justify-center mb-4`}
                    >
                      <Code className={styles.accent} />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${styles.heading}`}>Experience</h3>
                    <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      1 year IT Technical and Software Support Intern
                    </p>
                    <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      3+ years Sales and Marketing
                    </p>
                  </div>

                  <div className={`${styles.cardBg} p-6 rounded-xl`}>
                    <div
                      className={`w-12 h-12 ${theme === "light" ? "bg-gray-200" : "bg-gray-700"} rounded-full flex items-center justify-center mb-4`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${styles.accent}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${styles.heading}`}>Education</h3>
                    <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      BSc in Security and Network Engineering
                    </p>
                    <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      Diploma in Software Engineering
                    </p>
                  </div>
                </div>

                <p className={theme === "light" ? "text-gray-700" : "text-gray-300" + " leading-relaxed"}>
                  I offer a strong blend of expertise in Security and Network Engineering, Software Development and
                  Network Security, along with proven communication and strategic skills from my experience in sales and
                  marketing. Proficient in Microsoft Office, I am a versatile and results-driven professional ready to
                  add value to any IT organization.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className={`min-h-screen py-20 px-6 md:px-20 ${theme === "light" ? "bg-gray-50" : theme === "blue-dark" ? "bg-gray-900/50" : "bg-gray-950"}`}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={styles.accent + " mb-2"}>Explore My</p>
              <h2 className={`text-4xl font-bold ${styles.heading}`}>Experience</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${styles.cardBg} rounded-xl p-8`}
              >
                <h3 className={`text-2xl font-bold mb-6 text-center ${styles.heading}`}>IT Technical Support</h3>

                <div className="space-y-4">
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "100%" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <SkillBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={`${styles.cardBg} rounded-xl p-8`}
              >
                <h3 className={`text-2xl font-bold mb-6 text-center ${styles.heading}`}>IT Software Support</h3>

                <div className="space-y-4">
                  {softwareSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "100%" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <SkillBar skill={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={styles.accent + " mb-2"}>Browse My</p>
              <h2 className={`text-4xl font-bold ${styles.heading}`}>Projects</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className={`${styles.cardBg} rounded-xl overflow-hidden`}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 ${styles.heading}`}>{project.title}</h3>
                    <p className={theme === "light" ? "text-gray-700" : "text-gray-300" + " mb-4"}>
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold ${styles.accent} mb-1`}>Skills:</h4>
                      <p className={theme === "light" ? "text-sm text-gray-600" : "text-sm text-gray-400"}>
                        {project.skills}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button className={`flex items-center gap-1 ${styles.accent} hover:opacity-80`}>
                        <span>View Details</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          className={`min-h-screen py-20 px-6 md:px-20 ${theme === "light" ? "bg-gray-50" : theme === "blue-dark" ? "bg-gray-900/50" : "bg-gray-950"}`}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={styles.accent + " mb-2"}>View My</p>
              <h2 className={`text-4xl font-bold ${styles.heading}`}>Certificates</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${styles.cardBg} rounded-xl overflow-hidden relative group`}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={cert.preview || "/placeholder.svg"}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`font-medium ${styles.heading} truncate`}>{cert.name}</h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mt-1`}>
                      {cert.date}
                    </p>
                    <div className="flex justify-end mt-2">
                      <button className={`text-sm flex items-center gap-1 ${styles.accent}`}>
                        <span>View Certificate</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20 px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={styles.accent + " mb-2"}>Get In Touch</p>
              <h2 className={`text-4xl font-bold ${styles.heading}`}>Contact Me</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className={`text-2xl font-bold mb-6 ${styles.heading}`}>Let's Talk</h3>
                <p className={theme === "light" ? "text-gray-700" : "text-gray-300" + " mb-8"}>
                  I'm interested in freelance opportunities and full-time positions. If you have any questions or want
                  to discuss potential collaborations, feel free to reach out!
                </p>

                <div className="space-y-6">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${styles.cardBg} rounded-full flex items-center justify-center`}>
                      <Mail className={styles.accent} />
                    </div>
                    <div>
                      <h4 className={theme === "light" ? "text-sm text-gray-500" : "text-sm text-gray-400"}>Email</h4>
                      <a href="mailto:bonnysithole76@gmail.com" className={`${styles.heading} hover:${styles.accent}`}>
                        bonnysithole76@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${styles.cardBg} rounded-full flex items-center justify-center`}>
                      <Linkedin className={styles.accent} />
                    </div>
                    <div>
                      <h4 className={theme === "light" ? "text-sm text-gray-500" : "text-sm text-gray-400"}>
                        LinkedIn
                      </h4>
                      <a
                        href="https://www.linkedin.com/in/kgothatso-modipa-45127324b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.heading} hover:${styles.accent}`}
                      >
                        Kgothatso Modipa
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={`${styles.cardBg} rounded-xl p-8`}
              >
                <h3 className={`text-xl font-bold mb-6 ${styles.heading}`}>Send Me a Message</h3>

                <form className="space-y-4" action="mailto:bonnysithole76@gmail.com" method="post" encType="text/plain">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-1`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-4 py-3 ${styles.inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-current ${styles.accent} ${styles.text}`}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-1`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-3 ${styles.inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-current ${styles.accent} ${styles.text}`}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-1`}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`w-full px-4 py-3 ${styles.inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-current ${styles.accent} ${styles.text} resize-none`}
                      placeholder="Hello, I'd like to talk about..."
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 ${styles.buttonBg} ${styles.buttonText} font-medium rounded-lg transition-colors`}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-10 px-6 md:px-20 ${styles.footerBg}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className={`text-2xl font-bold ${styles.heading} mb-6 md:mb-0`}>
                <span className={styles.accent}>Bonny</span> Modipa
              </div>

              <ul className="flex gap-6 mb-6 md:mb-0">
                {["about", "experience", "projects", "certificates", "contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      className={`${theme === "light" ? "text-gray-600" : "text-gray-400"} hover:${styles.accent} transition-colors`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/kgothatso-modipa-45127324b"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className={`w-10 h-10 ${styles.cardBg} rounded-full flex items-center justify-center hover:${styles.accentBg} hover:${styles.buttonText} transition-colors`}
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="https://github.com/bonnysi76"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className={`w-10 h-10 ${styles.cardBg} rounded-full flex items-center justify-center hover:${styles.accentBg} hover:${styles.buttonText} transition-colors`}
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href="https://twitter.com/bonny_ithole"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className={`w-10 h-10 ${styles.cardBg} rounded-full flex items-center justify-center hover:${styles.accentBg} hover:${styles.buttonText} transition-colors`}
                >
                  <Twitter size={18} />
                </motion.a>
              </div>
            </div>

            <div
              className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-800"} mt-8 pt-8 text-center ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}
            >
              <p>Copyright © {new Date().getFullYear()} Bonny Modipa. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}
