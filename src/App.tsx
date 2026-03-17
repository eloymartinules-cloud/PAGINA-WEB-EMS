import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import ValuationModal from './components/ValuationModal';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Departments from './components/Departments';
import { Calculator, ArrowRight, Shield, Award, Users, X } from 'lucide-react';
import { motion, AnimatePresence, useSpring } from 'motion/react';

export default function App() {
  const [isValuationOpen, setIsValuationOpen] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePosition({ x, y });
  };

  const springX = useSpring(mousePosition.x, { stiffness: 100, damping: 30 });
  const springY = useSpring(mousePosition.y, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen selection:bg-gold selection:text-dark">
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gold text-dark py-2 px-6 text-[10px] font-bold uppercase tracking-[0.2em] relative z-[60] flex justify-center items-center gap-4"
          >
            <span>Acepta nuestros términos para una mejor experiencia</span>
            <button 
              onClick={() => setShowBanner(false)}
              className="hover:scale-110 transition-transform"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      
      <main>
        <Hero />

        {/* Valuation CTA Section - Moved to the beginning */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          id="tasacion" 
          className="py-32 bg-accent/20 text-white relative overflow-hidden border-y border-white/5"
        >
          <motion.div 
            style={{ x: springX, y: springY, scale: 1.1 }}
            className="absolute inset-0 opacity-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154542-637a49df4158?auto=format&fit=crop&q=80&w=1920" 
              alt="Minimalist House Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div 
            style={{ x: -springX, y: -springY }}
            className="absolute w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none"
          />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Calculator className="w-12 h-12 text-gold mx-auto mb-8" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">¿Cuánto vale tu casa?</h2>
            <p className="text-white/40 text-lg mb-12 max-w-2xl mx-auto font-light">
              Descubre el precio real de tu propiedad en el mercado actual con nuestra herramienta de valoración gratuita.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsValuationOpen(true)}
              className="btn-primary bg-gold text-dark hover:bg-white transition-all flex items-center gap-3 mx-auto px-12 py-5"
            >
              Tasar mi vivienda <ArrowRight className="w-4 h-4" />
            </motion.button>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
              <div>
                <p className="text-3xl font-serif text-gold mb-1">150+</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Casas Vendidas</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold mb-1">500+</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Tasaciones Realizadas</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold mb-1">98%</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Clientes Satisfechos</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold mb-1">24h</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Respuesta Media</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative overflow-hidden">
          {/* Subtle background house */}
          <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
            <img 
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1920" 
              alt="Minimalist House Detail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {[
            { icon: Calculator, title: "Venta Rápida", desc: "Te ayudamos a vender tu propiedad en un plazo medio de 30 días gracias a nuestro plan de marketing." },
            { icon: Shield, title: "Tranquilidad Legal", desc: "Nos encargamos de todo el papeleo y la protección legal para que tu venta sea segura y sin sorpresas." },
            { icon: Award, title: "Atención Cercana", desc: "Un enfoque personalizado y directo. Estamos contigo en cada paso del proceso de venta o compra." },
            { icon: Users, title: "Más Compradores", desc: "Conectamos tu vivienda con una amplia red de compradores interesados, tanto locales como internacionales." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="space-y-6 group"
            >
              <feature.icon className="w-8 h-8 text-gold/60 group-hover:text-gold transition-colors duration-500" />
              <h3 className="text-2xl font-serif">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Departments Section */}
        <Departments />

        {/* Properties Grid */}
        <PropertyGrid />

        {/* Testimonials or Quote */}
        <section className="py-40 px-6 text-center max-w-5xl mx-auto border-t border-white/5 relative overflow-hidden">
          {/* Subtle background house */}
          <div className="absolute inset-0 opacity-5 pointer-events-none -z-10">
            <img 
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1920" 
              alt="Minimalist House Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-gold text-5xl font-serif mb-12 block italic opacity-50">"</span>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight italic text-white/80 max-w-4xl mx-auto">
            En EMS te ayudamos a encontrar tu próximo hogar o a vender el actual con total confianza, transparencia y cercanía.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-3">Equipo EMS</p>
              <p className="font-serif text-2xl text-white">Eloy Bódalo Martí</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-3">Equipo EMS</p>
              <p className="font-serif text-2xl text-white">Sergio Schmith Hernández</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-3">Equipo EMS</p>
              <p className="font-serif text-2xl text-white">Miguel Emo Moreno</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ValuationModal 
        isOpen={isValuationOpen} 
        onClose={() => setIsValuationOpen(false)} 
      />

      <ChatAssistant />
    </div>
  );
}

