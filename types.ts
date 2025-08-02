
import type React from 'react';

export interface ResponsesState {
  // Sección 1: Información General
  perfil: string;
  enfoque: string;
  expectativas: string;

  // Sección 2: Evaluación del Contenido
  claridad: string;
  profundidad: string;
  teoriaPractica: string;
  enfoqueVincular: string;

  // Sección 3: Experiencia Personal
  encontroLoBuscado: string;
  aspectosValiosos: string;
  quefalto: string;
  aplicabilidad: string;

  // Sección 4: Sugerencias y Propuestas
  mejoras: string;
  temasInteres: string;
  formatoPreferido: string;
}

export interface Section {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  lightColor: string;
}
