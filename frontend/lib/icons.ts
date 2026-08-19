'use client';

import React from 'react';
import { FaLinkedin, FaGithub, FaCode, FaJava, FaAws, FaSitemap, FaSpider } from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiGo,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss, SiUnity,
  SiNodedotjs, SiExpress, SiDjango, SiSpringboot, SiFastapi,
  SiPostgresql, SiMongodb, SiRedis, SiMysql, SiApachekafka, SiRabbitmq, SiNginx,
  SiGit, SiDocker, SiVercel, SiPostman, SiJira, SiFigma,
  SiNumpy, SiPandas, SiScikitlearn, SiLangchain, SiMlflow,
  SiOpenai, SiGooglecloud, SiArduino, SiJsonwebtokens, SiCodeforces,
} from 'react-icons/si';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaLinkedin,
  FaGithub,
  FaCode,
  FaJava,
  FaAws,
  FaSitemap,
  FaSpider,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiUnity,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiSpringboot,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiApachekafka,
  SiRabbitmq,
  SiNginx,
  SiGit,
  SiDocker,
  SiVercel,
  SiPostman,
  SiJira,
  SiFigma,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiLangchain,
  SiMlflow,
  SiOpenai,
  SiGooglecloud,
  SiArduino,
  SiJsonwebtokens,
  SiCodeforces,
  // Aliases used by existing/legacy skill data entries
  SiOpenarchitecture: FaSitemap,
};

export function getIcon(name: string): React.ComponentType<{ className?: string }> {
  return iconMap[name] ?? FaCode;
}
