'use client'

import { animate } from 'motion';
import Image from 'next/image';
import williamMobile from '@/public/images/william-mobile.webp';
import { useEffect, useRef } from 'react';

export default function Hero() {

    const imageRef = useRef(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const items = [h1Ref.current, spanRef.current, pRef.current].filter((el): el is HTMLElement => el !== null);
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
        <section className="mx-3">
            <div className="flex flex-col gap-3 items-center">
                <div ref={imageRef}>
                    <Image
                        src={williamMobile}
                        alt="Photo de William Salembien"
                        className="mb-3 rounded-xl shadow-2xl shadow-foreground/15 ring-4 ring-foreground w-35"
                    />
                </div>
                <h1 ref={h1Ref} className="text-4xl font-bold text-center">William Salembien</h1>
                <span ref={spanRef} className="text-xl font-semibold inline-block text-center"> Freelance Full-stack (Symfony, Next.js, Tailwind)</span>
                <p ref={pRef} className="text-lg text-center mt-3">
                    Je conçois des applications web fiables, performante et respectant les bonnes pratiques du web. Je porte également mon attention sur l&apos;architecture, à la qualité du code et à l&apos;expérience utilisateur.
                </p>
                <div className="grid grid-cols-4 gap-3 w-full">
                    <a href="#project-section" className="col-span-2 form-button py-3 px-5">Mes projets</a>
                    <a href="#contact-me" className="col-span-2 form-button py-3 px-5">Me contacter</a>
                    <a href="#contact-me" className="col-span-4 form-button py-3 px-5">Mon CV</a>
                </div>
                <div className="grid grid-cols-4 gap-3 w-70">
                    <a className="col-span-2 form-button py-3" href="https://www.linkedin.com/in/william-salembien/" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
                    <a className="col-span-2 form-button py-3" href="https://github.com/VinylTheHooligan" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        </section>
    );
}