"use client"
import Image from "next/image";
import Title from "../title";
import Paragraph from "../paragraph";
import { parseSVG, makeAbsolute } from "svg-path-parser";
import { useRef } from "react";
import Arrow1 from "./arrow1";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Arrow2 from "./arrow2";
import { useGSAP } from "@gsap/react";

export default function HomeAnimatedSection({page}){
    var steps = [
        page.acf.perche_epigrafast.step_1, 
        page.acf.perche_epigrafast.step_2, 
        page.acf.perche_epigrafast.step_3
    ];
    const ref = useRef(null);
    useGSAP(() => {

        //PRIMA FASCIA
        //step 1
        const step1Line = document.getElementById('line-step-1');
        const step1Plane = document.getElementById('plane-step-1');
        const step1Image = document.getElementById('image-step-1');
        const step1Cont = document.getElementById('step1-anim');
        var d1 = step1Line.getAttribute('d');
        var coordinates1 = parseSVG(d1);
        var firstStep = coordinates1[0];
        step1Plane.style.left = `${firstStep.x}px`;
        step1Plane.style.top = `${firstStep.y}px`;

        //step2
        const step2Image = document.getElementById('image-step-2');
        const step2Camion = document.getElementById('camion-step-2');
        const step2Cont = document.getElementById('step2-anim');
        const step3Image = document.getElementById('image-step-3');

        
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: document.getElementById('pin'),
                pin: true,
                scrub: true,
                start: 'top 20%',
                end: '+=1000px',
                pinSpacing: true,
            }
        });

        tml.to(step1Image, {opacity: 1, duration: 2, ease: 'none'})
           .to(step1Line, {opacity: 1, duration: 2, ease: 'none'})
           .to(step1Plane, {opacity: 1, duration: 2, ease: 'none'}, '<');
        var totalSteps = coordinates1.length;
        coordinates1.forEach((step, index) => {
            var progress = 100 - (((index+1) / totalSteps) * 100);
            if(step.x2){
                tml.to(step1Plane, {left: step.x2, top: step.y2, ease: 'none'})
                    .to(step1Plane, {left: step.x, top: step.y, ease: 'none'})
                    .to(step1Cont.querySelector('.draw-line'), {drawSVG: `${progress}%`, ease: 'none'}, '<');
            }else{
                tml.to(step1Plane, {left: step.x, top: step.y, ease: 'none'})
                   .to(step1Cont.querySelector('.draw-line'), {drawSVG: `${progress}%`, ease: 'none'}, '<');
            }
        });
        tml.to(step2Image, {opacity: 1, duration: 2, ease: 'none'})
           .to(step2Camion, {opacity: 1, duration: 2, right: 0, ease: 'none'})
           .to(step2Cont.querySelector('.draw-line'), {drawSVG: '0%', ease: 'none', duration: 2}, '<')
           .to(step3Image, {opacity: 1, duration: 2, ease: 'none'});
        //END PRIMA FASCIA

        //COMMONS
        var tml2 = gsap.timeline();
        gsap.utils.toArray('.show-on-scroll').forEach(elem => {
            tml2 = gsap.timeline({
                scrollTrigger: {
                    trigger: elem, 
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: true,
                }
            });
            tml2.to(elem, {opacity: 1, ease: 'none'});
        })

        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
            if(tml2){
                tml2.scrollTrigger?.kill();
                tml2.kill();
            }
        }

    }, []);
    return <section ref={ref} className="relative w-full mt-15 pt-12 pb-17 bg-[var(--secondary)] flex flex-col items-center">
        <div id="pin" className="w-[calc(100%-85px)] relative">
           <Title Tag="h2" className="h1 text-center text-[var(--primary)]">{page.acf.perche_epigrafast.titolo}</Title>
           <div className="flex items-center justify-between">
                {
                    steps.map((elem, index) => {
                        return <Image id={`image-step-${index+1}`} className="opacity-0" key={index} src={elem.url} width={elem.width} height={elem.height} alt="passaggi affissioni" />
                    })
                }
                <Arrow1 />
                <Arrow2 />
           </div>
        </div>
        <div className="relative flex flex-col items-center gap-4 boxed w-[50%] mx-auto mt-10 ">
            {/* <Arrow3 /> */}
            <Title Tag="h2" className=" show-on-scroll opacity-0 text-white text-center">{page.acf.perche_epigrafast.sottotitolo}</Title>
            <Paragraph className="show-on-scroll opacity-0 text-white text-center">{page.acf.perche_epigrafast.paragrafo}</Paragraph>
        </div>
        {/* <div className="w-full boxed relative flex items-center gap-40 mt-16">
            <div className="flex-1 relative px-2 show-on-scroll opacity-0 ">
            <Image className="w-full h-auto" src={page.acf.perche_epigrafast.step_4.url} width={page.acf.perche_epigrafast.step_4.width} height={page.acf.perche_epigrafast.step_4.height} alt="" />
            </div>
            <div className="relative flex flex-col items-start gap-4 flex-1 show-on-scroll opacity-0 ">
            <Title Tag="h2" className="text-white">{page.acf.perche_epigrafast.sottotitolo_2}</Title>
            <Paragraph className="text-white">{page.acf.perche_epigrafast.paragrafo_2}</Paragraph>
            </div>
        </div> */}
    </section>
}