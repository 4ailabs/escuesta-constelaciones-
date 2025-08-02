
import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    />
);

export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
);

export const Heart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></Icon>
);

export const Users: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>
);

export const Star: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>
);

export const Send: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Icon>
);

export const BookOpen: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></Icon>
);

export const MessageCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Icon>
);

export const CheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></Icon>
);

export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
);
