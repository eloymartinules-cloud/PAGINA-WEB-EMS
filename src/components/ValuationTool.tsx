import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { estimatePropertyValue } from '../services/geminiService';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export const ValuationTool = () => {
  const [user] = useAuthState(auth);
  const [details, setDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ estimatedValue: number; aiAnalysis: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Por favor, accede para realizar una tasación.');
      return;
    }
    if (!details.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const valuation = await estimatePropertyValue(details);
      setResult(valuation);

      // Save to Firestore
      await addDoc(collection(db, 'valuations'), {
        userId: user.uid,
        propertyDetails: details,
        phone: phone,
        estimatedValue: valuation.estimatedValue,
        aiAnalysis: valuation.aiAnalysis,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      setError('Hubo un error al procesar la tasación. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formattedValue = result ? new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(result.estimatedValue) : '';

  return (
    <section id="valuation" className="py-24 bg-zinc-50 border-y border-black/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-zinc-900 tracking-tight mb-4">Calcula el valor de tu casa</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light">
              Descubre cuánto vale tu propiedad hoy mismo con nuestra herramienta de valoración gratuita.
            </p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-black/5">
          <form onSubmit={handleValuation} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-2 uppercase tracking-widest">
                Teléfono de contacto
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 600 000 000"
                className="w-full p-6 bg-zinc-50 border border-black/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-zinc-800 mb-6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-2 uppercase tracking-widest">
                Detalles de la Propiedad
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ej: Piso de 3 habitaciones, 2 baños, 110m2, reformado en 2022, zona centro de Madrid, exterior con mucha luz..."
                className="w-full h-40 p-6 bg-zinc-50 border border-black/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none text-zinc-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Procesando con NexoIA...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                  Obtener Tasación Ahora
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 p-8 bg-emerald-50 border border-emerald-100 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900">Resultado de la Tasación</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 uppercase tracking-widest mb-1">Valor Estimado</p>
                    <p className="text-5xl font-black text-emerald-600 tracking-tighter">{formattedValue}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 uppercase tracking-widest mb-1">Análisis NexoIA</p>
                    <p className="text-emerald-900/80 leading-relaxed font-medium italic">
                      "{result.aiAnalysis}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
