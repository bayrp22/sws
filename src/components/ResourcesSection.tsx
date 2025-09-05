import React from 'react';
import { BookOpen, Lightbulb, Target } from 'lucide-react';
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

const ResourcesSection: React.FC = () => {
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

  const headerProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const gridProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';
  const Header = isFramerAvailable ? motion.h2 : 'h2';
  const Subheader = isFramerAvailable ? motion.p : 'p';
  const Grid = isFramerAvailable ? motion.div : 'div';

  const content = {
    EN: {
      headline: "Our Expertise & Knowledge",
      subheadline: "We bring deep expertise in web development, business growth strategies, and digital marketing to every project we undertake.",
      articles: [
        {
          url: "https://claude.ai/public/artifacts/f476e356-f09f-4c11-839e-4ef61e6f1485",
          title: "Web Development Best Practices Guide",
          description: "Comprehensive guide covering modern web development techniques, performance optimization, and industry standards.",
          icon: BookOpen,
          category: "Development"
        },
        {
          url: "https://claude.ai/public/artifacts/cdef7066-25a6-47b7-a0a5-3dda3a2382f9",
          title: "Business Growth Strategies Online",
          description: "Learn proven strategies to grow your business online, from digital marketing to customer acquisition tactics.",
          icon: Lightbulb,
          category: "Business"
        },
        {
          url: "https://claude.ai/public/artifacts/91d0241b-1a41-4f5b-ab34-3b7bb2683899",
          title: "Digital Marketing & SEO Insights",
          description: "Expert insights on digital marketing trends, SEO strategies, and how to maximize your online presence.",
          icon: Target,
          category: "Marketing"
        }
      ]
    },
    ES: {
      headline: "Nuestra Experiencia y Conocimiento",
      subheadline: "Traemos experiencia profunda en desarrollo web, estrategias de crecimiento empresarial y marketing digital a cada proyecto que emprendemos.",
      articles: [
        {
          url: "https://claude.ai/public/artifacts/f476e356-f09f-4c11-839e-4ef61e6f1485",
          title: "Guía de Mejores Prácticas de Desarrollo Web",
          description: "Guía completa que cubre técnicas modernas de desarrollo web, optimización de rendimiento y estándares de la industria.",
          icon: BookOpen,
          category: "Desarrollo"
        },
        {
          url: "https://claude.ai/public/artifacts/cdef7066-25a6-47b7-a0a5-3dda3a2382f9",
          title: "Estrategias de Crecimiento Empresarial Online",
          description: "Aprende estrategias probadas para hacer crecer tu negocio online, desde marketing digital hasta tácticas de adquisición de clientes.",
          icon: Lightbulb,
          category: "Negocio"
        },
        {
          url: "https://claude.ai/public/artifacts/91d0241b-1a41-4f5b-ab34-3b7bb2683899",
          title: "Insights de Marketing Digital y SEO",
          description: "Perspectivas expertas sobre tendencias de marketing digital, estrategias SEO y cómo maximizar tu presencia online.",
          icon: Target,
          category: "Marketing"
        }
      ]
    }
  };

  return (
    <Section
      id="resources"
      className="bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200 py-16 md:py-20 lg:py-24"
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <Header
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8"
            {...headerProps}
          >
            {content[language].headline}
          </Header>
          <Subheader
            className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto"
            {...headerProps}
          >
            {content[language].subheadline}
          </Subheader>
        </div>

        {/* Hidden SEO backlinks - invisible to users but crawlable by search engines */}
        <div className="sr-only">
          {content[language].articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${article.title} - ${article.description}`}
            >
              {article.title}
            </a>
          ))}
        </div>

        {/* Visible content section for user engagement */}
        <Grid
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          {...gridProps}
        >
          {content[language].articles.map((article, index) => {
            const IconComponent = article.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-2 border-transparent hover:border-[#A5FF00]"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Grid>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            {language === 'EN' 
              ? 'Expert insights and industry best practices' 
              : 'Perspectivas expertas y mejores prácticas de la industria'
            }
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ResourcesSection;
