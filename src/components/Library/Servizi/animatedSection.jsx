"use client"
import Image from "next/image";
import Paragraph from "../paragraph";
import CustomButton from "../customButton";
import Line1 from "./line1";
import Line2 from "./line2";
import Line3 from "./line3";
import { useEffect } from "react";
import { commonAnimations } from "@/helpers/animations";
import { parseSVG } from "svg-path-parser";
import { gsap } from "@/lib/gsap";

export default function AnimatedSection({page}){
    useEffect(() => {
        commonAnimations();
        
        //LINEA 1
        const line1Cont = document.getElementById('line-1-container');
        const line1 = document.getElementById('line-1');
        const plane1 = document.getElementById('plane-1');
        var d1 = line1.getAttribute('d');
        var coordinates1 = parseSVG(d1);
        var firstStep = coordinates1[0];
        plane1.style.left = `${firstStep.x}px`;
        plane1.style.top = `${firstStep.y}px`;

        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: line1Cont,
                start: 'top 40%',
                end: 'bottom 40%',  
                scrub: true,
                invalidateOnRefresh: true
            }
        });
        console.log(coordinates1);
        coordinates1.forEach((step, index) => {
            var x2 = (step.x2 < -80)?0:step.x2;
            if(step.x2){
                tml.to(plane1, {left: step.x1, top: step.y1, ease: 'none'})
                    .to(plane1, {left: x2, top: step.y2, ease: 'none'})
                    .to(plane1, {left: step.x, top: step.y, ease: 'none'});
            }else{
                tml.to(plane1, {left: step.x, top: step.y, ease: 'none'});
            }
        });

        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }
    })
    return <>
        <section className="mt-10 relative w-full boxed !pr-10">
            <div className="flex items-center justify-between gap-30 max-m:flex-col max-m:gap-8">
                <Paragraph className="flex-1 relative">{page.acf.paragrafo}</Paragraph>
                <div className="flex-1 relative">
                    <Image className="w-full h-auto z-1 relative show-on-scroll" src={page.acf.immagine_1.url} width={page.acf.immagine_1.width} height={page.acf.immagine_1.height} alt="step 1" />
                    <Line1 className="z-0 absolute left-13 bottom-5 translate-y-[100%] -translate-x-[100%]" />
                </div>
            </div>
            
            <div className="w-full relative flex items-center m:items-end max-m:flex-col-reverse max-m:gap-8 max-m:mt-25">
                <div className="pl-14 max-[1680px]:pl-8 max-l:pl-0 m:mt-11 relative inline-flex">
                    <Image className="z-1 relative show-on-scroll max-[1680px]:w-40" src={page.acf.immagine_2.url} width={page.acf.immagine_2.width} height={page.acf.immagine_2.height} alt="step 2" />
                    <Line2 className="absolute left-48 max-[1680px]:left-[50%] bottom-5 translate-y-[100%]" />
                </div>
                <div className="w-74 max-xl:w-60 max-l:w-[50%] flex flex-col items-center ml-auto m:translate-y-[50%] gap-5 max-m:w-full items-center">
                    <Paragraph className="font-bold uppercase pl-11 max-m:text-center">{page.acf.step}</Paragraph>
                    <Image className="relative z-1 show-on-scroll" src={page.acf.immagine_step.url} width={page.acf.immagine_step.width} height={page.acf.immagine_step.height} alt="epigrafe"/>
                </div> 
            </div>
            
            <div className="mt-15 mx-auto flex justify-center relative">
                <Image className="relative z-1 show-on-scroll max-[1680px]:w-[50%]" src={page.acf.immagine_3.url} width={page.acf.immagine_3.width} height={page.acf.immagine_3.height} alt="ultimo step" />
                <Line3 className="absolute left-[50%] bottom-3 translate-y-[100%]" />
            </div> 
        </section>
        <section className="w-full relative boxed flex flex-col items-center mt-21 mb-12">
            <Paragraph className="h2 text-[var(--primary)] text-center">{page.acf.paragrafo_finale}</Paragraph>
            <div className="relative flex items-center justify-center gap-12 mt-[45px]">
                <CustomButton className="!bg-[var(--primary)] !text-white" href={page.acf.pulsante_sx.url} target={page.acf.pulsante_sx.target}>{page.acf.pulsante_sx.title}</CustomButton>
                <CustomButton className="!bg-[var(--primary)] !text-white" href={page.acf.pulsante_dx.url} target={page.acf.pulsante_dx.target}>{page.acf.pulsante_dx.title}</CustomButton>
            </div>
        </section>
    </>
}