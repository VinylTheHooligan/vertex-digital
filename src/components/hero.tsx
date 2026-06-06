'use client'

import { animate } from 'motion';
import Image from 'next/image';
import williamMobile from '@/public/images/william-mobile.webp';
import { useEffect, useRef } from 'react';

export default function hero() {

    const h1Ref = useRef<HTMLHeadingElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const items = [h1Ref.current, spanRef.current, pRef.current].filter((el): el is HTMLElement => el !== null);

        items.forEach((el, i) => {
            animate(
                el,
                { opacity: [0, 1], y: [40, 0] } as any,
                { duration: 0.6, delay: i * 0.15, easing: "ease-out" } as any,
            );
        });
    }, [])

    return (
        <div className="mx-3">
            <div>

            </div>
            <div className="flex flex-col gap-3 items-center">
                <Image 
                    src={williamMobile}
                    alt=""
                    className="mb-2 rounded-xl shadow-2xl shadow-foreground/15"
                />
                <h1 ref={h1Ref} className="opacity-0 text-4xl font-bold text-center">William Salembien</h1>
                <span ref={spanRef} className="opacity-0 text-lg font-semibold inline-block text-center"> Freelance Software Engineer - Full‑stack Web (Symfony, Next.js, Tailwind)</span>
                <p ref={pRef} className="opacity-0 text-lg text-center mt-3">
                    Software Engineer full‑stack, spécialisé en Symfony, Next.js et Tailwind. Je conçois des applications web fiables, performante et respectant les bonnes pratiques du web. Je porte également mon attention sur l’architecture, à la qualité du code et à l’expérience utilisateur.
                </p>
            </div>
        </div>
    );
}