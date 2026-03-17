import React from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import PropertyDetailModal from './PropertyDetailModal';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Home as HomeIcon, Building, Layers, Search, Trees } from 'lucide-react';

export default function PropertyGrid() {
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  // Filters
  const [activeType, setActiveType] = React.useState<'all' | 'sale' | 'rent'>('all');
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'piso' | 'casa' | 'atico' | 'duplex'>('all');

  // Build the query
  const propertiesRef = collection(db, 'properties');
  // The any here is to satisfy typescript, as constraints can be of different types.
  const constraints:any[] = [orderBy('createdAt', 'desc')];
  if (activeType !== 'all') {
    constraints.push(where('type', '==', activeType));
  }
  if (activeCategory !== 'all') {
    constraints.push(where('category', '==', activeCategory));
  }
  const q = query(propertiesRef, ...constraints);
  
  const [snapshot, loading, error] = useCollection(q);
  const properties = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Property[];

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <section id="propiedades" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-12">
        <div className="max-w-2xl">
          <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-6 block font-bold">Nuestras viviendas</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">Viviendas de Diseño</h2>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          {(['all', 'sale', 'rent'] as const).map((type) => (
            <motion.button 
              key={type}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveType(type)}
              className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-md transition-all relative z-10 ${activeType === type ? 'text-dark' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              {activeType === type && (
                <motion.div 
                  layoutId="activeType"
                  className="absolute inset-0 bg-gold rounded-md -z-10"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                />
              )}
              {type === 'all' ? 'Todos' : type === 'sale' ? 'Venta' : 'Alquiler'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-16">
        {[
          { id: 'all', label: 'Todas', icon: LayoutGrid },
          { id: 'piso', label: 'Pisos', icon: Building },
          { id: 'casa', label: 'Casas/Adosados', icon: HomeIcon },
          { id: 'terreno', label: 'Terrenos', icon: Trees },
        ].map((cat) => (
          <motion.button 
            key={cat.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`flex items-center gap-3 px-6 py-3.5 rounded-full border text-[10px] uppercase tracking-[0.15em] font-bold transition-all relative overflow-hidden z-10 ${activeCategory === cat.id ? 'text-dark border-white' : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white'}`}
          >
            {activeCategory === cat.id && (
              <motion.div 
                layoutId="activeCategory"
                className="absolute inset-0 bg-white -z-10"
                transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
              />
            )}
            <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-dark' : 'text-gold/80'}`} /> 
            {cat.label}
          </motion.button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse space-y-6">
              <div className="bg-white/5 aspect-[4/5] rounded-sm" />
              <div className="h-8 bg-white/5 w-3/4" />
              <div className="h-4 bg-white/5 w-1/2" />
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}
      
      {!loading && !error && (
        <>
          {properties && properties.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
            >
              <AnimatePresence mode="popLayout">
                {properties.map((property) => (
                  <motion.div
                    layout
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    onClick={() => handlePropertyClick(property as Property)}
                  >
                    <PropertyCard property={property as Property} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-32 border border-dashed border-white/5 rounded-3xl">
              <Search className="w-12 h-12 text-white/10 mx-auto mb-6" />
              <p className="text-white/40 font-serif text-xl italic">No se han encontrado propiedades con estos criterios.</p>
            </div>
          )}
        </>
      )}

      <PropertyDetailModal 
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
