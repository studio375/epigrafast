"use client"
import Image from "next/image";
import Title from "../title";
import Paragraph from "../paragraph";
import { parseSVG, makeAbsolute } from "svg-path-parser";
import { useRef, useState } from "react";
import Arrow1 from "./arrow1";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Arrow2 from "./arrow2";
import { useGSAP } from "@gsap/react";
import { commonAnimations, followLine } from "@/helpers/animations";

export default function HomeAnimatedSection({page}){
    var steps = [
        page.acf.perche_epigrafast.step_1, 
        page.acf.perche_epigrafast.step_2, 
        page.acf.perche_epigrafast.step_3
    ];
    const ref = useRef(null);
    const [resolution, setResolution] = useState(1920);
    useGSAP(() => {
        if(window.innerWidth < 1025)
            setResolution(window.innerWidth);

        //step 1
        const step1Line = (window.innerWidth > 1024)?document.getElementById('line-step-1'):document.getElementById('line-step-1-mobile');
        const step1Plane = document.getElementById('plane-step-1')
        const step1Image = document.getElementById('image-step-1');
        const step1Cont = document.getElementById('step1-anim');
        //step2
        const step2Image = document.getElementById('image-step-2');
        const step2Camion = document.getElementById('camion-step-2');
        const step2Cont = document.getElementById('step2-anim');
        const step3Image = document.getElementById('image-step-3');
        const step2Line = (window.innerWidth > 1024)?document.getElementById('line-step-2'):document.getElementById('line-step-2-mobile');
        if(window.innerWidth > 1024){
            //PRIMA FASCIA
            var d1 = step1Line.getAttribute('d');
            var coordinates1 = parseSVG(d1);
            var firstStep = coordinates1[0];
            step1Plane.style.left = `${firstStep.x}px`;
            step1Plane.style.top = `${firstStep.y}px`;
            
            
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
        }else{
            followLine(step1Cont, step1Plane, step1Line);
            followLine(step2Cont, step2Camion, step2Line);
        }

        commonAnimations();

        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }

    }, [resolution]);
    return <section ref={ref} className="relative w-full mt-15 pt-12 pb-17 bg-[var(--secondary)] flex flex-col items-center">
        <div id="pin" className="w-[calc(100%-85px)] relative">
           <Title Tag="h2" className="h1 text-center text-[var(--primary)]">{page.acf.perche_epigrafast.titolo}</Title>
           <div className="flex items-center justify-between max-m:flex-col max-m:gap-20 max-m:mt-3">
                {
                    steps.map((elem, index) => {
                        return <div key={index} className="relative max-m:w-full flex justify-center">
                            <Image className={`${resolution > 1024?'opacity-0':'show-on-scroll'} h-auto max-[1680px]:w-[20vw] max-m:w-[70%] max-s:w-full`} id={`image-step-${index+1}`} src={elem.url} width={elem.width} height={elem.height} alt="passaggi affissioni" />
                            {(index == 0)&&<Arrow1 className="absolute left-[90%] top-[50%] -translate-y-[50%] max-m:top-[100%] max-m:left-[50%] max-m:translate-y-0 max-m:-translate-x-[50%]" />}
                            {(index == 1)&&<Arrow2 className="absolute left-[90%] top-[50%] max-m:top-[100%] max-m:left-[50%] max-m:-translate-x-[50%]" />}
                        </div>
                    })
                }
           </div>
        </div>
        <div className="relative flex flex-col items-center gap-4 boxed m:w-[50%] mx-auto mt-10 ">
            <Title Tag="h2" className=" show-on-scroll opacity-0 text-white text-center">{page.acf.perche_epigrafast.sottotitolo}</Title>
            <Paragraph className="show-on-scroll opacity-0 text-white text-center">{page.acf.perche_epigrafast.paragrafo}</Paragraph>
        </div>
    </section>
}