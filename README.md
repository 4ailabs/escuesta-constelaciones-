# Cuestionario de Talleres

Una aplicación web para gestionar cuestionarios de talleres desarrollada con React, TypeScript y Vite.

## 🚀 Características

- Interfaz moderna y responsive
- Gestión de cuestionarios
- Tecnologías: React 19, TypeScript, Vite

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

## 🛠️ Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/cuestionario-de-talleres.git
   cd cuestionario-de-talleres
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (si es necesario):**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es una aplicación Vite
3. El despliegue se realizará automáticamente en cada push

### Netlify
1. Conecta tu repositorio de GitHub a Netlify
2. Configura el comando de build: `npm run build`
3. Configura el directorio de publicación: `dist`

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
