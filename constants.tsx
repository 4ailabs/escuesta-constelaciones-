
import { Users, BookOpen, Heart, MessageCircle } from './components/icons';
import type { Section } from './types';

export const SECTIONS: Section[] = [
    { title: "Información General", icon: Users, color: "bg-blue-600", lightColor: "bg-blue-100" },
    { title: "Evaluación del Contenido", icon: BookOpen, color: "bg-green-600", lightColor: "bg-green-100" },
    { title: "Experiencia Personal", icon: Heart, color: "bg-purple-600", lightColor: "bg-purple-100" },
    { title: "Sugerencias y Propuestas", icon: MessageCircle, color: "bg-orange-600", lightColor: "bg-orange-100" }
];
