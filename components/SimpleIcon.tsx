import React, { memo } from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiExpress, 
  SiTailwindcss, 
  SiFirebase, 
  SiDocker, 
  SiMongodb, 
  SiVercel, 
  SiShopify, 
  SiGooglecloud, 
  SiGithub, 
  SiLinkedin, 
  SiX, 
  SiInstagram,
  SiFramer,
  SiPostgresql,
  SiPrisma,
  SiJavascript,
  SiVite
} from 'react-icons/si';
import { IconType } from 'react-icons';

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
