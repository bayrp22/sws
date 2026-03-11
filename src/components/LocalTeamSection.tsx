import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Try to import Framer Motion, but don't fail if it's not available
let motion: any;
try {
  motion = require('framer-motion');
} catch (error) {
  // Fallback for motion elements
  motion = {
    section: 'section',
    div: 'div',
    h2: 'h2',
    p: 'p',
  };
}

const LocalTeamSection: React.FC = () => {
  const { language } = useLanguage();

  // Check if Framer Motion is available
  const isFramerAvailable = typeof motion !== 'object' || motion.section !== 'section';

  // Motion props for scroll reveal
  const sectionProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const textProps = isFramerAvailable ? {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const profilesProps = isFramerAvailable ? {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';
  const TextContent = isFramerAvailable ? motion.div : 'div';
  const ProfilesContainer = isFramerAvailable ? motion.div : 'div';

  const content = {
    EN: {
      headline1: "We Are NOT",
      headline2: "a Faceless Agency",
      paragraph1: "We're your neighbors in Los Cabos. We build real relationships and websites that bring value to our community.",
      headline3: "",
      paragraph2: " Get to know us! We met as kids at Colegio El Camino and are now founders of Search, your web services company. We don't work remotely—we're right here in Los Cabos and always available to meet in person."},
    ES: {
      headline1: "Desde Los Cabos.",
      headline2: "Para Negocios,",
      headline3: "Como el Tuyo.",
      paragraph1: "No somos una agencia sin rostro. Somos locales, igual que tu negocio. Construyendo relaciones reales y sitios web que aportan valor a nuestra comunidad.",
      paragraph2: "¡Conocenos! Nosotros nos conocimos de niños en el Colegio El Camino y ahora somos cofundadores de Search, tu empresa de servicios web. No trabajamos a distancia. Estamos aquí contigo en Los Cabos, disponibles para cualquier reunión cara a cara."
    }
  };

  const founders = [
    {
      name: "Bay Purcell",
      title: { EN: "CEO & Founder", ES: "CEO & Fundador" },
      image: "/images/Bay Profile.png",
      phone: "+52 624 264 4012",
      email: "bay@searchwebservices.tech"
    },
    {
      name: "Borja Ponce",
      title: { EN: "COO & Founder", ES: "COO & Fundador" }, 
      image: "/images/Borja Profile.png",
      phone: "+52 624 184 0829",
      email: "info@searchwebservices.tech"
    }
  ];

  return (
    <Section
      id="local-team"
      className="bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 min-h-screen flex items-center justify-center py-16 md:py-20 lg:py-24"
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <TextContent
            className="space-y-6"
            {...textProps}
          >
                                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
               {content[language].headline1}<br />
               {content[language].headline2}
               {content[language].headline3 && <><br />{content[language].headline3}</>}
             </h2>
             <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
               {content[language].paragraph1}
             </p>
             <p className="text-base md:text-lg text-gray-600 leading-relaxed">
               {content[language].paragraph2}
             </p>
          </TextContent>

                     {/* Right Side - Founder Profiles */}
           <ProfilesContainer
             className="space-y-8"
             {...profilesProps}
           >
             {/* Mobile-first: Horizontal stack of tall profile cards */}
             <div className="flex flex-row gap-4 md:hidden justify-center">
               {founders.map((founder, index) => (
                 <div
                   key={index}
                   className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 max-w-[180px] min-w-[140px]"
                 >
                   <div className="text-center">
                     {/* Profile Image */}
                     <div className="mb-5">
                       <img
                         src={founder.image}
                         alt={`${founder.name} - ${founder.title[language]}`}
                         className="w-full h-28 rounded-xl object-cover mx-auto"
                       />
                     </div>
                     
                     {/* Profile Info */}
                     <h3 className="text-base font-bold text-gray-900 mb-2">
                       {founder.name}
                     </h3>
                     <p className="text-gray-600 font-medium mb-4 text-xs">
                       {founder.title[language]}
                     </p>
                     
                     {/* Contact Information */}
                     <div className="space-y-3">
                       <div className="flex items-center justify-center">
                         <a 
                           href={`tel:${founder.phone}`}
                           className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-[10px]"
                         >
                           {founder.phone}
                         </a>
                       </div>
                       <div className="flex items-center justify-center">
                         <a 
                           href={`mailto:${founder.email}`}
                           className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-[10px]"
                         >
                           {founder.email}
                         </a>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             {/* Desktop: Original layout */}
             <div className="hidden md:block space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Floating Profile Images */}
                 {founders.map((founder, index) => (
                   <div key={`image-${index}`} className="flex justify-center">
                     <img
                       src={founder.image}
                       alt={`${founder.name} - ${founder.title[language]}`}
                       className="w-40 h-48 md:w-48 md:h-56 lg:w-52 lg:h-64 rounded-2xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                     />
                   </div>
                 ))}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Profile Info Cards */}
                 {founders.map((founder, index) => (
                   <div
                     key={`info-${index}`}
                     className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                   >
                     <div className="text-center">
                       <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                         {founder.name}
                       </h3>
                       <p className="text-gray-600 font-medium mb-6 text-base">
                         {founder.title[language]}
                       </p>
                       
                       {/* Contact Information */}
                       <div className="space-y-3">
                         <div className="flex items-center justify-center space-x-3">
                           <Phone className="w-4 h-4 text-gray-500" />
                           <a 
                             href={`tel:${founder.phone}`}
                             className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm"
                           >
                             {founder.phone}
                           </a>
                         </div>
                         <div className="flex items-center justify-center space-x-3">
                           <a 
                             href={`mailto:${founder.email}`}
                             className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm"
                           >
                             {founder.email}
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </ProfilesContainer>

        </div>
      </div>
    </Section>
  );
};

export default LocalTeamSection; 