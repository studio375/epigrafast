"use client"
import Image from "next/image";
import Title from "../../title";
import Paragraph from "../../paragraph";
import Arrow from "./arrow";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function StampeSection({page}){
    const ref = useRef(null);
    useEffect(() => {
        if(!ref.current) return;
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 0',
                end: '+=1000px',
                pin: true,
                scrub: true
            }
        });
        const img1 = document.getElementById('image-1');
        const img2 = document.getElementById('image-2');
        const img3 = document.getElementById('image-3');
        const line = document.getElementById('draw-line');
        tml.to(img1, {opacity: 1, duration: 1, ease: 'none'})
           .to(line, {drawSVG: '0%', ease: 'none'})
           .to(img2, {opacity: 1, duration: 1, ease: 'none'})
           .to(img3, {opacity: 1, duration: 1, ease: 'none'})
    }, []);
    return <section ref={ref} className="relative w-full bg-[#F7F0E3] pt-12 pb-6">
        <div className="flex flex-col items-center boxed w-full">
            <Title Tag="h3" className="text-[var(--primary)] font-bold uppercase text-center">Stampepigrafast</Title>
            <Title Tag="h2" className="h1 text-[var(--primary)] text-center">{page.acf.titolo_stampepigrafast}</Title>
        </div>
        <div className="relative flex justify-between items-start pl-20 pr-[45px] mt-5">
            <Image id="image-1" className="-translate-y-[40%] z-1 opacity-0" src={page.acf.immagine_sx_stampe.url} width={page.acf.immagine_sx_stampe.width} height={page.acf.immagine_sx_stampe.height} alt="graffetta" />
            <Arrow />
            <Image id="image-2" className="z-1 opacity-0" src={page.acf.immagine_dx_stampe.url} width={page.acf.immagine_dx_stampe.width} height={page.acf.immagine_dx_stampe.height} alt="stampe epigrafast" />
            <Paragraph className="text-center absolute bottom-8 left-[50%] -translate-x-[50%]">{page.acf.paragrafo_stampepigrafast}</Paragraph>
        </div>  
        <Image id="image-3" className="-mt-23 ml-7 opacity-0" src={page.acf.immagine_sotto_stampe.url} width={page.acf.immagine_sotto_stampe.width} height={page.acf.immagine_sotto_stampe.height} alt="buste" />
    </section>
}