import React from 'react';
import { X, Bed, Bath, Square, MapPin, Phone, Mail, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  if (!property) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-accent/40 border border-white/10 w-full max-w-4xl overflow-y-auto max-h-[90vh] rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 text-white/20 hover:text-gold transition-colors bg-dark/50 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gold text-dark px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold rounded-sm">
                    {property.type === 'sale' ? 'Venta' : 'Alquiler'}
                  </span>
                  <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold">
                    {property.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{property.title}</h2>
                <p className="text-gold text-2xl font-bold tracking-tight">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(property.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-white/40 text-xs">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{property.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
                <div className="text-center">
                  <Bed className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-white text-sm font-bold">{property.bedrooms}</p>
                  <p className="text-white/20 text-[8px] uppercase tracking-widest">Dormitorios</p>
                </div>
                <div className="text-center">
                  <Bath className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-white text-sm font-bold">{property.bathrooms}</p>
                  <p className="text-white/20 text-[8px] uppercase tracking-widest">Baños</p>
                </div>
                <div className="text-center">
                  <Square className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-white text-sm font-bold">{property.area} m²</p>
                  <p className="text-white/20 text-[8px] uppercase tracking-widest">Superficie</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Descripción</h4>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-serif text-lg">Asesor EMS</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Especialista en {property.location.split(',')[0]}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://wa.me/34600000000', '_blank')}
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#25D366] transition-all flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Asesor
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold text-dark py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
                  >
                    <Phone className="w-4 h-4" /> Contactar ahora
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-white/10 text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-dark transition-all flex items-center justify-center gap-3"
                  >
                    <Mail className="w-4 h-4" /> Solicitar información
                  </motion.button>
                </div>
                
                <p className="text-center text-[8px] text-white/20 uppercase tracking-widest">
                  Referencia: EMS-{property.id?.substring(0, 6).toUpperCase()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
