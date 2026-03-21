import React, { memo } from 'react';
import { IconType } from 'react-icons';
import { 
  SiDocker, 
  SiExpress, 
  SiFirebase, 
  SiFramer,
  SiGithub, 
  SiGooglecloud, 
  SiInstagram,
  SiJavascript,
  SiLinkedin, 
  SiMongodb, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPostgresql,
  SiPrisma,
  SiReact, 
  SiShopify, 
  SiTailwindcss, 
  SiTypescript, 
  SiVercel, 
  SiVite,
  SiX} from 'react-icons/si';

interface SimpleIconProps {
  name: string;
  className?: string;
  size?: number;
}

// Mapeo estático para evitar procesar miles de iconos y mejorar el performance
const iconMap: Record<string, IconType> = {
  'react': SiReact,
  'nextdotjs': SiNextdotjs,
  'typescript': SiTypescript,
  'nodedotjs': SiNodedotjs,
  'express': SiExpress,
  'tailwindcss': SiTailwindcss,
  'firebase': SiFirebase,
  'docker': SiDocker,
  'mongodb': SiMongodb,
  'vercel': SiVercel,
  'shopify': SiShopify,
  'googlecloud': SiGooglecloud,
  'github': SiGithub,
  'linkedin': SiLinkedin,
  'twitter': SiX,
  'instagram': SiInstagram,
  'framermotion': SiFramer,
  'postgresql': SiPostgresql,
  'prisma': SiPrisma,
  'javascript': SiJavascript,
  'vite': SiVite
};

const SimpleIconComponent: React.FC<SimpleIconProps> = ({ name, className, size = 24 }) => {
  const IconComponent = iconMap[name.toLowerCase()];

  if (!IconComponent) {
    // Fallback silencioso pero visible para desarrollo
    return <span className={className} style={{ width: size, height: size, display: 'inline-block' }}>◆</span>;
  }

  return <IconComponent className={className} size={size} />;
};

// React.memo evita re-renders innecesarios de iconos estáticos
export const SimpleIcon = memo(SimpleIconComponent);
