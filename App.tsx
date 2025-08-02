
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Heart, Users, Star, Send, BookOpen, MessageCircle, CheckCircle, ChevronLeft } from './components/icons';
import { SECTIONS } from './constants';
import type { ResponsesState } from './types';

const BackgroundParticles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-200 rounded-full opacity-30 animate-bounce"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

const SuccessConfetti: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-50">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-ping"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
          animationDelay: `${Math.random() * 1}s`,
          animationDuration: '2s'
        }}
      />
    ))}
  </div>
);

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [responses, setResponses] = useState<ResponsesState>({
    perfil: '',
    enfoque: '',
    expectativas: '',
    claridad: '',
    profundidad: '',
    teoriaPractica: '',
    enfoqueVincular: '',
    encontroLoBuscado: '',
    aspectosValiosos: '',
    quefalto: '',
    aplicabilidad: '',
    mejoras: '',
    temasInteres: '',
    formatoPreferido: ''
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const animateTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 300);
  };

  const handleInputChange = useCallback((field: keyof ResponsesState, value: string) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowSuccess(true);

    const now = new Date();
    const fecha = now.toLocaleDateString('es-MX');
    const hora = now.toLocaleTimeString('es-MX');

    // Helper to format radio button values for readability
    const formatValue = (value: string) => value.replace(/_/g, ' ') || 'No especificado';
    
    const summary = `
EVALUACIÓN DE TALLER TEMÁTICO - CONSTELACIONES MÉXICO
Fecha: ${fecha} - Hora: ${hora}
================================================

=== INFORMACIÓN GENERAL ===
Perfil profesional: ${responses.perfil || 'No especificado'}
Enfoque terapéutico: ${responses.enfoque || 'No especificado'}
Expectativas:
${responses.expectativas || 'No especificado'}

=== EVALUACIÓN DEL CONTENIDO ===
Claridad del tema: ${responses.claridad ? `${responses.claridad}/5` : 'No calificado'}
Profundidad: ${formatValue(responses.profundidad)}
Teoría y práctica:
${responses.teoriaPractica || 'No especificado'}
Enfoque vincular:
${responses.enfoqueVincular || 'No especificado'}

=== EXPERIENCIA PERSONAL ===
Encontró lo buscado: ${formatValue(responses.encontroLoBuscado)}
Aspectos valiosos:
${responses.aspectosValiosos || 'No especificado'}
Qué faltó:
${responses.quefalto || 'No especificado'}
Aplicabilidad:
${responses.aplicabilidad || 'No especificado'}

=== SUGERENCIAS Y PROPUESTAS ===
Mejoras:
${responses.mejoras || 'No especificado'}
Temas de interés:
${responses.temasInteres || 'No especificado'}
Formato preferido: ${formatValue(responses.formatoPreferido)}
    `.trim();

    const recipient = 'pinorizzo@gmail.com';
    const subject = encodeURIComponent('Evaluación de Taller Temático - Constelaciones México');
    const body = encodeURIComponent(summary);
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Use a short timeout to allow confetti to render
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // Open user's default email client
    window.location.href = mailtoLink;

    // Provide feedback after attempting to open email client
    setTimeout(() => {
      alert(`¡Gracias por tu participación!

Tu programa de correo se abrirá con la evaluación lista para enviar. Por favor, revisa y presiona "Enviar".

Si no se abre, puedes copiar tus respuestas desde la consola del navegador (F12) y enviarlas manualmente.`);
      
      console.log("\n\n--- COPIA Y ENVÍA MANUALMENTE A pinorizzo@gmail.com ---\n\n");
      console.log(summary);
      console.log("\n\n--- FIN DE LAS RESPUESTAS ---\n\n");
    }, 1000);

    setIsSubmitting(false);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const nextSection = () => {
    if (currentSection < SECTIONS.length - 1) {
      animateTransition(() => {
        setCurrentSection(currentSection + 1);
      });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      animateTransition(() => {
        setCurrentSection(currentSection - 1);
      });
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className={`text-center mb-6 sm:mb-8 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${SECTIONS[currentSection].lightColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-500 transform hover:scale-110`}>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Información General</h2>
              <p className="text-sm sm:text-base text-gray-600">Compártenos un poco sobre ti y tu contexto profesional</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tu perfil profesional</label>
              <select 
                value={responses.perfil} 
                onChange={(e) => handleInputChange('perfil', e.target.value)} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
              >
                <option value="">Selecciona una opción</option>
                <option value="terapeuta">Terapeuta/Psicoterapeuta</option>
                <option value="constelador">Constelador Familiar</option>
                <option value="estudiante">Estudiante en formación</option>
                <option value="profesional_salud">Profesional de la salud</option>
                <option value="publico_general">Público general</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enfoque terapéutico principal (si aplica)</label>
              <input 
                type="text" 
                value={responses.enfoque} 
                onChange={(e) => handleInputChange('enfoque', e.target.value)} 
                placeholder="Ej: Constelaciones Familiares, Gestalt..." 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tus expectativas para este taller</label>
              <textarea 
                value={responses.expectativas} 
                onChange={(e) => handleInputChange('expectativas', e.target.value)} 
                placeholder="¿Qué esperabas aprender o experimentar?" 
                rows={4} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base resize-none" 
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Evaluación del Contenido</h2>
              <p className="text-sm sm:text-base text-gray-600">Ayúdanos a entender cómo percibiste el desarrollo del tema</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Claridad en el desarrollo del tema</label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button 
                    key={rating} 
                    onClick={() => handleInputChange('claridad', rating.toString())} 
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 min-h-[60px] sm:min-h-[80px] flex flex-col items-center justify-center ${
                      responses.claridad === rating.toString() 
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                        : 'border-gray-300 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <Star className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${
                      responses.claridad === rating.toString() 
                        ? 'fill-current text-yellow-500' 
                        : 'text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{rating}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>Poco claro</span>
                <span>Muy claro</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">¿La profundidad del tema fue apropiada?</label>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { value: 'muy_superficial', label: 'Demasiado superficial' }, 
                  { value: 'poco_profundo', label: 'Poco profundo' }, 
                  { value: 'adecuado', label: 'Adecuado' }, 
                  { value: 'profundo', label: 'Muy profundo' }, 
                  { value: 'demasiado_complejo', label: 'Demasiado complejo' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200">
                    <input 
                      type="radio" 
                      name="profundidad" 
                      value={option.value} 
                      checked={responses.profundidad === option.value} 
                      onChange={(e) => handleInputChange('profundidad', e.target.value)} 
                      className="w-4 h-4 text-green-600 focus:ring-green-500" 
                    />
                    <span className="text-sm sm:text-base text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Integración entre teoría y práctica</label>
              <textarea 
                value={responses.teoriaPractica} 
                onChange={(e) => handleInputChange('teoriaPractica', e.target.value)} 
                placeholder="¿Hubo un buen equilibrio entre contenido y experiencia?" 
                rows={3} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conexión del tema con el enfoque vincular</label>
              <textarea 
                value={responses.enfoqueVincular} 
                onChange={(e) => handleInputChange('enfoqueVincular', e.target.value)} 
                placeholder="¿Cómo se integró con la perspectiva sistémica?" 
                rows={3} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-base resize-none" 
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Experiencia Personal</h2>
              <p className="text-sm sm:text-base text-gray-600">Comparte tu vivencia en el taller</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">¿Encontraste lo que buscabas?</label>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { value: 'si_completamente', label: 'Sí, completamente' }, 
                  { value: 'si_en_gran_parte', label: 'Sí, en gran parte' }, 
                  { value: 'parcialmente', label: 'Parcialmente' }, 
                  { value: 'no_mucho', label: 'No mucho' }, 
                  { value: 'no_en_absoluto', label: 'No en absoluto' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200">
                    <input 
                      type="radio" 
                      name="encontroLoBuscado" 
                      value={option.value} 
                      checked={responses.encontroLoBuscado === option.value} 
                      onChange={(e) => handleInputChange('encontroLoBuscado', e.target.value)} 
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500" 
                    />
                    <span className="text-sm sm:text-base text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspectos más valiosos del taller</label>
              <textarea 
                value={responses.aspectosValiosos} 
                onChange={(e) => handleInputChange('aspectosValiosos', e.target.value)} 
                placeholder="¿Qué fue lo más enriquecedor para ti?" 
                rows={4} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Qué sentiste que faltó o podría mejorar?</label>
              <textarea 
                value={responses.quefalto} 
                onChange={(e) => handleInputChange('quefalto', e.target.value)} 
                placeholder="¿Qué elementos o enfoques podrían haberse incluido?" 
                rows={4} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo aplicarás lo aprendido?</label>
              <textarea 
                value={responses.aplicabilidad} 
                onChange={(e) => handleInputChange('aplicabilidad', e.target.value)} 
                placeholder="Reflexiona sobre la aplicación práctica en tu vida..." 
                rows={4} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base resize-none" 
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Sugerencias y Propuestas</h2>
              <p className="text-sm sm:text-base text-gray-600">Ayúdanos a mejorar y a planificar</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sugerencias de mejora para futuros talleres</label>
              <textarea 
                value={responses.mejoras} 
                onChange={(e) => handleInputChange('mejoras', e.target.value)} 
                placeholder="Comparte tus ideas para mejorar la experiencia..." 
                rows={4} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-base resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temas de interés para próximos talleres</label>
              <textarea 
                value={responses.temasInteres} 
                onChange={(e) => handleInputChange('temasInteres', e.target.value)} 
                placeholder="Propón temas que te gustaría explorar..." 
                rows={4} 
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-base resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Formato preferido para los talleres</label>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { value: 'mas_vivencial', label: 'Más vivencial y experiencial' }, 
                  { value: 'mas_teorico', label: 'Más teórico y conceptual' }, 
                  { value: 'casos_practicos', label: 'Análisis de casos prácticos' }, 
                  { value: 'equilibrado', label: 'Equilibrio entre teoría y práctica' }, 
                  { value: 'demostraciones', label: 'Demostraciones y observación' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200">
                    <input 
                      type="radio" 
                      name="formatoPreferido" 
                      value={option.value} 
                      checked={responses.formatoPreferido === option.value} 
                      onChange={(e) => handleInputChange('formatoPreferido', e.target.value)} 
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                    />
                    <span className="text-sm sm:text-base text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-blue-100">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">¡Gracias por tu participación!</h3>
                  <p className="text-blue-700 text-sm leading-relaxed mb-3">Tu retroalimentación es fundamental para seguir creando espacios de crecimiento y aprendizaje.</p>
                  <a 
                    href="https://www.constelacionesmexico.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors hover:underline flex items-center group text-sm sm:text-base"
                  >
                    Visita nuestro sitio para conocer los próximos talleres
                    <span className="ml-1.5 transform transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-3 sm:p-4 relative overflow-hidden flex flex-col">
      <BackgroundParticles />
      {showSuccess && <SuccessConfetti />}

      <main className="flex-grow">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-6 sm:mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg transition-all duration-1000 ${animate ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
            </div>
            <h1 className={`text-2xl sm:text-4xl font-bold text-gray-800 mb-2 transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Evaluación de Taller Temático
            </h1>
            <p className={`text-lg sm:text-xl text-gray-600 mb-3 sm:mb-4 transition-all duration-1000 delay-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Constelaciones México
            </p>
            <div className={`w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full transition-all duration-1000 delay-700 ${animate ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          <div className="mb-6 sm:mb-8">
            {/* Progress bar for mobile */}
            <div className="block sm:hidden mb-4">
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-xs text-gray-600">Progreso</span>
                <span className="text-xs font-medium text-gray-800">{currentSection + 1} de {SECTIONS.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentSection + 1) / SECTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Desktop progress indicators */}
            <div className="hidden sm:flex justify-between items-center mb-4 px-4 sm:px-0">
              {SECTIONS.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <React.Fragment key={index}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index <= currentSection ? section.color : 'bg-gray-300'} text-white transition-all duration-500 shadow-md transform ${index === currentSection ? 'scale-110 animate-pulse' : ''}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {index < SECTIONS.length - 1 && (
                      <div className={`flex-1 h-2 mx-3 rounded-full transition-all duration-700 ${index < currentSection ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className={`text-center text-sm text-gray-600 bg-white rounded-lg py-2 px-4 shadow-sm transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
              Sección {currentSection + 1} de {SECTIONS.length}: {SECTIONS[currentSection].title}
            </div>
          </div>

          <div className={`bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100 transition-all duration-500 transform ${isTransitioning ? 'scale-95 opacity-70 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
            {renderSection()}
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={prevSection} 
              disabled={currentSection === 0} 
              className={`px-4 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 text-sm sm:text-base ${
                currentSection === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
            
            <div className="flex space-x-1 sm:space-x-2">
              {SECTIONS.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 transform ${
                    index === currentSection 
                      ? 'bg-blue-500 scale-125 animate-pulse' 
                      : 'bg-gray-300 hover:scale-110'
                  }`} 
                />
              ))}
            </div>
            
            {currentSection < SECTIONS.length - 1 ? (
              <button 
                onClick={nextSection} 
                className="px-4 sm:px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting} 
                className={`px-4 sm:px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base ${isSubmitting ? 'animate-pulse' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Enviar</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
      
      <footer className="text-center py-4 sm:py-6 px-4">
        <p className="text-xs sm:text-sm text-gray-600">
          Un proyecto de{' '}
          <a
            href="https://www.constelacionesmexico.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-purple-600 transition-colors hover:underline"
          >
            Constelaciones México
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default App;
