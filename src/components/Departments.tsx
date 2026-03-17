import React from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Wallet, Camera, Scale, Megaphone, HeartHandshake, Building2 } from 'lucide-react';

const departments = [
  {
    title: 'Departamento Financiero',
    description: 'Te ayudamos a conseguir las mejores condiciones para tu hipoteca y soluciones de financiación a medida.',
    icon: Wallet,
  },
  {
    title: 'Legal y Jurídico',
    description: 'Nuestros expertos aseguran que cada contrato y trámite cumpla con la normativa, dándote total tranquilidad.',
    icon: Scale,
  },
  {
    title: 'Fotografía y Home Staging',
    description: 'Hacemos que tu casa destaque con reportajes profesionales, tours virtuales y preparación estética para la venta.',
    icon: Camera,
  },
  {
    title: 'Marketing Digital',
    description: 'Posicionamos tu vivienda en los principales portales y redes sociales para llegar al comprador ideal rápidamente.',
    icon: Megaphone,
  },
  {
    title: 'Atención al Cliente',
    description: 'Estamos contigo antes, durante y después de la operación. Resolvemos tus dudas y te ayudamos con la post-venta.',
    icon: HeartHandshake,
  },
  {
    title: 'Gestión Comercial',
    description: 'Un equipo experto en negociación que se encarga de filtrar visitas y conseguir el mejor acuerdo para ti.',
    icon: Building2,
  },
];

export default function Departments() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    setMousePosition({ x, y });
  };

  const springX = useSpring(mousePosition.x, { stiffness: 100, damping: 30 });
  const springY = useSpring(mousePosition.y, { stiffness: 100, damping: 30 });

  const bgX = useTransform(springX, (val) => val * 0.5);
  const bgY = useTransform(springY, (val) => val * 0.5);

  return (
    <section 
      id="servicios" 
      onMouseMove={handleMouseMove}
      className="py-32 relative overflow-hidden"
    >
      {/* Background Image */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.1 }}
        className="absolute inset-0 opacity-5 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920" 
          alt="Minimalist Interior"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Background decoration */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gold/10 blur-[120px] rounded-full -z-10" 
      />
      <motion.div 
        style={{ x: -springX, y: -springY }}
        className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/10 blur-[100px] rounded-full -z-10" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-6 block font-bold">Servicios Integrales</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Nuestros Departamentos</h2>
          <p className="text-white/40 text-lg max-w-2xl font-light">
            Cubrimos todas las áreas del proceso inmobiliario para que no tengas que preocuparte por nada. Un equipo de especialistas a tu servicio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                scale: 1.02,
                zIndex: 10
              }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                scale: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-white/5 p-12 transition-colors group cursor-default relative"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-dark transition-all duration-500 shadow-lg shadow-gold/0 group-hover:shadow-gold/20">
                <dept.icon className="w-6 h-6 text-gold group-hover:text-dark transition-colors" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{dept.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors">
                {dept.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
