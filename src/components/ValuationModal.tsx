import React from 'react';
import { X, Calculator, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ValuationModal({ isOpen, onClose }: ValuationModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<number | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: 'piso',
    area: '',
    bedrooms: '2'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get AI Valuation
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `Como experto inmobiliario en España, proporciona una tasación estimada (solo el número, sin texto adicional) para un ${formData.propertyType} de ${formData.area}m² con ${formData.bedrooms} habitaciones en la dirección: ${formData.address}. Devuelve solo un número entero que represente el valor en euros.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const estimatedValue = parseInt(response.text?.replace(/[^0-9]/g, '') || '0');
      setResult(estimatedValue);

      // 2. Save to Firebase
      await addDoc(collection(db, 'valuations'), {
        ...formData,
        area: Number(formData.area),
        bedrooms: Number(formData.bedrooms),
        estimatedValue,
        createdAt: serverTimestamp()
      });

    } catch (error) {
      console.error("Error in valuation:", error);
    } finally {
      setLoading(false);
    }
  };

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
            className="relative bg-accent/40 border border-white/10 w-full max-w-2xl p-8 md:p-16 overflow-y-auto max-h-[90vh] rounded-3xl shadow-2xl backdrop-blur-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/20 hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!result ? (
              <>
                <div className="text-center mb-12">
                  <Calculator className="w-12 h-12 text-gold mx-auto mb-6" />
                  <h2 className="text-4xl font-serif mb-4 text-white">Tasación Inteligente</h2>
                  <p className="text-white/40 text-sm font-light">Complete los detalles de su propiedad para recibir una valoración instantánea.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-gold outline-none transition-colors font-light"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Email de Contacto</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-gold outline-none transition-colors font-light"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Teléfono</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-gold outline-none transition-colors font-light"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Ubicación Exacta</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Calle, Número, Ciudad"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-gold outline-none transition-colors font-light placeholder:text-white/10"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Tipología</label>
                    <select 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-gold outline-none transition-colors font-light appearance-none"
                      value={formData.propertyType}
                      onChange={e => setFormData({...formData, propertyType: e.target.value})}
                    >
                      <option value="piso" className="bg-dark text-white">Piso</option>
                      <option value="casa" className="bg-dark text-white">Casa/Adosado</option>
                      <option value="terreno" className="bg-dark text-white">Terreno</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Superficie Útil (m²)</label>
                    <input 
                      required
                      type="number" 
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-gold outline-none transition-colors font-light"
                      value={formData.area}
                      onChange={e => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                  
                  <div className="md:col-span-2 pt-10">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      type="submit" 
                      className="w-full btn-primary bg-gold text-dark hover:bg-white transition-all flex items-center justify-center gap-3 py-5 text-sm font-bold uppercase tracking-widest"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Obtener Valoración'}
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-gold/20">
                  <Calculator className="w-10 h-10 text-gold" />
                </div>
                <h2 className="text-3xl font-serif mb-6 text-white/60">Valoración Estimada</h2>
                <p className="text-6xl md:text-7xl font-bold text-gold mb-10 tracking-tighter">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(result)}
                </p>
                <p className="text-white/40 max-w-md mx-auto mb-12 font-light leading-relaxed">
                  Esta cifra es una aproximación basada en IA. Un consultor senior de EMS realizará un estudio de mercado exhaustivo para usted.
                </p>
                <button 
                  onClick={() => setResult(null)}
                  className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold border border-gold/30 px-12 py-4 hover:bg-gold hover:text-dark transition-all"
                >
                  Nueva Consulta
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
