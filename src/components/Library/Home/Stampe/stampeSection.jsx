"use client"
import Image from "next/image";
import Title from "../../title";
import Paragraph from "../../paragraph";
import Arrow from "./arrow";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { commonAnimations } from "@/helpers/animations";

export default function StampeSection({page}){
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 1025);
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1025);
        })
    }, []);
    useEffect(() => {
        if(!ref.current) return;
        commonAnimations();
        if(!isMobile){
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
        }
        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }
    }, [isMobile]);
    return <section ref={ref} className="relative w-full bg-[#F7F0E3] pt-12 pb-6 flex flex-col">
        <div className="flex flex-col items-center boxed w-full">
            <Title Tag="h3" className="text-[var(--primary)] font-bold uppercase text-center">Stampepigrafast</Title>
            <Title Tag="h2" className="h1 text-[var(--primary)] text-center">{page.acf.titolo_stampepigrafast}</Title>
        </div>
        <div className="boxed relative [1680px]:!pl-20 l:!pl-10 m:!pr-[45px] mt-5 max-m:flex max-m:flex-col">
            <Paragraph className="text-center absolute bottom-8 max-xl:-bottom-3 m:left-[50%] m:-translate-x-[50%] max-m:relative max-m:bottom-0 max-m:mx-auto max-m:w-full max-m:order-1">{page.acf.paragrafo_stampepigrafast}</Paragraph>
            <div className="relative flex justify-between items-start max-m:mt-5 max-m:flex-col max-m:order-3">
                <Image id="image-1" className={`m:-translate-y-[40%] z-1 ${isMobile?'show-on-scroll':'opacity-0'} max-xl:w-20 max-s:w-17 max-xs:w-11`} src={page.acf.immagine_sx_stampe.url} width={page.acf.immagine_sx_stampe.width} height={page.acf.immagine_sx_stampe.height} alt="graffetta" />
                <Arrow className="absolute left-40 top-0 z-0 max-[1680px]:left-18 max-xl:w-[60vw] max-l:-top-5 max-m:left-13 max-m:w-auto max-m:top-20 max-s:top-10 max-s:left-5" />
                <Image id="image-2" className={`z-1 ${isMobile?'show-on-scroll':'opacity-0'} max-xl:w-30 max-l:w-25 max-m:mt-20 max-m:w-[50%] max-m:mx-auto max-s:w-full`} src={page.acf.immagine_dx_stampe.url} width={page.acf.immagine_dx_stampe.width} height={page.acf.immagine_dx_stampe.height} alt="stampe epigrafast" />
            </div>
            <Image id="image-3" className={`-mt-23 ml-7 ${isMobile?'show-on-scroll':'opacity-0'} max-xl:w-35 max-xl:-mt-15 max-l:w-25 max-l:-mt-10 max-m:order-2 max-m:mt-10 max-m:ml-auto max-m:-mb-25 max-[400px]:w-19`} src={page.acf.immagine_sotto_stampe.url} width={page.acf.immagine_sotto_stampe.width} height={page.acf.immagine_sotto_stampe.height} alt="buste" />
        </div>  
    </section>
}