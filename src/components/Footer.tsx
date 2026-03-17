import React from 'react';
import { Home, Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-white py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Home className="w-8 h-8 text-gold" />
              <span className="text-3xl font-serif tracking-[0.3em] uppercase text-white">EMS</span>
            </div>
            <p className="text-white/40 max-w-md leading-relaxed font-light text-lg italic mb-6">
              "EMS GESTIONES INMOBILIARIAS: Tu inmobiliaria de confianza. Te ayudamos a encontrar tu próximo hogar con total transparencia."
            </p>
            <a 
              href="#tasacion"
              className="inline-block border border-gold/30 px-6 py-2 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300 group"
            >
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                Vendemos tu casa en <span className="text-white group-hover:text-gold">30 días</span>
              </p>
            </a>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-gold">Contacto</h4>
            <ul className="space-y-6 text-sm text-white/60">
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-gold" />
                contacto@emsgestiones.com
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-gold" />
                +34 900 000 000
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-gold" />
                Calle Serrano 100, Madrid
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-gold">Presencia</h4>
            <div className="flex gap-6">
              <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">
          <p>&copy; {new Date().getFullYear()} EMS GESTIONES INMOBILIARIAS. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
