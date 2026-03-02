import React from 'react';
import * as SiIcons from 'react-icons/si';
import { IconType } from 'react-icons';

interface SimpleIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const SimpleIcon: React.FC<SimpleIconProps> = ({ name, className, size = 24 }) => {
  // Convert slug to PascalCase with Si prefix
  // Example: 'nextdotjs' -> 'SiNextdotjs', 'react' -> 'SiReact'
  const iconKey = `Si${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}` as keyof typeof SiIcons;
  
  // Some icons have special casing in Simple Icons (e.g., Next.js is SiNextdotjs)
  // We need to handle those or provide a more robust mapping
  
  const IconComponent = (SiIcons as any)[getIconName(name)] as IconType;

  if (!IconComponent) {
    console.warn(`Icon ${name} not found in react-icons/si`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
};

// Helper to map slugs to Si component names correctly
function getIconName(slug: string): string {
  const mapping: Record<string, string> = {
    'react': 'SiReact',
    'nextdotjs': 'SiNextdotjs',
    'typescript': 'SiTypescript',
    'threedotjs': 'SiThreedotjs',
    'framermotion': 'SiFramer',
    'tailwindcss': 'SiTailwindcss',
    'nodedotjs': 'SiNodedotjs',
    'express': 'SiExpress',
    'postgresql': 'SiPostgresql',
    'firebase': 'SiFirebase',
    'graphql': 'SiGraphql',
    'stripe': 'SiStripe',
    'github': 'SiGithub',
    'linkedin': 'SiLinkedin',
    'twitter': 'SiTwitter',
    'instagram': 'SiInstagram',
  };

  return mapping[slug.toLowerCase()] || `Si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}
