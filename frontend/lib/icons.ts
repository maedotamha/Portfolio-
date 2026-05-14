'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { FaLinkedin, FaGithub, FaCode, FaJava, FaAws } from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiPython, SiCplusplus,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiDjango, SiSpringboot,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiGit, SiDocker, SiVercel, SiPostman,
} from 'react-icons/si';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaLinkedin,
  FaGithub,
  FaCode,
  FaJava,
  FaAws,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
  SiPostman,
};

export function getIcon(name: string): React.ComponentType<{ className?: string }> {
  return iconMap[name] ?? FaCode;
}
