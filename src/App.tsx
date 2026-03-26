import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Users,
  BadgeEuro,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: globalScrollYProgress } = useScroll();

  const heroVideoRef = useRef<HTMLVideoElement>(null); // Ref for the hero video (autoplay background)
  const scrollVideoRef = useRef<HTMLVideoElement>(null); // Ref for the scroll-controlled video

  const { scrollYProgress: localScrollYProgress } = useScroll({
    target: scrollVideoRef,
    offset: ["start end", "end start"]
  });

  const videoOpacity = useTransform(globalScrollYProgress, [0, 0.3], [1, 0.5]);
  const heroOpacity = useTransform(globalScrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(globalScrollYProgress, [0, 0.2], [1, 0.95]);

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    { name: "Beatriz S.", role: "Propietaria en La Moraleja", text: "Superaron todas mis expectativas. El nivel de detalle en los acabados de madera es simplemente magistral.", rating: 4 },
    { name: "Carlos M.", role: "Empresario", text: "Profesionalidad absoluta. Cumplieron los plazos al día y el resultado final parece sacado de una revista de diseño.", rating: 5 },
    { name: "Elena R.", role: "Arquitecta", text: "Como profesional, valoro la precisión técnica. Reformas Mario es la única empresa en la que confío para mis proyectos personales.", rating: 4 },
    { name: "Javier L.", role: "Inversionista", text: "La gestión del proyecto fue impecable. No tuve que preocuparme por nada desde el primer día.", rating: 5 },
    { name: "Sofía G.", role: "Diseñadora", text: "Entienden el lujo no como ostentación, sino como calidad y armonía. Un trabajo excepcional.", rating: 4 }
  ];

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Effect for the new scroll-controlled video (scrollVideoRef)
  useEffect(() => {
    const video = scrollVideoRef.current;
    if (!video) return;

    const unsubscribe = localScrollYProgress.onChange((latest) => {
      if (video && video.duration) {
        video.currentTime = video.duration * latest;
      }
    });
    return () => {
      unsubscribe();
    };
  }, [localScrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Background Video */}
      <motion.div
        className="video-container"
      >
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/Smooth_and_striking_202603211905.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </motion.div>

      {/* Header Sticky */}
      <header className="fixed top-0 left-0 w-full z-50 bg-bone/80 backdrop-blur-md border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-charcoal font-black text-2xl tracking-tighter uppercase">Reformas Mario</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-charcoal/80 text-xs uppercase tracking-widest">
            <a href="#proyectos" className="hover:text-accent transition-colors">Proyectos</a>
            <a href="#proceso" className="hover:text-accent transition-colors">Proceso</a>
            <a href="#contacto" className="hover:text-accent transition-colors">Contacto</a>
          </nav>

          <a href="#contacto" className="bg-charcoal hover:bg-charcoal/90 text-bone px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all transform hover:scale-105 inline-block">
            Pide Presupuesto
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 md:px-24">
        {/* Subtle gradient for text readability */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-3xl w-full text-left"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-6 block"
          >
            Arquitectura & Diseño de Interiores
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-charcoal text-4xl md:text-7xl mb-8 leading-[1] font-black tracking-tighter uppercase"
          >
            Creamos el <br />
            <span className="italic font-light text-accent">Escenario</span> de su Vida
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-charcoal/70 text-base md:text-lg font-light mb-10 max-w-lg"
          >
            Transformamos espacios ordinarios en santuarios de diseño. Especialistas en reformas integrales de alto standing con acabados artesanales.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href="#proyectos" className="group inline-flex items-center gap-3 text-charcoal border border-charcoal px-10 py-4 hover:bg-charcoal hover:text-bone transition-all duration-500 uppercase tracking-widest text-xs font-bold">
              Explorar Proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content (Scrolls over video) */}
      <main className="relative z-10 bg-bone">

        {/* Trust Signals */}
        <section className="py-24 px-6 border-b border-charcoal/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { icon: ShieldCheck, title: "10 Años de Garantía", desc: "Seguridad total en cada estructura y acabado." },
                { icon: Users, title: "Equipo de Élite", desc: "Arquitectos y artesanos de primer nivel." },
                { icon: BadgeEuro, title: "Precio Cerrado", desc: "Sin sorpresas. Presupuestos honestos y finales." },
                { icon: Sparkles, title: "Limpieza Impecable", desc: "Entrega de obra lista para habitar." }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent/20 rounded-full group-hover:bg-accent/5 transition-colors">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl mb-3 font-semibold">{item.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video con reproducción controlada por scroll */}
        <motion.section
          style={{ opacity: videoOpacity }}
          className="relative w-full h-[70vh] flex items-center justify-center my-12 px-6 overflow-hidden"
        >
          <video
            ref={scrollVideoRef}
            muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/assets/Smooth_and_striking_202603211905.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
            <h2 className="text-bone text-4xl md:text-6xl font-black uppercase tracking-tighter text-center max-w-4xl leading-tight">
              Diseño y Ejecución que <span className="italic font-light text-accent">Superan Expectativas</span>
            </h2>
          </div>
        </motion.section>

        {/* Galería Proyectos (Bento Grid) */}
        <section id="proyectos" className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-3 block">Portafolio</span>
              <h2 className="text-2xl md:text-3xl">Proyectos que <span className="italic">Inspiran</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]">
              <div className="md:col-span-8 md:row-span-2 relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
                  alt="Luxury Living Room"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <h4 className="text-bone text-2xl font-serif">Penthouse Madrid</h4>
                  <p className="text-bone/80 text-sm">Reforma Integral • 2024</p>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Kitchen"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-bone text-xl font-serif">Cocina Minimalista</h4>
                  <p className="text-bone/80 text-xs">Diseño de Autor</p>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-2 relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
                  alt="Luxury Bathroom"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-bone text-xl font-serif">Spa Residencial</h4>
                  <p className="text-bone/80 text-xs">Mármol Carrara</p>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
                  alt="Suite Principal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-bone text-xl font-serif">Suite Principal</h4>
                  <p className="text-bone/80 text-xs">Iluminación Indirecta</p>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
                  alt="Dining Room"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-bone text-xl font-serif">Comedor de Gala</h4>
                  <p className="text-bone/80 text-xs">Estilo Neoclásico</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Proceso de Trabajo */}
        <section id="proceso" className="py-12 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Metodología</span>
              <h2 className="text-3xl md:text-4xl mb-4">El Camino a la <span className="italic">Perfección</span></h2>
              <p className="max-w-2xl text-charcoal/60 text-sm">Un proceso riguroso y transparente para asegurar que cada detalle cumpla con sus expectativas más exigentes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {/* Line background */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-charcoal/10 -z-10" />

              {[
                { step: "01", title: "Consultoría", desc: "Entendemos su visión y necesidades en una primera reunión de diseño." },
                { step: "02", title: "Proyecto 3D", desc: "Visualice su futuro hogar con renders hiperrealistas antes de empezar." },
                { step: "03", title: "Ejecución", desc: "Dirección técnica diaria con los mejores artesanos del sector." },
                { step: "04", title: "Entrega", desc: "Revisión final de detalles y entrega de llaves de su nuevo santuario." }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="w-24 h-24 bg-bone border border-charcoal/10 flex items-center justify-center mb-8 group-hover:border-accent transition-colors">
                    <span className="text-3xl font-serif text-accent">{item.step}</span>
                  </div>
                  <h3 className="text-xl mb-4 font-bold">{item.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios Elite */}
        <section className="py-20 bg-bone px-6 border-t border-charcoal/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl">Experiencias <span className="italic">Inolvidables</span></h2>
            </div>

            <div className="relative px-4 overflow-visible">
              <div className="flex items-center justify-center h-[450px] relative">
                {[-1, 0, 1].map((offset) => {
                  const index = (testimonialIndex + offset + testimonials.length) % testimonials.length;
                  const isCenter = offset === 0;

                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      animate={{
                        scale: isCenter ? 1 : 0.75,
                        x: offset * 320,
                        opacity: isCenter ? 1 : 0.3,
                        zIndex: isCenter ? 20 : 10,
                        filter: isCenter ? "brightness(1)" : "brightness(0.5)",
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute p-8 md:p-10 bg-white border border-charcoal/5 shadow-2xl w-full max-w-sm text-center flex flex-col justify-between h-[380px]"
                    >
                      <div>
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Sparkles
                              key={i}
                              className={`w-5 h-5 ${i < testimonials[index].rating ? "text-yellow-400 fill-yellow-400" : "text-charcoal/10 fill-charcoal/10"}`}
                            />
                          ))}
                        </div>
                        <p className="text-charcoal/80 italic font-serif leading-relaxed mb-6 text-lg overflow-hidden line-clamp-6">
                          "{testimonials[index].text}"
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest">{testimonials[index].name}</h4>
                        <p className="text-accent text-xs mt-1">{testimonials[index].role}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Controls */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-bone transition-colors z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-bone transition-colors z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Sección de Contacto */}
        <section id="contacto" className="py-20 px-6 bg-bone">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Formulario */}
              <div className="bg-white p-10 md:p-16 shadow-xl border border-charcoal/5">
                <h2 className="text-3xl md:text-4xl mb-8">Comience su <span className="italic">Transformación</span></h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Nombre Completo</label>
                      <input type="text" className="w-full bg-bone border-b border-charcoal/10 py-3 px-4 focus:border-accent outline-none transition-colors" placeholder="Ej. Juan Pérez" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Email</label>
                      <input type="email" className="w-full bg-bone border-b border-charcoal/10 py-3 px-4 focus:border-accent outline-none transition-colors" placeholder="juan@ejemplo.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Teléfono</label>
                    <input type="tel" className="w-full bg-bone border-b border-charcoal/10 py-3 px-4 focus:border-accent outline-none transition-colors" placeholder="+34 600 000 000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Tipo de Proyecto</label>
                    <select className="w-full bg-bone border-b border-charcoal/10 py-3 px-4 focus:border-accent outline-none transition-colors appearance-none">
                      <option>Reforma Integral</option>
                      <option>Interiorismo</option>
                      <option>Cocina / Baño</option>
                      <option>Otros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Mensaje</label>
                    <textarea rows={4} className="w-full bg-bone border-b border-charcoal/10 py-3 px-4 focus:border-accent outline-none transition-colors resize-none" placeholder="Cuéntenos sobre su proyecto..."></textarea>
                  </div>
                  <button className="w-full bg-charcoal text-bone py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-accent hover:text-bone transition-all duration-500">
                    Enviar Solicitud
                  </button>
                </form>
              </div>

              {/* Info de Contacto */}
              <div className="lg:pt-16">
                <div className="bg-accent/5 p-12 border-l-4 border-accent">
                  <h3 className="text-2xl mb-10 font-serif">Nuestra Oficina Central</h3>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-sm uppercase tracking-widest mb-1">Dirección</p>
                        <p className="text-charcoal/70 text-sm">Calle Serrano 45, 28001 Madrid, España</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-sm uppercase tracking-widest mb-1">Teléfono</p>
                        <p className="text-charcoal/70 text-sm">+34 912 345 678</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-sm uppercase tracking-widest mb-1">Email</p>
                        <p className="text-charcoal/70 text-sm">contacto@reformasmario.es</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-12 border-t border-accent/20">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Horario de Atención</h4>
                    <p className="text-charcoal/70 text-sm">Lunes - Viernes: 09:00 - 19:00</p>
                    <p className="text-charcoal/70 text-sm">Sábados: Cita previa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-bone py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <span className="text-accent font-black text-2xl tracking-tighter uppercase">Reformas Mario</span>
            </div>

            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-bone/10 text-[9px] uppercase tracking-[0.2em] text-bone/40 gap-4">
            <p>© 2026 Reformas Mario. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-bone transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-bone transition-colors">Privacidad</a>
              <a href="#" className="hover:text-bone transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/34912345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
