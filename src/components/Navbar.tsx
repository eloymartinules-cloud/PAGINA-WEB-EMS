import React from 'react';
import { Menu, X, Home, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [user] = useAuthState(auth);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-dark/95 backdrop-blur-xl py-2 border-b border-white/10 shadow-2xl' : 'bg-transparent py-6 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Home className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-500" />
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.3em] uppercase text-white group-hover:text-gold transition-colors duration-500">EMS</span>
              <span className="text-[7px] uppercase tracking-[0.2em] text-white/40 font-bold -mt-1">Real Estate Solutions</span>
            </div>
          </motion.button>
          
          <div className="hidden md:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-white/60">Expertos en Madrid</span>
            </div>
            <motion.a 
              whileHover={{ y: -4, color: '#D4AF37' }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              href="#propiedades" 
              className="text-white/60 transition-colors"
            >
              Propiedades
            </motion.a>
            <motion.a 
              whileHover={{ y: -4, color: '#D4AF37' }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              href="#tasacion" 
              className="text-white/60 transition-colors"
            >
              Tasación
            </motion.a>
            {user ? (
              <div className="flex items-center gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-6 h-6 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                  <span className="text-white/40">{user.displayName?.split(' ')[0]}</span>
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={logout} 
                  className="text-white/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05, color: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                onClick={login} 
                className="text-gold transition-colors"
              >
                Acceder
              </motion.button>
            )}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-dark border-t border-white/5 p-8 space-y-6 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <a href="#propiedades" className="block text-white/60 hover:text-gold">Propiedades</a>
            <a href="#tasacion" className="block text-white/60 hover:text-gold">Tasación</a>
            {user ? (
              <button onClick={logout} className="block text-red-500">Salir</button>
            ) : (
              <button onClick={login} className="block text-gold">Acceder</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

