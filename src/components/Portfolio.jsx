import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MessageCircle, ExternalLink, ChevronDown, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('main');
  const [theme, setTheme] = useState('dark');

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');



    
    
  };

  // Scroll handler with improved performance using requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'work'];
          const scrollPosition = window.scrollY + window.innerHeight / 3;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Graphic Medicine VIP",
      description: "Collaborated with the website team to develop and launch the Graphic Medicine website as part of Georgia Tech's VIP program. Integrated Figma mockups into a WordPress platform, ensuring seamless functionality and visual appeal.",
      tech: ["Figma", "WordPress"],
      image: "images/GraphicMed.png",
      link: "https://sites.gatech.edu/graphicmedicinelab/"
    },
    {
      title: "Spotify Wrapped",
      description: "Led frontend development for Spotify Wrapped, implementing animated designs and maintaining cohesive styles. Created engaging user experiences through Figma prototypes and dynamic content delivery using the Spotify API.",
      tech: ["Python", "Django", "CSS/HTML"],
      image: "images/spotify.png",
      link: "https://kenzieelle4.wixsite.com/atl-eats-demo/detailed-description"
    },

    {
      title: "ATL Eats",
      description: "Developed a full-stack web application for exploring Atlanta restaurants, featuring Google Maps integration. Created responsive front-end components and implemented robust search functionality.",
      tech: ["Python", "Django", "HTML/CSS"],
      image: "images/Atleats.png",
      link: "https://kenzieelle4.wixsite.com/atl-eats-demo/copy-of-detailed-description"
    }
  ];
  

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm z-50 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 
            onClick={() => {
              setCurrentPage('main');
              scrollTo('home');
            }}
            className="text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
          >
            VB
          </h1>
          <div className="space-x-8">
            {[
              { id: 'work', label: 'Work', action: () => {
                setCurrentPage('main');
                scrollTo('work');
              }},
              { id: 'playground', label: 'Playground', action: () => setCurrentPage('playground') },
              { id: 'about', label: 'About', action: () => setCurrentPage('about') },
              { id: 'resume', label: 'Resume', action: () => setCurrentPage('resume') }
            ].map(({ id, label, action }) => (
              <button
                key={id}
                onClick={action}
                className={`hover:text-blue-400 transition-colors ${
                  (activeSection === id && currentPage === 'main') || currentPage === id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const Home = () => (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 bg-[#B76DA4]">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Vaishnavi Bhalla</h1>
        <h2 className="text-2xl text-[#EFDEDF] mb-6">BS in Computational Media</h2>
        <p className="text-[#F1CEED] max-w-xl mx-auto mb-12">
          designer & developer ✧˖° // currently @ Georgia Institute of Technology
        </p>
        <ChevronDown
          className="mx-auto animate-bounce cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"
          size={32}
          onClick={() => scrollTo('work')}
        />
      </div>
    </section>
  );

  const Work = () => (
    <section id="work" className="min-h-screen py-20 bg-[#74AFF9]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl text-[#EFDEDF] font-bold mb-12 text-center">Work </h2>
        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );

  const ProjectCard = ({ title, description, tech, image, link }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#EFDEDF] bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item, i) => (
            <span
              key={i}
              className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Project <ExternalLink className="ml-2" size={16} />
        </a>
      </div>
    </div>
  );

  const Contact = () => (
    <section className="py-20 bg-[#B76DA4]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#EFDEDF]">Let's Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Github, 
              label: 'GitHub', 
              link: 'https://github.com/Navibhalla101' 
            },
            { 
              icon: Linkedin, 
              label: 'LinkedIn', 
              link: 'https://www.linkedin.com/in/vaishnavibhalla/' 
            },
            { 
              icon: Mail, 
              label: 'Email', 
              link: 'mailto:navibhalla113@gmail.com' 
            }
          ].map(({ icon: Icon, label, link }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-3 text-[#EFDEDF] hover:text-blue-400 group"
            >
              <div className="p-4 bg-[#B76DA4] rounded-full group-hover:bg-slate-700 transition-colors">
                <Icon size={24} />
              </div>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
  const Playground = () => {
    const images = [
      { src: 'images/mont.png', alt: 'Mountian Studio Ghibli', title: 'Mountain View', description: 'Studio Ghibli mountain landscape .' },
      { src: 'images/plant.png', alt: ':)', title: 'Green Plant', description: 'A close-up of a vibrant plant.' },
      { src: 'images/wormart.png', alt: 'Dune Inspired', title: 'Abstract Worm', description: 'Dune insspired eclipse.' },
      { src: 'images/final.png', alt: 'Final Project', title: 'Final Project', description: 'Took a year to finish this Studio Ghibli painting.' },
    ];
  
    const [activeImage, setActiveImage] = useState(null);
  
    const handleLightboxClick = (e) => {
      // Only close if clicking the background overlay, not the image or content
      if (e.target === e.currentTarget) {
        setActiveImage(null);
      }
    };
  
    return (
      <div className="min-h-screen py-20 px-4 bg-[#74AFF9]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl text-[#EFDEDF] font-bold mb-12 text-center">
          𐐪𐑂 Playground 𐐪𐑂
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative group"
                onClick={() => setActiveImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
  
          {activeImage && (
            <div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={handleLightboxClick} // Handle click on the overlay
            >
              <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute -top-4 -right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                >
                  ×
                </button>
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-w-full max-h-[80vh] rounded-lg object-contain mx-auto"
                />
                <div className="text-center text-white mt-4">
                  <h3 className="text-2xl font-bold">{activeImage.title}</h3>
                  <p className="text-gray-300">{activeImage.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  

  const About = () => (
    <div className="min-h-screen py-20 px-4 bg-[#849867]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-[#A56094]">⋆˚✿˖° About Me ૮ • ﻌ - ა</h2>
        <p className="text-gray-300 mb-8 ">
          
I am currently an undergraduate student at the Georgia Institute of Technology. I’m pursuing a B.S. in Computational Media with a concentration in Intelligence and Interaction Design under both the College of Computing and the Ivan Allen College of Liberal Arts.My unique position at the intersection of the College of Computing and Ivan Allen College of Liberal Arts allows me to approach problems with both analytical precision and creative insight. I combine strong programming fundamentals with design thinking methodology to create meaningful technological solutions. Whether I'm prototyping new interfaces, conducting user research, or developing interactive applications, I focus on crafting experiences that are both technically robust and aesthetically engaging.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['React', 'JavaScript', 'Python', 'UI/UX', 'Node.js', 'Figma'].map((skill, index) => (
            <div key={index} className="bg-slate-900/50 p-4 rounded-lg text-[#EFDEDF]">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Resume = () => (
    <div className="min-h-screen py-20 px-4 bg-slate-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-[#EFDEDF]"> Resume ˙ᵕ˙</h2>
        <div className="bg-slate-900/50 p-8 rounded-lg">
          <p className="text-gray-300 mb-6">View/download my current resume</p>
          <a 
            href="images/VB_Resume.pdf" 
            className="inline-flex items-center px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume <ExternalLink className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <>
      <Home />
      <Work />
      <Contact />
    </>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      {currentPage === 'main' && <MainContent />}
      {currentPage === 'playground' && <Playground />}
      {currentPage === 'about' && <About />}
      {currentPage === 'resume' && <Resume />}
    </div>
  );
};

export default Portfolio;
