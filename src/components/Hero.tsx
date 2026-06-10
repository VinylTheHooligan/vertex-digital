'use client'

import { animate } from 'motion';
import Image from 'next/image';
import williamMobile from '@/public/images/william-mobile.webp';
import william from '@/public/images/william.webp';
import { useEffect, useRef } from 'react';

export default function Hero() {

    const imageRef = useRef(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = [h1Ref.current, spanRef.current, pRef.current, btnRef.current].filter((el): el is HTMLElement => el !== null);
        const image = imageRef.current;

        if (image) {
            animate(
                image,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"] } as any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { duration: 0.6, easing: "ease-out" } as any,
            )
        }

        items.forEach((el, i) => {
            animate(
                el,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { opacity: [0, 1], x: [40, 0] } as any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { duration: 0.6, delay: i * 0.15, easing: "ease-out" } as any,
            );
        });
    }, [])

    return (
        <section className="flex flex-col items-center mx-3 md:mx-10 md:mt-5 lg:mt-10">
            <div className="grid grid-cols-1 gap-3 items-center md:w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:flex-row md:gap-10 xl:grid-cols-8">
                    <div className="flex justify-center xl:hidden" ref={imageRef}>
                        <Image
                            src={williamMobile}
                            alt="Photo de William Salembien version mobile"
                            className="mb-3 rounded-xl shadow-2xl shadow-foreground/15 ring-4 ring-foreground w-35 md:w-70 lg:w-90"
                            fetchPriority="high"
                            loading="lazy"
                        />
                    </div>
                    <div className="hidden xl:flex justify-center xl:col-start-2 xl:col-span-2" ref={imageRef}>
                        <Image
                            src={william}
                            alt="Photo de William Salembien"
                            className="mb-3 rounded-xl shadow-2xl shadow-foreground/15 ring-4 ring-foreground w-35 md:w-70 lg:w-90"
                            fetchPriority="high"
                            loading="lazy"
                        />
                    </div>
                    <div className="col-span-2 flex flex-col items-center md:items-start xl:col-span-4">
                        <div className="flex flex-col gap-3 text-center">
                            <h1 ref={h1Ref} className="text-4xl font-bold text-center md:text-start">William Salembien</h1>
                            <span ref={spanRef} className="text-xl font-semibold inline-block text-center md:text-start"> Freelance Full-stack (Symfony, Next.js, Tailwind)</span>
                            <p ref={pRef} className="text-lg text-center mt-3 md:text-start">
                                Je conçois des applications web fiables, performante et respectant les bonnes pratiques du web. Je porte également mon attention sur l&apos;architecture, à la qualité du code et à l&apos;expérience utilisateur.
                            </p>
                        </div>
                        <div ref={btnRef} className="flex flex-col items-center gap-3 w-full">
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <a href="#project-section" className="form-button py-3 px-5">Mes projets</a>
                                <a href="#contact-me" className="form-button py-3 px-5">Me contacter</a>
                                <a href="/documents/cv.pdf" className="col-span-2 form-button py-3 px-5"
                                download>Mon CV</a>
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-70">
                                <a className="form-button py-3" href="https://www.linkedin.com/in/william-salembien/" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
                                <a className="form-button py-3" href="https://github.com/VinylTheHooligan" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}