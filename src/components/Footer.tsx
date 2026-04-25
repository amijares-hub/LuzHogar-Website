import React from 'react';
import { Instagram, Twitter, Youtube, Facebook, Mail, ArrowRight, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Bio */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/luzhogar%20logo.jpg" alt="Luz Hogar" className="h-10 w-10 object-contain rounded-full shadow-sm" />
              <span className="text-3xl font-black tracking-tighter text-titan-dark uppercase">LUZ HOGAR<span className="text-titan-orange">.</span></span>
            </div>
            <p className="text-gray-500 text-xs font-bold leading-relaxed mb-8 uppercase tracking-widest">
              Líderes en Canarias. Los mejores electrodomésticos con los precios más bajos del mercado. Garantía total y envío inmediato. ¡Equipa tu hogar hoy mismo!
            </p>
            <div className="flex gap-4">
              <button className="p-2 bg-titan-light border border-gray-100 rounded-full hover:bg-titan-orange hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </button>
              <button className="p-2 bg-titan-light border border-gray-100 rounded-full hover:bg-titan-orange hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-2 bg-titan-light border border-gray-100 rounded-full hover:bg-titan-orange hover:text-white transition-all">
                <Youtube className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Nuestra Compañía</h4>
            <ul className="space-y-4">
              {['Sobre Nosotros', 'Historia', 'Tecnología', 'Sostenibilidad', 'Garantía'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-500 hover:text-titan-orange transition-colors uppercase font-bold tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Ayuda</h4>
            <ul className="space-y-4">
              {['Envíos', 'Devoluciones', 'Preguntas Frecuentes', 'Privacidad', 'Términos'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-500 hover:text-titan-orange transition-colors uppercase font-bold tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Newsletter</h4>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase mb-4 font-bold">Suscríbete para lanzamientos exclusivos.</p>
            <div className="flex bg-titan-light border border-gray-100 p-1 group focus-within:border-titan-orange transition-colors rounded-sm">
              <input 
                placeholder="EMAIL PROFESIONAL" 
                className="bg-transparent border-none focus:ring-0 text-titan-dark p-3 text-[10px] flex-1 font-bold placeholder:text-gray-300"
              />
              <button className="bg-titan-orange text-white p-3 hover:bg-titan-orange-hover transition-all rounded-sm shadow-sm">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold">
            © 2024 LUZ HOGAR CANARIAS. DESARROLLADO POR <span className="text-titan-dark">SASORILABS.IO</span>
          </p>
          
          <div className="flex items-center gap-6 opacity-30">
            <div className="flex gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-4 grayscale" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
