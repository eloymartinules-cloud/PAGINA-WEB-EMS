import React from 'react';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -16, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer bg-accent/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm transition-all hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="bg-gold text-dark px-4 py-1 text-[9px] uppercase tracking-[0.2em] font-bold self-start rounded-sm">
            {property.type === 'sale' ? 'Venta' : 'Alquiler'}
          </span>
          <span className="bg-dark/60 backdrop-blur-md text-white px-4 py-1 text-[9px] uppercase tracking-[0.2em] font-bold self-start rounded-sm border border-white/10">
            {property.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
        
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold text-center bg-dark/40 backdrop-blur-sm py-3 rounded-lg border border-gold/20">
            Ver detalles y contactar
          </p>
        </div>
      </div>
      
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-serif text-white group-hover:text-gold transition-colors line-clamp-1">{property.title}</h3>
          <p className="text-gold font-bold tracking-wider text-lg whitespace-nowrap">
            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(property.price)}
            {property.type === 'rent' && <span className="text-[10px] lowercase font-normal ml-1">/mes</span>}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
          <MapPin className="w-3 h-3 text-gold" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex justify-between pt-6 border-t border-white/5 text-[10px] uppercase tracking-[0.1em] text-white/40 font-bold">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-gold/60" />
            <span>{property.bedrooms} Hab</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-gold/60" />
            <span>{property.bathrooms} Baños</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-gold/60" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

