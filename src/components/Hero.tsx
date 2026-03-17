import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Hero() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const springX = useSpring(mousePosition.x, { stiffness: 100, damping: 30 });
  const springY = useSpring(mousePosition.y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-20, 20], [10, -10]);
  const rotateY = useTransform(springX, [-20, 20], [-10, 10]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Glow */}
      <motion.div 
        style={{
          x: springX,
          y: springY,
        }}
        className="absolute w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none z-10"
      />

      <motion.div 
        style={{ 
          x: springX,
          y: springY,
          scale: 1.1
        }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
          alt="Minimalist Luxury Villa"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark" />
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div className="space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gold text-[10px] uppercase tracking-[0.5em] mb-6 block font-bold"
          >
            Tu inmobiliaria de confianza
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
            }}
            style={{
              rotateX,
              rotateY,
            }}
            transition={{ 
              opacity: { delay: 0.4, duration: 0.8 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
            className="text-white text-5xl md:text-8xl font-serif mb-6 leading-[1.1] tracking-tight"
          >
            Te ayudamos en cada <br />
            <span className="italic text-gold">paso</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white text-lg md:text-2xl uppercase tracking-[0.3em] mb-12 font-bold drop-shadow-lg"
          >
            Vendemos tu casa en menos de <span className="text-gold underline decoration-gold/30 underline-offset-8">30 días</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl max-w-3xl mx-auto shadow-2xl"
          >
            <h2 className="text-white text-2xl font-serif mb-6">Calcula el valor de tu casa</h2>
            <p className="text-white/60 text-sm mb-8 font-light leading-relaxed">
              Descubre cuánto vale tu propiedad hoy mismo con nuestra herramienta de valoración gratuita.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                whileTap={{ scale: 0.95 }}
                href="#tasacion" 
                className="btn-primary bg-gold text-dark px-12 py-4 text-sm transition-colors shadow-lg shadow-gold/20"
              >
                Comenzar Tasación
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
                whileTap={{ scale: 0.95 }}
                href="#propiedades" 
                className="btn-primary bg-gold text-dark px-12 py-4 text-sm transition-colors shadow-lg shadow-gold/20"
              >
                Ver viviendas
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="flex gap-16 text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
          <div className="space-y-2">
            <p className="text-gold">Sede Central</p>
            <p className="text-white/60">Madrid, España</p>
          </div>
          <div className="space-y-2">
            <p className="text-gold">Contacto Directo</p>
            <p className="text-white/60">+34 900 000 000</p>
          </div>
        </div>
      </div>
    </section>
  );
}

