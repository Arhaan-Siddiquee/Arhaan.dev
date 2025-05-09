import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Tilt } from 'react-tilt';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin, FiDribbble } from 'react-icons/fi';
import Typewriter from "react-typewriter-effect";
import resumePDF from "./assets/arhaan-resume.pdf";
import LOR from "./assets/LOR.pdf";
import NiramayaCC from "./assets/NiramayaCC.pdf";
import NiramayaLg from "./assets/NiramayaLg.jpeg";
import Codenexlg from "./assets/codenexlg.png";
import Founderslg from "./assets/Founderslg.jpeg";
import SSA from "./assets/SSA.gif";
import xenigma from "./assets/xenigma.gif";
import xcode from "./assets/xcode.gif";
import fitflow from "./assets/fitflow.png";
import ME from "./assets/me.png";
import resume from "./assets/resume.png";
import kanban from "./assets/kanban.gif";
import gdsc from "./assets/gdsc.png";
import codenex from "./assets/codenex.png";

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
// Add these arrays before your motion.section component
const workExperience = [
  {
    company: "Niramaya",
    position: "Frontend Web Developer Intern",
    type: "On-Site",
    period: "Sep 2024 - Mar 2025",
    description: "Contributed to developing responsive healthcare web interfaces using React.js and TailwindCSS, integrated RESTful APIs, and collaborated with the tech team to enhance UI/UX and backend efficiency.",
    recommendationLetter: LOR,
    certificate: NiramayaCC,
    logo: NiramayaLg
  }
];

const collegeClubs = [
  {
    club: "CodeNex Club SRM",
    role: "Technical Team Member",
    period: "Sep 2024 - Present",
    description: "Contributed to multiple club projects as a Web Developer and UI/UX designer by building responsive frontends and crafting clean, user-friendly interfaces that aligned with the team’s tech goals.",
    logo: Codenexlg
  },
  {
    club: "Founders Club",
    role: "Creative Associate Lead",
    period: "Oct 2023 - Present",
    description: "Led the creative direction for various startup ideas by designing brand identities, product UI mockups, and impactful visuals that elevated the club’s presence and storytelling.",
    logo: Founderslg
  },
];

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
      title: "ShikshaSoladu.AI",
      category: "web",
      tech: "ReactJs, Tf.js, Mediapipe, Peerjs",
      description: "A personalized education technology designed for Deaf and Blind learners, making education available to all.",
      features: [
        "Inclusive Learning for Disabled Students – Tailored education tools for blind, deaf, and physically challenged students.",
        "Multi-Mode Interaction – Features like text-to-speech, sign language videos, and voice recognition for accessibility.",
        "Color & UI Adaptability – Dyslexia-friendly fonts, color blindness modes, and simple UI design.",
        "Course Content Customization – Adaptive learning paths with quizzes and assignments based on user needs."
      ],
      status: "completed",
      demoUrl: "https://sikhshasoladuai.vercel.app/",
      githubUrl: "https://github.com/Arhaan-Siddiquee/ShikshaSoladuAI",
      image: SSA
    },
    {
      title: "Enigma",
      category: "web",
      tech: "Nextjs, Tf.js, TypeScript, CodeBlocks",
      description: "A real-time collaborative design platform built for modern teams, with powerful tools and open-source flexibility.",
      features: [
        "Real-Time Collaborative Design – Enables seamless teamwork on UI/UX designs with live multi-user editing and instant updates.",
        "Intuitive Interface & Powerful Tools – Comes with a clean workspace, vector editing, component system, and design libraries for professional-level design.",
        "Cross-Platform Access – Accessible from anywhere via browser, ensuring smooth workflows across devices and teams.",
        "Open Source & Developer-Friendly – Built with transparency and extendability in mind, allowing the community to contribute and customize features."
      ],
      status: "completed",
      demoUrl: "https://test-enigma-nine.vercel.app/",
      githubUrl: "https://github.com/Arhaan-Siddiquee/Enigma",
      image: xenigma
    },
    {
      title: "10xCoders",
      category: "ai",
      tech: "ReactJs, GeminiAPI, PeerJs",
      status: "completed",
      description: "An all-in-one tech learning hub offering curated roadmaps, projects, and an AI assistant to supercharge your coding journey.",
      features: [
        "Tech Learning Hub – One-stop platform offering resources, curated roadmaps, and project ideas for multiple tech domains.",
        "AI-Powered Chatbot – Built-in assistant to answer coding doubts and guide users through learning paths.",
        "Community Integration – Access to community channels, coding groups, and events to network and learn together.",
        "Gamified Experience – Progress levels, streaks, and rewards to keep users engaged and motivated."
      ],
      demoUrl: "https://10x-coders.vercel.app/",
      githubUrl: "https://github.com/Arhaan-Siddiquee/10xCoders",
      image: xcode
    },
    {
      title: "FitFlow",
      category: "web",
      tech: "ReactJs, Tenserflow, Mediapipe, Trigonometry-3",
      description: "An AI-driven fitness app with video posture guidance, smart rep counting, and personalized workout plans.",
      image: fitflow,
      status: "completed",
      features: [
        "AI-Powered Fitness Planner – Customizes workout routines based on your fitness goals (fat loss, strength, etc.) using intelligent algorithms.",
        "Video AI Exercise Assistant – Offers real-time posture guidance and form correction using your device’s camera.",
        "Diet & Wellness Tips – Includes basic nutrition guidelines and mindfulness suggestions to complement workouts.",
        "Progress & Wellness Dashboard – Tracks workouts, provides nutrition tips, and visualizes progress through interactive charts and streaks."
      ],
      demoUrl: "https://fitflow-excercise.vercel.app/",
      githubUrl: "https://github.com/Arhaan-Siddiquee/fitflow-excercise"
    },
    {
      title: "KanBanLite",
      category: "web",
      tech: "NextJs, Flask",
      description: "KanBanLite is a lightweight, drag-and-drop Kanban board designed to simplify task management and boost productivity.",
      image: kanban,
      status: "completed",
      features: [
        "Features an intuitive UI for creating, editing, and organizing tasks across customizable columns.",
        "Supports drag-and-drop functionality for smooth task movement between stages (e.g., To Do, In Progress, Done).",
        "Offers local storage integration to persist tasks without the need for a backend.",
      ],
      demoUrl: "https://kanban-lite.vercel.app/",
      githubUrl: "https://github.com/Arhaan-Siddiquee/KanbanLite"
    },
    {
      title: "Resume.io",
      category: "ai",
      tech: "ReactJs, TailwindCSS, KaTeX, pdfjs",
      description: "Resume.io is a LaTeX-based resume editor with ATS-friendly resume checking and enhancement features.",
      image: resume,
      status: "completed",
      features: [
        "Allows users to create and edit professional resumes using LaTeX templates for precision formatting.",
        "Integrates an ATS (Applicant Tracking System) checker to ensure resumes pass automated recruitment filters.",
        "Offers real-time suggestions to enhance resume content, structure, and keyword optimization.",
        "User-friendly interface with download options in PDF and LaTeX formats for both technical and non-technical users."
      ],
      demoUrl: "https://resume-io-one.vercel.app/",
      githubUrl: "https://github.com/Arhaan-Siddiquee/Resume.io"
    },
    {
      title: "GDSC WireFrame",
      category: "design",
      tech: "Figma, WireFrame, Animated, Prototype",
      description: "GDSC Website Wireframe is a clean, user-focused design blueprint for a community-driven website, crafted to reflect the mission and values of Google Developer Student Clubs.",
      image: gdsc,
      status: "completed",
      features: [
        "Designed in Figma with a focus on intuitive navigation, modern layout, and responsive structure.",
        "Includes dedicated sections for events, projects, team, and community engagement.",
        "Emphasizes visual hierarchy and accessibility to enhance user interaction and clarity.",
        "Serves as a foundational guide for frontend development, aligning with GDSC branding and goals.",
      ],
      demoUrl: "https://www.figma.com/proto/i3iPqLXCxYtIPxac4q2t82/GDSCtaskedWebsite?node-id=46-15&starting-point-node-id=1%3A2",
      figmaUrl : "https://www.figma.com/design/i3iPqLXCxYtIPxac4q2t82/GDSCtaskedWebsite?node-id=0-1&p=f&t=XXHE3hGRgjFlzLlH-0"
    },
    {
    title: "CodeNex Website Design",
    category: "design",
    tech: "Figma, Animated, Prototype",
    description: "CodeNex Website Design is a modern, developer-centric UI/UX concept tailored for a coding club.",
    image: codenex,
    status: "completed",
    features: [
      "Crafted in Figma with a clean, dark-themed aesthetic and intuitive navigation for a smooth user experience.",
      "Includes sections for events, projects, and community engagement, emphasizing the club's mission.",
    ],
    demoUrl: "https://www.figma.com/proto/lQ0UfUMdJTbkcGrC1eZ3t6/Codenex-Task?node-id=1-74&p=f&t=YA8kGpATMyq0jb79-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    figmaUrl : "https://www.figma.com/design/lQ0UfUMdJTbkcGrC1eZ3t6/Codenex-Task?node-id=0-1&p=f&t=YA8kGpATMyq0jb79-0"
  }

  ];
  
  // Skills data
  const skills = [
    { name: "React.js", level: 90, category: "frontend" },
    { name: "JavaScript", level: 85, category: "frontend" },
    { name: "Docker", level: 65, category: "Backend" },
    { name: "TypeScript", level: 70, category: "frontend" },
    { name: "Node.js", level: 65, category: "backend" },
    { name: "UI/UX Design", level: 85, category: "design" },
    { name: "Figma", level: 95, category: "design" },
    { name: "DevOps", level: 50, category: "backend" }
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
      year: "2019 - 2021",
      title: "Matriculation",
      institution: "D.A.V Public Schools",
      description: "Completed with Science stream",
          achievements: [
      "Represented school in zonal-level athletics and participated in inter-school football tournaments, showcasing both academic and athletic balance.",
      "Scored 91% overall, consistently ranked among the top 5 performers in class",
    ] 
    },
    {
      year: "2021 - 2023",
      title: "Intermediate",
      institution: "D.A.V Public School",
      description: "Specialized in Physics, Chemistry and Mathematics with high distinction",
      achievements: [
        "Captained the school’s Volleyball Team, leading them to 1st place in the State-Level School Sports Meet."
      ]
    },
    {
      year: "2023 - 2027",
      title: "Bachelor's Degree",
      institution: "B.Tech, SRM University",
      description: "Computer Science and Engineering, specializing in AI & Machine Learning",
      achievements: [
        "Contributed to 10+ web projects, led hackathon teams to top-10 finishes, and built   inclusive, AI-powered platforms.",
        "Built a strong tech stack, while balancing club leadership, academics, and client work.",
        "Ranked Top 10 out of 155+ teams in a national-level hackathon and selected for the Red Bull International Fastrack finals."
      ]
    },
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
          {/* Gradient background */}

          
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
              onClick={() => window.open(resumePDF, '_blank')}
            >
              Resume
              <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 transform -translate-x-full hover:translate-x-0 transition-transform duration-300"></span>
            </motion.button>
          </div>
        </header>
        
        <main className="max-w-[1200px] mx-auto pt-32 px-6">
          
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
                    <img src= {ME} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <motion.div 
                    className="flex items-center mb-2" 
                    variants={itemVariants}
                  >
                    <div className="w-4 h-4 bg-green-600 shadow- shadow-green-400 rounded-full mr-2"></div>
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
              {/* Work Experience Section */}
              <motion.div variants={itemVariants} className="flex items-center mb-12">
                <div className="w-12 h-1 bg-white mr-4"></div>
                <NoirHeading className="text-3xl md:text-4xl">WORK EXPERIENCE</NoirHeading>
              </motion.div>
                            
              <div className="space-y-6 mb-16">
                {/* Work Experience Cards */}
                {workExperience.map((work, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    variants={itemVariants}
                    custom={index}
                  >
                    <GlassCard 
                      className="overflow-hidden"
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 0 15px rgba(255,255,255,0.08)",
                        transition: { duration: 0.3 }  
                      }}
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                          {/* Company Logo */}
                          {work.logo ? (
                            <div className="w-full h-full bg-white flex items-center justify-center">
                              <img 
                                src={work.logo} 
                                alt={`${work.company} logo`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-white/20 rounded-full"></div>
                          )}
                        </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-bold text-white text-lg mb-1">{work.company}</div>
                                <div className="text-gray-400 text-sm">{work.position}</div>
                              </div>
                              <div className="text-xs text-white/70 font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                {work.period}
                              </div>
                            </div>
                            
                            <div className="text-xs text-white/60 mt-1 mb-2">{work.type}</div>
                            <p className="text-gray-300 text-sm">{work.description}</p>
                            
                            {/* Document Links - Horizontal Layout */}
                            <div className="mt-3">
                              <div className="flex items-center">
                                <span className="text-xs text-white/50 mr-2">View Documents:</span>
                                <div className="flex gap-3">
                                  {work.offerLetter && (
                                    <a 
                                      href={work.offerLetter} 
                                      className="text-xs text-white/80 hover:text-white transition duration-150 bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10"
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      Offer Letter
                                    </a>
                                  )}
                                  {work.recommendationLetter && (
                                    <a 
                                      href={work.recommendationLetter} 
                                      className="text-xs text-white/80 hover:text-white transition duration-150 bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10"
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      Letter of Recommendation
                                    </a>
                                  )}
                                  {work.certificate && (
                                    <a 
                                      href={work.certificate} 
                                      className="text-xs text-white/80 hover:text-white transition duration-150 bg-white/5 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10"
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      Certificate
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* College Clubs Section */}
              <motion.div variants={itemVariants} className="flex items-center mb-12">
                <div className="w-12 h-1 bg-white mr-4"></div>
                <NoirHeading className="text-3xl md:text-4xl">COLLEGE CLUBS</NoirHeading>
              </motion.div>
              
              <div className="space-y-6 mb-16">
                {/* College Clubs Cards */}
                {collegeClubs.map((club, index) => (
                  <motion.div 
                    key={index} 
                    className="relative"
                    variants={itemVariants}
                    custom={index}
                  >
                    <GlassCard 
                      className="overflow-hidden"
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 0 15px rgba(255,255,255,0.08)",
                        transition: { duration: 0.3 }  
                      }}
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                          {/* Club Logo */}
                          {club.logo ? (
                            <img 
                              src={club.logo} 
                              alt={`${club.club} Logo`} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                          )}
                        </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-bold text-white text-lg mb-1">{club.club}</div>
                                <div className="text-gray-400 text-sm">{club.role}</div>
                              </div>
                              <div className="text-xs text-white/70 font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                {club.period}
                              </div>
                            </div>
                            
                            <p className="text-gray-300 text-sm mt-2">{club.description}</p>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {/* Education Section - Original Timeline but with modified card size */}
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
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <motion.div 
                                    className="font-bold text-white text-lg mb-1"
                                    whileHover={{ scale: 1.01 }}
                                  >
                                    {edu.title}
                                  </motion.div>
                                  <div className="text-gray-400 mb-2 flex items-center text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {edu.institution}
                                  </div>
                                </div>
                                <div className="text-xs text-white/70 font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                  {edu.year}
                                </div>
                              </div>
                              
                              <p className="text-gray-300 text-sm mb-3">{edu.description}</p>
                              
                              {/* Expanded Content - Skills & Achievements */}
                              <motion.div
                                variants={{
                                  collapsed: { opacity: 0.8, height: 0, marginTop: 0, display: "none" },
                                  expanded: { opacity: 1, height: "auto", marginTop: "0.5rem", display: "block" }
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/10 pt-3 mt-2">                                  
                                  <div className="mb-2">
                                    <div className="text-white/70 text-xs mb-2 font-semibold">Achievements:</div>
                                    <ul className="list-disc list-inside text-xs text-white/80 space-y-1 pl-1">
                                      {edu.achievements?.map((achievement, idx) => (
                                        <li key={idx}>{achievement}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                              
                              {/* Hover Instructions */}
                             
                            </div>
                          </motion.div>
                        </GlassCard>
                      </Tilt>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
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
          
          {/* Projects Section */}
          <section 
            id="projects"
            ref={projectsRef}
            className="my-24"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div className="flex items-center">
                <div className="w-12 h-1 bg-white mr-4"></div>
                <NoirHeading className="text-3xl md:text-4xl">
                  <span>
                    FEATURED PROJECTS
                  </span>
                </NoirHeading>
              </div>
              
              <div className="flex space-x-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 mt-4 md:mt-0">
                {['all', 'web', 'design', 'ai'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-xs rounded-lg transition-colors ${activeTab === tab ? 'bg-white text-black' : 'bg-black text-gray-400 hover:bg-gray-900'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <Tilt key={project.title} options={{ max: 15, scale: 1.05, speed: 400 }}>
                  <div
                    className="group h-full"
                    onMouseEnter={() => {setIsHovering(true); setHoverItem(`View ${project.title}`)}}
                    onMouseLeave={() => {setIsHovering(false); setHoverItem(null)}}
                  >
                    <GlassCard className="h-full overflow-hidden relative">
                      {/* Project Image Container */}
                      <div className="aspect-video rounded-lg overflow-hidden mb-5 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0 opacity-60"></div>
                        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-3">
                            {project.demoUrl && (
                              <a 
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 bg-white text-black rounded-lg font-medium flex items-center space-x-2 transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>Live Demo</span>
                              </a>
                            )}
                            
                            {/* Conditional rendering based on project category */}
                            {project.category === 'design' ? (
                              <>
                                {project.figmaUrl && (
                                  <a 
                                    href={project.figmaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="px-5 py-2 bg-black bg-opacity-80 border border-white border-opacity-20 text-white rounded-lg font-medium flex items-center space-x-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664 3.334 3.334 0 0 0 3.334-3.334v-3.33a3.333 3.333 0 0 0 3.33-6.665zm0 3.332a1.667 1.667 0 0 1 0-3.331 1.667 1.667 0 0 1 0 3.331zm-6.664-3.332a1.667 1.667 0 0 1 0-3.331h6.664a1.667 1.667 0 0 1 0 3.331H8.668zm0 3.332a1.667 1.667 0 0 1 0 3.332 1.667 1.667 0 0 1 0-3.332zm0 9.997a1.667 1.667 0 0 1 0-3.331 1.667 1.667 0 0 1 0 3.331zm3.332-1.667v-3.33h3.332a1.667 1.667 0 0 1 0 3.33H12z"/>
                                    </svg>
                                    <span>View in Figma</span>
                                  </a>
                                )}
                                
                                {project.behanceUrl && (
                                  <a 
                                    href={project.behanceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="px-5 py-2 bg-black bg-opacity-80 border border-white border-opacity-20 text-white rounded-lg font-medium flex items-center space-x-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.939.195.391.293.872.293 1.443 0 .619-.141 1.137-.421 1.551-.284.413-.7.751-1.245 1.012.749.219 1.307.601 1.675 1.146.374.549.557 1.205.557 1.969 0 .621-.12 1.16-.359 1.612-.242.457-.571.828-.989 1.114-.419.291-.911.506-1.48.641-.565.139-1.172.206-1.819.206H2V5.731H7.803zm-.351 4.972c.487 0 .891-.107 1.211-.327.32-.219.481-.567.481-1.042 0-.266-.051-.488-.151-.669a1.176 1.176 0 0 0-.417-.429 1.827 1.827 0 0 0-.627-.239 3.987 3.987 0 0 0-.791-.077H4.709v2.783h2.743zm.151 5.239c.301 0 .579-.032.835-.097.259-.064.479-.169.664-.315a1.43 1.43 0 0 0 .431-.545c.103-.219.154-.485.154-.799 0-.633-.18-1.084-.541-1.354-.359-.271-.857-.404-1.494-.404H4.709v3.514h2.894zM18 7.615v-1.88h-4.678v1.88H18zm1.273 4.561c-.198-.471-.465-.87-.799-1.204a3.563 3.563 0 0 0-1.238-.79c-.474-.187-.991-.28-1.55-.28-.521 0-1.021.093-1.499.28-.477.187-.888.453-1.239.79-.343.334-.617.741-.819 1.204-.204.471-.305.995-.305 1.584 0 .57.101 1.086.305 1.54.202.46.476.853.819 1.187.343.331.762.586 1.239.759.478.174.978.261 1.499.261.56 0 1.076-.086 1.55-.261a3.46 3.46 0 0 0 1.238-.759 3.755 3.755 0 0 0 .799-1.187c.202-.454.303-.97.303-1.54 0-.589-.101-1.113-.303-1.584zM20.8 14.1h-3.654c0 .398.117.764.339 1.097.312.433.812.65 1.49.65.47 0 .87-.118 1.197-.36.181-.129.334-.332.463-.611h1.898c-.303.928-.761 1.594-1.375 1.994-.609.4-1.349.602-2.223.602a4.635 4.635 0 0 1-1.64-.282c-.498-.188-.916-.456-1.259-.806a3.826 3.826 0 0 1-.822-1.254c-.197-.49-.295-1.033-.295-1.635 0-.574.098-1.109.287-1.596.195-.49.47-.918.833-1.279.363-.364.799-.651 1.313-.857a4.579 4.579 0 0 1 1.724-.311c.699 0 1.306.13 1.822.391.522.258.944.611 1.278 1.061.337.447.572.957.717 1.529.134.583.176 1.202.124 1.848a35.06 35.06 0 0 1-.017.619zm-3.583-2.154c-.442 0-.793.117-1.045.35-.259.238-.421.584-.489 1.044h2.941c-.035-.447-.175-.79-.43-1.031-.252-.238-.584-.363-.977-.363z"/>
                                    </svg>
                                    <span>View on Behance</span>
                                  </a>
                                )}
                              </>
                            ) : (
                              project.githubUrl && (
                                <a 
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer" 
                                  className="px-5 py-2 bg-black bg-opacity-80 border border-white border-opacity-20 text-white rounded-lg font-medium flex items-center space-x-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                  </svg>
                                  <span>View Code</span>
                                </a>
                              )
                            )}
                          </div>
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
                        <div className="overflow-hidden border-t border-white border-opacity-10 pt-3">
                          <div className="text-xs text-gray-500 uppercase mb-2 font-medium">Key Features</div>
                          <ul className="text-sm text-gray-300 space-y-1 pl-4 list-disc">
                            {project.features && project.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                          
                          {project.contribution && (
                            <div className="mt-3">
                              <div className="text-xs text-gray-500 uppercase mb-2 font-medium">My Contribution</div>
                              <p className="text-sm text-gray-300">{project.contribution}</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Hover Instructions */}
                        
                      </div>
                    </GlassCard>
                  </div>
                </Tilt>
              ))}
            </div>
          </section>
          
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
                <p className="text-gray-400 text-center max-w-md">Adding {activeTab !== 'all' ? activeTab : ''} in progress will add this shortly. Check back later or explore other categories.</p>
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
                "Don’t count the bugs, make the code count."
              </motion.p>
              <motion.p 
                className="mt-4 text-gray-400"
                whileHover={{ color: "#ffffff" }}
              >
                — Me
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
                  text: " Arhaan possesses a remarkable ability to blend design and development, ensuring visually appealing and user-friendly interfaces while maintaining robust functionality. His adaptability and eagerness to learn allowed him to excel in both roles, contributing significantly to our projects. Beyond his technical skills, Arhaan exhibited outstanding problem-solving abilities, teamwork, and professionalism. He consistently approached challenges with a positive mindset and a willingness to go the extra mile, making him a valued member of our team.",
                  author: "Arnav Madan",
                  role: "Co-Founder, Niramaya",
                  image: NiramayaLg
                },
                
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
                          { 
                            icon: <FiMail className="w-5 h-5" />, 
                            title: "Email", 
                            value: "siddiqueearhaan@gmail.com",
                            link: "mailto:siddiqueearhaan@gmail.com" 
                          },
                          { 
                            icon: <FiPhone className="w-5 h-5" />, 
                            title: "Phone", 
                            value: "+91 7070000629" 
                          },
                          { 
                            icon: <FiMapPin className="w-5 h-5" />, 
                            title: "Location", 
                            value: "SRM University, Chennai, India",
                            link: "https://maps.app.goo.gl/WDypdou2D6hSzKhY6"
                          }
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
                              {contact.link ? (
                                <a 
                                  href={contact.link} 
                                  className="font-medium hover:text-blue-400 transition-colors duration-300"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {contact.value}
                                </a>
                              ) : (
                                <div className="font-medium">{contact.value}</div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                  
                  
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
                  
                  <form 
                      className="space-y-5"
                      action="https://formspree.io/f/mzzeagbj"
                      method="POST"
                    >                     
                      <div className="space-y-2">                       
                        <label className="text-sm text-gray-400">Your Name</label>                       
                        <input                          
                          type="text"
                          name="name"                          
                          className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-10 focus:outline-none focus:border-opacity-30 transition-colors duration-300"                         
                          placeholder="What's your name?"                       
                        />                     
                      </div>                                          
                      
                      <div className="space-y-2">                       
                        <label className="text-sm text-gray-400">Your Email</label>                       
                        <input                          
                          type="email"
                          name="email"                          
                          className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-10 focus:outline-none focus:border-opacity-30 transition-colors duration-300"                         
                          placeholder="What's your email?"                       
                        />                     
                      </div>                                          
                      
                      <div className="space-y-2">                       
                        <label className="text-sm text-gray-400">Your Message</label>                       
                        <textarea                          
                          name="message"
                          className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg border border-white border-opacity-10 focus:outline-none focus:border-opacity-30 transition-colors duration-300 min-h-[120px]"                         
                          placeholder="What would you like to say?"                       
                        ></textarea>                     
                      </div>                                          
                      
                      <motion.button                        
                        className="w-full py-3 bg-white text-black font-medium rounded-lg relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
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