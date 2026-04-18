'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "./components/disco_light";
import CircularGallery from "./components/circular_gallery";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const promoRef = useRef(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Hero entry animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );

    // Scroll reveal for sections
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Promotion banner pulse
    gsap.to(promoRef.current, {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const heroImg = "/images/landing_photo.jpg";
  const placeholderImg = "/images/IMG_9867.png";
  const expImg = "/images/br_img1.jpg";

  const galleryItems = [
    { image: "/images/br_img2.jpg", text: "The First Spark" },
    { image: "/images/br_img3.jpg", text: "Evening Glow" },
    { image: "/images/br_img4.jpg", text: "Mastering the Craft" },
    { image: "/images/br_img5.jpg", text: "Sizzling Secrets" },
    { image: "/images/br_img6.jpg", text: "Culinary Poetry" },
    { image: "/images/br_img7.jpg", text: "The Perfect Moment" },
    { image: "/images/br_img8.jpg", text: "Liquid Gold" },
    { image: "/images/br_img9.jpg", text: "Shared Laughter" },
    { image: "/images/br_img10.jpg", text: "Vibrant Echoes" },
    { image: "/images/br_img11.jpg", text: "A Feast for Senses" },
    { image: "/images/br_img12.jpg", text: "Twilight Tales" },
    { image: "/images/br_img13.jpg", text: "Endless Memories" },
  ];


  return (
    <div className="flex flex-col w-full gap-8">

      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full flex justify-center items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="BR's Diner Interior"
            fill
            className="object-cover opacity-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-transparent to-bg-dark"></div>
        </div>

        {/* Disco Lights Layer */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-40">
          <LightRays
            raysOrigin="top-center"
            raysColor="#f5d246"
            raysSpeed={2}
            lightSpread={5}
            rayLength={10}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto pt-20">
          <span className="uppercase tracking-[0.4em] text-brand-primary text-xs font-bold mb-6 block">Est. 2026</span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold gold-gradient mb-4 drop-shadow-2xl">
            BR's Diner
          </h1>
          <p className="text-xl md:text-2xl font-light text-text-main/90 italic mb-10 tracking-wide">
            "Good times start here"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#menu" className="w-full sm:w-auto px-10 py-4 bg-brand-primary text-bg-dark font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1">
              Explore Menu
            </a>
            <a href="#contact" className="w-full sm:w-auto px-10 py-4 border border-brand-primary text-brand-primary font-bold uppercase tracking-widest hover:bg-brand-primary/10 transition-all transform hover:-translate-y-1">
              Reservations
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-primary/60 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/40 animate-[scroll-line_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>


      {/* Carousel Section */}


      {/* Experience Section */}
      <section id="about" ref={addToRefs} className="py-24 px-6 w-full flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-brand-primary/20 shadow-2xl">
              <Image
                src={expImg}
                alt="Experience"
                fill
                className="object-cover hover:scale-110 transition-transform duration-1000"
              />
            </div>
            <div className="space-y-8">
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">The Story</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">Where Atmosphere Meets Flavor</h2>
              <p className="text-text-muted leading-relaxed text-lg">
                BR’s Diner isn’t just a place to eat; it’s a destination for the senses. Nestled in the heart of the city, we combine the energy of a premium restobar with the soul-satisfying flavors of a traditional diner, reimagined for the modern palate.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="font-serif text-brand-primary text-2xl mb-2">Crafted Drinks</h4>
                  <p className="text-sm text-text-muted">Mixology that tells a story with every sip.</p>
                </div>
                <div>
                  <h4 className="font-serif text-brand-primary text-2xl mb-2">Prime Cuts</h4>
                  <p className="text-sm text-text-muted">Aged to perfection and grilled over open flame.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" ref={addToRefs} className="py-24 px-6 w-full flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4">Visuals</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 italic">Snapshot of Vibes</h2>
            <p className="text-text-muted text-lg max-w-2xl text-center">A glimpse into the energy, the people, and the moments that make BR's Diner special.</p>
          </div>

          <div style={{ height: '600px', position: 'relative' }} className="w-full">
            <CircularGallery
              items={galleryItems}
              bend={-1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.05}
            />
          </div>
        </div>
      </section>


      {/* Reservation Section */}
      <section id="contact" ref={addToRefs} className="py-24 bg-bg-surface border-y border-white/5 w-full flex justify-center">
        
        <div className="w-full max-w-6xl mx-auto px-6 pt-[200px]">

          <div className="flex flex-col items-center text-center mb-20 gap-2">
            <h2 className="text-4xl md:text-7xl font-serif mb-8 italic">Ready for Good Times?</h2>
            <p className="text-text-muted text-lg max-w-2xl text-center">Reservations are recommended.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-12 border-t border-white/10">
            <div className="space-y-4">
              <h4 className="text-brand-primary font-bold uppercase text-[10px] tracking-[0.4em]">Location</h4>
              <p className="text-xl text-text-main font-serif">
                456 Nightlife Ave, Suite 101<br />
                Metro Downtown, MD 20260
              </p>
            </div>
            <div className="space-y-4 md:text-right">
              <h4 className="text-brand-primary font-bold uppercase text-[10px] tracking-[0.4em]">Contact</h4>
              <p className="text-xl text-text-main font-serif">
                +1 (555) 012-3456<br />
                hello@brsdiner.com
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
