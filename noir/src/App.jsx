import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Tilt } from 'react-tilt';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin, FiDribbble } from 'react-icons/fi';
import Typewriter from "react-typewriter-effect";


// Styled components
const NoirContainer = styled.div`
  background-color: #0a0a0a;
  color: #f5f5f5;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
`;

const GlassCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  overflow: hidden;
  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 80%);
    pointer-events: none;
  }
`;

const NoirHeading = styled.h2`
  font-weight: 800;
  letter-spacing: -0.05em;
  background: linear-gradient(90deg, #ffffff, #a0a0a0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
`;

const NoirButton = styled(motion.button)`
  background: linear-gradient(90deg, #333, #111);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.6s;
    z-index: -1;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ProgressBar = styled(motion.div)`
  height: 2px;
  background: linear-gradient(90deg, #333, #555);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  margin-bottom: 16px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, #999, #eee);
    transition: width 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  }
`;

const CustomCursor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    background: white;
    opacity: 0.8;
  }
`;

// Main component
function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const cursorRef = useRef(null);
  const parallaxRef = useRef(null);
  
  // Project data with noir theme
  const projects = [
    {
      title: "Midnight Commerce",
      category: "web",
      tech: "React, Node.js, MongoDB",
      description: "A sleek e-commerce platform with dark mode and minimalist UI",
      image: "/api/placeholder/500/300"
    },
    {
      title: "Noir Portfolio",
      category: "design",
      tech: "React, Styled Components",
      description: "A sophisticated portfolio with film noir aesthetics",
      image: "/api/placeholder/500/300"
    },
    {
      title: "Shadow Weather",
      category: "mobile",
      tech: "JavaScript, Weather API",
      description: "Weather app with elegant dark interface and smooth transitions",
      image: "/api/placeholder/500/300"
    },
    {
      title: "Monochrome Tasks",
      category: "web",
      tech: "React, Firebase",
      description: "Task management app with contrasting black and white design",
      image: "/api/placeholder/500/300"
    }
  ];
  
  // Skills data
  const skills = [
    { name: "React.js", level: 90, category: "frontend" },
    { name: "JavaScript", level: 85, category: "frontend" },
    { name: "Styled Components", level: 95, category: "frontend" },
    { name: "TypeScript", level: 80, category: "frontend" },
    { name: "Node.js", level: 75, category: "backend" },
    { name: "UI/UX Design", level: 85, category: "design" },
    { name: "Figma", level: 80, category: "design" },
    { name: "GraphQL", level: 70, category: "backend" }
  ];
  
  // Handle custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);
  
  // Filtered projects
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  // InView hook for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Education data
  const education = [
    {
      year: "2023 - 2027",
      title: "Bachelor's Degree",
      institution: "B.Tech, SRM University",
      description: "Computer Science and Engineering, specializing in AI & Machine Learning"
    },
    {
      year: "2021 - 2023",
      title: "Intermediate",
      institution: "Science, D.A.V Public School",
      description: "Specialized in Physics, Chemistry and Mathematics with high distinction"
    }
  ];

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor 
        ref={cursorRef} 
        style={{
          width: isHovering ? '80px' : '40px',
          height: isHovering ? '80px' : '40px',
        }}
      >
        {hoverItem && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '12px',
            mixBlendMode: 'difference',
            zIndex: 10,
          }}>
            {hoverItem}
          </div>
        )}
      </CustomCursor>
      
      <NoirContainer>
        {/* Noir background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          }} />
          
          {/* Gradient background */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gray-800 blur-3xl"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-gray-900 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-3/4 w-80 h-80 rounded-full bg-gray-700 blur-3xl"></div>
          </div>
          
          {/* Scanlines effect */}
          <div className="absolute inset-0 bg-repeat opacity-5" style={{
            backgroundImage: `linear-gradient(transparent 50%, rgba(255, 255, 255, 0.05) 50%)`,
            backgroundSize: '4px 4px',
          }}></div>
        </div>
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-black bg-opacity-30 border-b border-white border-opacity-5">
          
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <motion.a 
              href="#" 
              className="text-xl font-black tracking-tighter flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {setIsHovering(true); setHoverItem('Home')}}
              onMouseLeave={() => {setIsHovering(false); setHoverItem(null)}}
            >
              <Typewriter
                textStyle={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}
                startDelay={500}
                cursorColor="gray"
                multiText={["Arhaan", "Arhaan.Dev"]}
                multiTextDelay={1500}
                typeSpeed={100}
                deleteSpeed={50}
              />

            </motion.a>
            
            <nav className="hidden md:flex space-x-8">
              {['About', 'Projects', 'Skills', 'Contact'].map((item, idx) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm font-medium text-white text-opacity-60 hover:text-opacity-100 transition-colors relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => {setIsHovering(true); setHoverItem(item)}}
                  onMouseLeave={() => {setIsHovering(false); setHoverItem(null)}}
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>
            
            <motion.button 
              className="px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-opacity-90 transition-all relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {setIsHovering(true); setHoverItem('Resume')}}
              onMouseLeave={() => {setIsHovering(false); setHoverItem(null)}}
            >
              Resume
              <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 transform -translate-x-full hover:translate-x-0 transition-transform duration-300"></span>
            </motion.button>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto pt-32 px-6">
          
          {/* Hero Section */}
          <motion.section 
            ref={heroRef}
            className="min-h-screen mt-4 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <GlassCard 
              variants={itemVariants}
              className="md:p-12 p-8"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <motion.div 
                  className="relative w-24 h-24 md:w-32 md:h-32"
                  variants={itemVariants}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl blur opacity-30"></div>
                  <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-gray-800">
                    <img src="/api/placeholder/200/200" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <motion.div 
                    className="flex items-center mb-2" 
                    variants={itemVariants}
                  >
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    <span className="text-sm text-white font-medium tracking-wide">AVAILABLE FOR HIRE</span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none"
                    variants={itemVariants}
                  >
                    <Typewriter
                      textStyle={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}
                      startDelay={500}
                      cursorColor="cyan"
                      text="ARHAAN SIDDIQUEE"
                      typeSpeed={100}
                      deleteSpeed={50}
                    />
                  </motion.h1>
                  
                  <motion.div 
                    className="text-xl md:text-2xl text-gray-400 mb-8 h-16"
                    variants={itemVariants}
                  >
                    <Typewriter
                      options={{
                        strings: ['Designer.', 'Developer.', 'Debugger.'],
                        autoStart: true,
                        loop: true,
                        wrapperClassName: 'text-xl md:text-2xl text-gray-300 font-medium',
                        cursorClassName: 'text-white',
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2"
                    variants={containerVariants}
                  >
                    {[
                      { icon: "🌏", text: "India" },
                      { icon: "🗣️", text: "English & Hindi" },
                      { icon: "💻", text: "Software Engineer" },
                      { icon: "🚀", text: "Intern" },
                      { icon: "🎓", text: "SRM University" },
                      { icon: "✨", text: "Good Boy" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center space-x-3 group"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-black bg-opacity-50 backdrop-blur group-hover:bg-white group-hover:text-black transition-colors duration-300">
                          {item.icon}
                        </span>
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <NoirHeading>ABOUT ME</NoirHeading>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    I'm a passionate designer and developer with 6+ years of experience creating beautiful, functional interfaces. I specialize in React.js, Tailwind CSS, and responsive design principles that deliver exceptional user experiences.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    When I'm not coding, I enjoy exploring new technologies, watching anime, and experimenting with creative side projects. I believe in continuous learning and staying ahead of design trends to deliver innovative solutions to my clients.
                  </p>
                </motion.div>
          
                <motion.div variants={itemVariants}>
                  <NoirHeading>CONNECT</NoirHeading>
                  <div className="space-y-4">
                    {[
                      { platform: "Twitter", username: "@ArhaanSiddique0", icon: <FiTwitter />, link: "https://twitter.com/ArhaanSiddique0" },
                      { platform: "LinkedIn", username: "@arhaansiddiquee", icon: <FiLinkedin />, link: "https://linkedin.com/in/arhaansiddiquee" },
                      { platform: "Github", username: "@Arhaan-Siddiquee", icon: <FiGithub />, link: "https://github.com/arhaan-siddiquee" }
                    ].map((social, index) => (
                      <motion.a 
                        key={index}
                        href={social.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center bg-black bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition-all duration-300 border border-white border-opacity-0 hover:border-opacity-5"
                        whileHover={{ x: 5 }}
                        onMouseEnter={() => { setIsHovering(true); setHoverItem(social.platform) }}
                        onMouseLeave={() => { setIsHovering(false); setHoverItem(null) }}
                      >
                        <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          {social.icon}
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">{social.platform}</div>
                          <div className="font-semibold">{social.username}</div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </GlassCard>
          </motion.section>
          
          {/* Education Journey */}
          <motion.section 
            className="my-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="flex items-center mb-12">
              <div className="w-12 h-1 bg-white mr-4"></div>
              <NoirHeading className="text-3xl md:text-4xl">EDUCATION JOURNEY</NoirHeading>
            </motion.div>
            
            <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white before:to-transparent">
              {education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-16"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-black text-white shadow-lg shadow-black/20 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.span>
                  </div>
                  
                  <motion.div 
                    className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Tilt options={{ max: 8, scale: 1.02, speed: 300 }}>
                      <GlassCard 
                        className="overflow-hidden"
                        whileHover={{ 
                          scale: 1.03, 
                          boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                          transition: { duration: 0.3 }  
                        }}
                      >
                        <motion.div
                          initial="collapsed"
                          whileHover="expanded"
                          animate="collapsed"
                          variants={{
                            collapsed: { height: "auto" },
                            expanded: { height: "auto" }
                          }}
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <motion.div 
                                  className="font-bold text-white text-xl mb-1"
                                  whileHover={{ scale: 1.01 }}
                                >
                                  {edu.title}
                                </motion.div>
                                <div className="text-gray-400 mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  {edu.institution}
                                </div>
                              </div>
                              <div className="text-sm text-white font-mono px-3 py-1 rounded-full bg-white/10">
                                {edu.year}
                              </div>
                            </div>
                            
                            <p className="text-gray-300 mb-4">{edu.description}</p>
                            
                            {/* Expanded Content - Skills & Achievements */}
                            <motion.div
                              variants={{
                                collapsed: { opacity: 0.8, height: 0, marginTop: 0, display: "none" },
                                expanded: { opacity: 1, height: "auto", marginTop: "1rem", display: "block" }
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-white/10 pt-4 mt-2">
                                <div className="mb-3">
                                  <div className="text-white/70 text-sm mb-2 font-semibold">Key Subjects:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {edu.subjects?.map((subject, idx) => (
                                      <span key={idx} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/80">
                                        {subject}
                                      </span>
                                    )) || (
                                      <>
                                        <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/80">
                                          Computer Science
                                        </span>
                                        <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/80">
                                          Data Structures
                                        </span>
                                        <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/80">
                                          Algorithms
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="mb-2">
                                  <div className="text-white/70 text-sm mb-2 font-semibold">Achievements:</div>
                                  <ul className="list-disc list-inside text-sm text-white/80 space-y-1 pl-1">
                                    {edu.achievements?.map((achievement, idx) => (
                                      <li key={idx}>{achievement}</li>
                                    )) || (
                                      <>
                                        <li>Graduated with honors (top 10% of class)</li>
                                        <li>Research assistant for AI lab projects</li>
                                      </>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                            
                            {/* Hover Instructions */}
                            <div className="flex items-center justify-center mt-2">
                              <motion.div 
                                className="text-xs text-white/40 flex items-center"
                                variants={{
                                  collapsed: { opacity: 1 },
                                  expanded: { opacity: 0 }
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Hover for details
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </GlassCard>
                    </Tilt>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-8 p-6 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl border border-white border-opacity-5 transform transition-all duration-500 hover:scale-102 hover:border-opacity-10"
              whileHover={{
                boxShadow: "0 0 25px rgba(255,255,255,0.1)",
                y: -5
              }}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-white/70 text-black mr-5 shadow-lg shadow-white/10 mb-4 md:mb-0">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-7 w-7" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 15, 0, -15, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </div>
                <div className="flex-1">
                  <div className="text-gray-400 mb-2 font-medium">Currently expanding my knowledge in</div>
                  <div className="font-medium text-xl text-white mb-3">Advanced Machine Learning, Cloud Architecture & Web3</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/90 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      TensorFlow
                    </span>
                    <span className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/90 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      AWS Solutions
                    </span>
                    <span className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/90 flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      Smart Contracts
                    </span>
                    <span className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/90 flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Blockchain
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
          
          {/* Projects Section */}
          <motion.section 
            id="projects"
            ref={projectsRef}
            className="my-24"
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div className="flex items-center">
                <motion.div 
                  className="w-12 h-1 bg-white mr-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8 }}
                ></motion.div>
                <NoirHeading className="text-3xl md:text-4xl">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    FEATURED PROJECTS
                  </motion.span>
                </NoirHeading>
              </div>
              
              <div className="flex space-x-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 mt-4 md:mt-0">
                {['all', 'web', 'design', 'mobile', 'ai'].map((tab, index) => (
                  <motion.button
                    key={tab}
                    className={`px-4 py-2 text-xs rounded-lg transition-colors ${activeTab === tab ? 'bg-white text-black' : 'bg-black text-gray-400 hover:bg-gray-900'}`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <Tilt key={project.title} options={{ max: 15, scale: 1.05, speed: 400 }}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="group h-full"
                      onMouseEnter={() => {setIsHovering(true); setHoverItem(`View ${project.title}`)}}
                      onMouseLeave={() => {setIsHovering(false); setHoverItem(null)}}
                    >
                      <GlassCard className="h-full overflow-hidden relative">
                        {/* Project Image Container */}
                        <div className="aspect-video rounded-lg overflow-hidden mb-5 relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0 opacity-60"></div>
                          <div className="absolute inset-0 bg-black bg-opacity-40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div 
                              className="flex flex-col items-center gap-3"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <motion.a 
                                href={project.demoUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 bg-white text-black rounded-lg font-medium flex items-center space-x-2 transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                                whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>Live Demo</span>
                              </motion.a>
                              
                              <motion.a 
                                href={project.githubUrl || "https://github.com/Arhaan-Siddiquee"}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="px-5 py-2 bg-black bg-opacity-80 border border-white border-opacity-20 text-white rounded-lg font-medium flex items-center space-x-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                                whileHover={{ scale: 1.05, borderOpacity: 0.4 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                <span>View Code</span>
                              </motion.a>
                            </motion.div>
                          </div>
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                          />
                          
                          {/* Project Status Badge */}
                          {project.status && (
                            <div className="absolute top-3 right-3 z-20">
                              <span className={`text-xs px-3 py-1 rounded-full ${
                                project.status === 'completed' ? 'bg-green-500 bg-opacity-90' : 
                                project.status === 'in-progress' ? 'bg-yellow-500 bg-opacity-90' : 
                                'bg-blue-500 bg-opacity-90'
                              } text-white flex items-center space-x-1`}>
                                <span className={`w-2 h-2 rounded-full ${
                                  project.status === 'completed' ? 'bg-green-200' : 
                                  project.status === 'in-progress' ? 'bg-yellow-200' : 
                                  'bg-blue-200'
                                } mr-1`}></span>
                                <span>{project.status === 'completed' ? 'Completed' : 
                                      project.status === 'in-progress' ? 'In Progress' : 
                                      'Planned'}</span>
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Project Content */}
                        <div className="px-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs px-3 py-1 rounded-full bg-white bg-opacity-10 text-white inline-block">
                              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                            </span>
                            
                            {project.tags && project.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs px-3 py-1 rounded-full bg-black bg-opacity-40 border border-white border-opacity-10 text-gray-300 inline-block">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">{project.title}</h3>
                          <p className="text-gray-400 mb-4">{project.description}</p>
                          
                          {/* Tech Stack with Icons */}
                          <div className="mb-4">
                            <div className="text-xs text-gray-500 uppercase mb-2 font-medium">Tech Stack</div>
                            <div className="flex flex-wrap gap-2">
                              {project.techArray ? project.techArray.map((tech, idx) => (
                                <span key={idx} className="text-xs bg-black bg-opacity-50 text-gray-300 px-2 py-1 rounded flex items-center">
                                  {tech}
                                </span>
                              )) : project.tech?.split(',').map((tech, idx) => (
                                <span key={idx} className="text-xs bg-black bg-opacity-50 text-gray-300 px-2 py-1 rounded flex items-center">
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Expandable Features Section */}
                          <motion.div
                            initial="collapsed"
                            whileHover="expanded"
                            animate="collapsed"
                            variants={{
                              collapsed: { height: 0, opacity: 0, marginTop: 0 },
                              expanded: { height: "auto", opacity: 1, marginTop: "0.5rem" }
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-white border-opacity-10 pt-3"
                          >
                            <div className="text-xs text-gray-500 uppercase mb-2 font-medium">Key Features</div>
                            <ul className="text-sm text-gray-300 space-y-1 pl-4 list-disc">
                              {project.features ? project.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                              )) : (
                                <>
                                  <li>Responsive design with modern UI/UX principles</li>
                                  <li>Optimized performance and accessibility</li>
                                  <li>Integration with third-party APIs</li>
                                </>
                              )}
                            </ul>
                            
                            {project.contribution && (
                              <div className="mt-3">
                                <div className="text-xs text-gray-500 uppercase mb-2 font-medium">My Contribution</div>
                                <p className="text-sm text-gray-300">{project.contribution}</p>
                              </div>
                            )}
                          </motion.div>
                          
                          {/* Hover Instructions */}
                          <div className="absolute bottom-3 right-3">
                            <motion.div
                              className="text-xs text-white/40 flex items-center"
                              variants={{
                                collapsed: { opacity: 1 },
                                expanded: { opacity: 0 }
                              }}
                              initial="collapsed"
                              whileHover="expanded"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Hover for details
                            </motion.div>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  </Tilt>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div 
                className="flex flex-col items-center justify-center p-12 border border-white border-opacity-10 rounded-xl bg-black bg-opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="text-gray-400 text-center max-w-md">I don't have any {activeTab !== 'all' ? activeTab : ''} projects to show at the moment. Check back later or explore other categories.</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-medium"
                  onClick={() => setActiveTab('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Projects
                </motion.button>
              </motion.div>
            )}
            
            {/* View All Projects Button */}
            <motion.div 
              className="flex justify-center mt-16" 
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/Arhaan-Siddiquee"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => {setIsHovering(true); setHoverItem('All Projects')}}
                onMouseLeave={() => {setIsHovering(false); setHoverItem(null)}}
                className="group"
              >
                <NoirButton className="flex items-center space-x-3 pr-4 relative overflow-hidden">
                  <span className="z-10">VIEW ALL PROJECTS</span>
                  <div className="flex items-center space-x-2 z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-github opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-2 group-hover:ml-0" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </NoirButton>
              </motion.a>
            </motion.div>
            
            {/* Project Count */}
            <motion.div
              className="flex justify-center mt-6 text-sm text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Showing {filteredProjects.length} of {projects.length} projects
            </motion.div>
          </motion.section>
          {/* Skills Section */}
          <motion.section 
            id="skills"
            ref={skillsRef}
            className="my-24"
            variants={containerVariants}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={itemVariants} 
              className="flex items-center mb-12"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="w-12 h-1 bg-white mr-4"
                whileHover={{ width: 60, backgroundColor: "#f0f0f0" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <NoirHeading className="text-3xl md:text-4xl">SKILLS & EXPERTISE</NoirHeading>
            </motion.div>
            
            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <motion.span 
                      className="inline-block w-2 h-6 bg-white mr-3"
                      animate={{ height: [20, 24, 20] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.span>
                    Technical Proficiency
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    Years of dedicated practice and real-world projects have sharpened my technical skills. 
                    Each percentage represents my confidence and experience level with these technologies.
                  </p>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">{skill.name}</div>
                          <motion.div 
                            className="text-sm text-gray-400"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                          >{skill.level}%</motion.div>
                        </div>
                        <ProgressBar
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-1 bg-gray-800 rounded-full overflow-hidden"
                          style={{ width: `${skill.level}%` }}
                        >
                          <motion.div 
                            className="h-full bg-gradient-to-r from-gray-500 to-white rounded-full"
                            animate={{ 
                              backgroundPosition: ["0% 0%", "100% 100%"] 
                            }}
                            transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                          ></motion.div>
                        </ProgressBar>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <motion.span 
                      className="inline-block w-2 h-6 bg-white mr-3"
                      animate={{ height: [20, 24, 20] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    ></motion.span>
                    Tools & Technologies
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    My toolkit is constantly expanding as I explore new technologies that enhance user experiences
                    and streamline development workflows. These are my daily companions in crafting digital solutions.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "React", "TypeScript", "Node.js", "MongoDB", 
                      "Express", "Styled Components", "Git", "Figma",
                      "Firebase", "GraphQL", "WebGL", "Framer Motion"
                    ].map((tool, index) => (
                      <motion.div 
                        key={tool}
                        className="flex items-center p-3 bg-black bg-opacity-60 rounded-lg border border-white border-opacity-5 hover:border-opacity-10 hover:bg-opacity-70 transition-all duration-300"
                        whileHover={{ x: 5, backgroundColor: "rgba(30, 30, 30, 0.8)" }}
                        custom={index}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              delay: index * 0.05,
                              duration: 0.5
                            }
                          }
                        }}
                      >
                        <motion.div 
                          className="w-8 h-8 bg-white bg-opacity-10 rounded-md flex items-center justify-center mr-3"
                          whileHover={{ 
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            rotate: 5
                          }}
                        >
                          <span className="text-lg font-bold">{tool.charAt(0)}</span>
                        </motion.div>
                        <span className="text-sm">{tool}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-10 p-6 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-5" 
                variants={itemVariants}
                whileHover={{ 
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <motion.span 
                    className="inline-block w-2 h-6 bg-white mr-3"
                    animate={{ height: [20, 24, 20] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  ></motion.span>
                  Methodologies & Approaches
                </h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Beyond code, my work is guided by proven methodologies and best practices that ensure 
                  scalable, maintainable, and user-centered solutions. These approaches form the foundation 
                  of every project I undertake.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Responsive Design", "Mobile-First Approach", "Component-Based Architecture",
                    "RESTful APIs", "CI/CD", "TDD", "Agile", "UX Research", "Performance Optimization"
                  ].map((method, index) => (
                    <motion.span 
                      key={method} 
                      className="px-3 py-1 text-xs bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors duration-300"
                      whileHover={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.25)", 
                        y: -2,
                        scale: 1.05
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: 0.5 + (index * 0.05) }
                      }}
                    >
                      {method}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* New Project Management Skills Section */}
              <motion.div 
                className="mt-10 p-6 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-5" 
                variants={itemVariants}
                whileHover={{ 
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.8 }
                }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <motion.span 
                    className="inline-block w-2 h-6 bg-white mr-3"
                    animate={{ height: [20, 24, 20] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
                  ></motion.span>
                  Project Management
                </h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Leading projects from conception to completion requires more than technical knowledge—it demands 
                  organization, communication, and strategic thinking. Here's how I manage the complexity of 
                  development projects.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    className="p-4 bg-black bg-opacity-60 rounded-lg border border-white border-opacity-5"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(30, 30, 30, 0.8)" }}
                  >
                    <h4 className="text-lg font-semibold mb-2">Planning</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        ></motion.div>
                        Requirements gathering
                      </li>
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                        ></motion.div>
                        Timeline estimation
                      </li>
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                        ></motion.div>
                        Resource allocation
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 bg-black bg-opacity-60 rounded-lg border border-white border-opacity-5"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(30, 30, 30, 0.8)" }}
                  >
                    <h4 className="text-lg font-semibold mb-2">Execution</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                        ></motion.div>
                        Sprint planning
                      </li>
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                        ></motion.div>
                        Code reviews
                      </li>
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
                        ></motion.div>
                        Continuous integration
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 bg-black bg-opacity-60 rounded-lg border border-white border-opacity-5"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(30, 30, 30, 0.8)" }}
                  >
                    <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
                        ></motion.div>
                        Deployment automation
                      </li>
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
                        ></motion.div>
                        Performance monitoring
                      </li>
                      <li className="flex items-center">
                        <motion.div 
                          className="w-1 h-1 bg-white rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
                        ></motion.div>
                        User feedback cycles
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>

              {/* New Creative Skills Section */}
              <motion.div 
                className="mt-10 p-6 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-5" 
                variants={itemVariants}
                whileHover={{ 
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 1 }
                }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <motion.span 
                    className="inline-block w-2 h-6 bg-white mr-3"
                    animate={{ height: [20, 24, 20] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 2 }}
                  ></motion.span>
                  Creative & Design Skills
                </h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Technical excellence meets artistic vision. My background in design complements my development skills,
                  allowing me to bridge the gap between aesthetics and functionality.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {[
                      { skill: "UI/UX Design", level: 85 },
                      { skill: "Animation & Motion", level: 78 },
                      { skill: "Design Systems", level: 90 },
                      { skill: "Typography", level: 82 }
                    ].map((item, index) => (
                      <div key={item.skill} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.skill}</span>
                          <span className="text-xs text-gray-400">{item.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-black bg-opacity-40 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-gray-400 to-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: 1.2 + (index * 0.1),
                              ease: "easeOut"
                            }}
                            whileHover={{
                              backgroundImage: "linear-gradient(to right, #a8a8a8, #ffffff)"
                            }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    {[
                      "Figma", "Adobe XD", "Photoshop", "Illustrator", 
                      "After Effects", "Blender", "Cinema 4D", "Sketch"
                    ].map((tool, index) => (
                      <motion.div
                        key={tool} 
                        className="flex items-center p-3 bg-white bg-opacity-5 rounded-lg" 
                        whileHover={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          x: 3,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 1.4 + (index * 0.05) }
                        }}
                      >
                        <motion.div 
                          className="w-6 h-6 rounded-full bg-white bg-opacity-10 mr-2 flex items-center justify-center"
                          whileHover={{ rotate: 15 }}
                        >
                          <span className="text-xs font-bold">{tool.charAt(0)}</span>
                        </motion.div>
                        <span className="text-xs">{tool}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </GlassCard>
            
            {/* Skills Testimonial */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 1.5 }
              }}
            >
              <motion.div 
                className="inline-block mb-6"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ repeat: Infinity, duration: 10, repeatType: "mirror" }}
              >
                <svg className="w-10 h-10 text-white opacity-30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
              </motion.div>
              <motion.p 
                className="text-xl md:text-2xl font-light italic max-w-3xl mx-auto"
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                "Don’t count the bugs, make the code count., 
                Develop like a champion, code like a legend."
              </motion.p>
              <motion.p 
                className="mt-4 text-gray-400"
                whileHover={{ color: "#ffffff" }}
              >
                — Steve Jobs
              </motion.p>
            </motion.div>
          </motion.section>
          {/* Testimonials Section */}
          <motion.section 
            className="my-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="flex items-center mb-12">
              <div className="w-12 h-1 bg-white mr-4"></div>
              <NoirHeading className="text-3xl md:text-4xl">TESTIMONIALS</NoirHeading>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {[
                {
                  text: "Arhaan delivered an exceptional website that perfectly captured our brand essence. His attention to detail and creative approach exceeded our expectations.",
                  author: "Samantha K.",
                  role: "Creative Director, DesignLabs",
                  image: "/api/placeholder/100/100"
                },
                {
                  text: "Working with Arhaan was a game-changer for our startup. His technical expertise combined with his eye for design resulted in a platform that our users love.",
                  author: "Michael Chen",
                  role: "Founder, TechNova",
                  image: "/api/placeholder/100/100"
                }
              ].map((testimonial, index) => (
                <Tilt key={index} options={{ max: 10, scale: 1.02, speed: 300 }}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <GlassCard className="relative">
                      <div className="absolute top-6 left-6 text-6xl text-white text-opacity-10 font-serif">"</div>
                      <div className="relative z-10">
                        <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                        
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-white ring-opacity-10">
                            <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover grayscale" />
                          </div>
                          <div>
                            <div className="font-medium">{testimonial.author}</div>
                            <div className="text-sm text-gray-400">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </Tilt>
              ))}
            </motion.div>
          </motion.section>
          
          {/* Contact Section */}
          <motion.section 
            id="contact"
            className="my-24 pb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="flex items-center mb-12">
              <div className="w-12 h-1 bg-white mr-4"></div>
              <NoirHeading className="text-3xl md:text-4xl">GET IN TOUCH</NoirHeading>
            </motion.div>
            
            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {[
                      { icon: <FiMail className="w-5 h-5" />, title: "Email", value: "hello@arhaan.dev" },
                      { icon: <FiPhone className="w-5 h-5" />, title: "Phone", value: "+91 9876543210" },
                      { icon: <FiMapPin className="w-5 h-5" />, title: "Location", value: "Chennai, India" }
                    ].map((contact, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-white bg-opacity-10 flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                          {contact.icon}
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">{contact.title}</div>
                          <div className="font-medium">{contact.value}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4">FOLLOW ME</h4>
                    <div className="flex space-x-4">
                      {[<FiTwitter />, <FiGithub />, <FiLinkedin />, <FiDribbble />].map((icon, index) => (
                        <motion.a 
                          key={index}
                          href="#" 
                          className="w-10 h-10 rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                          whileHover={{ y: -5 }}
                          whileTap={{ y: 0 }}
                        >
                          {icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
                  
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-10 focus:outline-none focus:border-opacity-30 transition-colors duration-300"
                        placeholder="What's your name?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Your Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-10 focus:outline-none focus:border-opacity-30 transition-colors duration-300"
                        placeholder="What's your email?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Your Message</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-10 focus:outline-none focus:border-opacity-30 transition-colors duration-300 min-h-[120px]"
                        placeholder="What would you like to say?"
                      ></textarea>
                    </div>
                    
                    <motion.button 
                      className="w-full py-3 bg-white text-black font-medium rounded-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">SEND MESSAGE</span>
                      <span className="absolute inset-0 bg-black bg-opacity-10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </GlassCard>
          </motion.section>
        </main>
        
        {/* Footer */}
        <footer className="bg-black bg-opacity-40 border-t border-white border-opacity-5 py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div 
                className="text-2xl font-black tracking-tighter flex items-center mb-6 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white">ARHAAN</span>
                <span className="text-gray-400">.DEV</span>
              </motion.div>
              
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm mb-2">
                  &copy; {new Date().getFullYear()} Arhaan Siddiquee. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs">
                  Crafted with passion and precision
                </p>
              </div>
            </div>
          </div>
        </footer>
      </NoirContainer>
    </>
  );
}

export default App;