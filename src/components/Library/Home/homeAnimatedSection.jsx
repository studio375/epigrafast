"use client"
import Image from "next/image";
import Title from "../title";
import Paragraph from "../paragraph";
import { parseSVG, makeAbsolute } from "svg-path-parser";
import { useEffect, useRef } from "react";
import Arrow1 from "./arrow1";
import { gsap } from "@/lib/gsap";
import Arrow2 from "./arrow2";
import Arrow3 from "./arrow3";


export default function HomeAnimatedSection({page}){
    var steps = [
        page.acf.perche_epigrafast.step_1, 
        page.acf.perche_epigrafast.step_2, 
        page.acf.perche_epigrafast.step_3
    ];
    const ref = useRef(null);
    useEffect(() => {

        //PRIMA FASCIA
        //step 1
        const step1Line = document.getElementById('line-step-1');
        const step1Plane = document.getElementById('plane-step-1');
        const step1Image = document.getElementById('image-step-1');
        var d1 = step1Line.getAttribute('d');
        var coordinates1 = parseSVG(d1);
        var firstStep = coordinates1[0];
        step1Plane.style.left = `${firstStep.x}px`;
        step1Plane.style.top = `${firstStep.y}px`;

        //step2
        const step2Image = document.getElementById('image-step-2');
        const step2Line = document.getElementById('line-step-2');
        const step2Camion = document.getElementById('camion-step-2');
        // var d2 = step2Line.getAttribute('d');
        // var coordinates2 = parseSVG(d2);

        //step 3
        const step3Image = document.getElementById('image-step-3');

        
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                pin: true,
                scrub: true,
                start: 'top 0%',
                end: '+=1000px',
            }
        });

        tml.to(step1Image, {opacity: 1, duration: 2, ease: 'none'})
           .to(step1Line, {opacity: 1, duration: 2, ease: 'none'})
           .to(step1Plane, {opacity: 1, duration: 2, ease: 'none'}, '<');
        coordinates1.forEach(step => {
            if(step.x2){
                tml.to(step1Plane, {left: step.x2, top: step.y2, ease: 'none'})
                    .to(step1Plane, {left: step.x, top: step.y, ease: 'none'});
            }else{
                tml.to(step1Plane, {left: step.x, top: step.y, ease: 'none'});
            }
        });
        tml.to(step2Image, {opacity: 1, duration: 2, ease: 'none'})
           .to(step2Camion, {opacity: 1, duration: 2, right: 0, ease: 'none'})
           .to(step2Line, {opacity: 1, duration: 2, ease: 'none'}, '<')
           .to(step3Image, {opacity: 1, duration: 2, ease: 'none'});
        //END PRIMA FASCIA

        //ULTIMA FRECCIA
        const lastLine = document.getElementById('last-line');
        const lastPlane = document.getElementById('last-plane');
        var d2 = lastLine.getAttribute('d');
        var coordinates2 = parseSVG(d2);
        var firstStep = coordinates2[0];
        lastPlane.style.left = `${firstStep.x}px`;
        lastPlane.style.top = `${firstStep.y}px`;
        var tml2 = gsap.timeline({
            scrollTrigger: {
                trigger: lastLine,
                start: 'top 30%',
                scrub: true,
                markers: true
            }
        });
        tml2.to(lastPlane, {opacity: 1, duration: 2, ease: 'none'})
            .to(lastLine, {opacity: 1, duration: 2, ease: 'none'}, '<');
        coordinates2.forEach(step => {
            if(step.x2){
                tml2.to(lastPlane, {left: step.x2, top: step.y2, ease: 'none'})
                    .to(lastPlane, {left: step.x, top: step.y, ease: 'none'});
            }else{
                tml2.to(lastPlane, {left: step.x, top: step.y, ease: 'none'});
            }
        });


    }, []);
    return <section ref={ref} className="relative w-full mt-15 pt-12 pb-17 bg-[var(--secondary)] flex flex-col items-center">
        <Title Tag="h2" className="h1 text-center text-[var(--primary)]">{page.acf.perche_epigrafast.titolo}</Title>
        <div className="h-40 w-[calc(100%-85px)] relative flex items-center justify-between">
           {
            steps.map((elem, index) => {
                return <Image id={`image-step-${index+1}`} className="opacity-0" key={index} src={elem.url} width={elem.width} height={elem.height} alt="passaggi affissioni" />
            })
           }
           <Arrow1 />
           <Arrow2 />
        </div>
        <Arrow3 />
        <div className="relative flex flex-col items-start gap-4 boxed w-[50%] mr-auto mt-10">
            <Title Tag="h2" className="text-white">{page.acf.perche_epigrafast.sottotitolo}</Title>
            <Paragraph className="text-white">{page.acf.perche_epigrafast.paragrafo}</Paragraph>
        </div>
        <div className="w-full boxed relative flex items-center gap-40 mt-16">
            <div className="flex-1 relative px-2">
            <Image className="w-full h-auto" src={page.acf.perche_epigrafast.step_4.url} width={page.acf.perche_epigrafast.step_4.width} height={page.acf.perche_epigrafast.step_4.height} alt="" />
            </div>
            <div className="relative flex flex-col items-start gap-4 flex-1">
            <Title Tag="h2" className="text-white">{page.acf.perche_epigrafast.sottotitolo_2}</Title>
            <Paragraph className="text-white">{page.acf.perche_epigrafast.paragrafo_2}</Paragraph>
            </div>
        </div>
    </section>
}