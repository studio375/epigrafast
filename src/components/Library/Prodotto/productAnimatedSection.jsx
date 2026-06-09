"use client"
import Image from "next/image";
import SingleStep from "./singleStep";
import Line1 from "./line1";
import { useEffect, useRef } from "react";
import { parseSVG } from "svg-path-parser";
import { gsap } from "@/lib/gsap";
import Line2 from "./line2";
import Line3 from "./line3";
import { useGSAP } from "@gsap/react";

export default function ProductAnimatedSection({page}){
    const immagini = page.acf.immagini_animazione;
    const ref = useRef(null);
    useGSAP(() => {

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
                start: 'top 55%',
                end: 'bottom 55%',  
                scrub: true,
                invalidateOnRefresh: true
            }
        });
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


        //LINEA 2   
        const line2Cont = document.getElementById('line-2-container');
        const line2 = document.getElementById('line-2');
        const camion2 = document.getElementById('camion-2');
        var d2 = line2.getAttribute('d');
        var coordinates2 = parseSVG(d2);
        var firstStep = coordinates2[0];
        camion2.style.left = `${firstStep.x}px`;
        camion2.style.top = `${firstStep.y}px`;


        var tml2 = gsap.timeline({
            scrollTrigger: {
                trigger: line2Cont,
                start: 'top 55%',
                end: 'bottom 55%',  
                scrub: true,
                invalidateOnRefresh: true
            }
        });
        coordinates2.forEach((step, index) => {
            if(step.x2){
                tml2.to(camion2, {left: step.x1, top: step.y1, ease: 'none'})
                    .to(camion2, {left: step.x2, top: step.y2, ease: 'none'})
                    .to(camion2, {left: step.x, top: step.y, ease: 'none'});
            }else{
                tml2.to(camion2, {left: step.x, top: step.y, ease: 'none'});
            }
        });
        tml2.to(camion2, {opacity: 0}, '3.4');
        gsap.to(camion2, {
            scrollTrigger:{
                trigger: camion2, 
                start: 'top 30%',
                scrub: true,
                invalidateOnRefresh: true
            },
            rotate: 10, ease: 'none'
        });


        //SLIDE ANIMATION
        const slideCont = document.getElementById('slide-animation');
        var tmlSlide = gsap.timeline({
            scrollTrigger: {
                trigger: slideCont,
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: true,
                invalidateOnRefresh: true
            }
        });
        tmlSlide.to(slideCont, {opacity: 1, ease: 'none'})
                .to(slideCont.querySelectorAll('img')[0], {scale: 0.8, opacity: 0.8, y: -100, webkitFilter:"blur(5px)"})
                .to(slideCont.querySelectorAll('img')[1], {y: 0, opacity: 1}, '<');
        
        //COMMON
        gsap.utils.toArray('.show-on-scroll').forEach(elem => {
            var tml3 = gsap.timeline({
                scrollTrigger: {
                    trigger: elem, 
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
            tml3.to(elem, {opacity: 1, ease: 'none'});
        })

        gsap.utils.toArray('.draw-line').forEach(elem => {
            gsap.to(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 40%',
                    end: 'bottom 40%',
                    scrub: true,
                    invalidateOnRefresh: true
                },
                drawSVG: '0%', ease: 'none'
            });
        })
        
        return () => {
            tml.scrollTrigger?.kill();
            tml.kill();
            tml2.scrollTrigger?.kill();
            tml2.kill();
            tmlSlide.scrollTrigger?.kill();
            tmlSlide.kill();
        }

    }, [])
    return <div ref={ref} className="w-full flex flex-col mt-4">
        <div className="relative ml-auto px-[75px]">
            <Line1 />
            <Image className="z-3 show-on-scroll" src={immagini[0].url} width={immagini[0].width} height={immagini[0].height} alt="" />
        </div>
        <div className="w-full flex justify-start px-32 -mt-9 show-on-scroll">
            <SingleStep stepObj={page.acf.step[0]} />
        </div>
        <div id="slide-animation" className="w-full flex justify-center flex-col items-center boxed z-3 min-h-60 opacity-0">
            {
                page.acf.animazione_slide.map((elem, index) => {
                    var moreClass = ''
                    if(index == 1)
                        moreClass = 'translate-y-[100%] opacity-0';
                    return <Image className={`w-55 h-auto rounded-[10px] absolute left-[50%] translate-x-[-50%] ${moreClass}`} key={index} src={elem.url} width={elem.width} height={elem.height} alt="" />
                })
            }
        </div>
        <div className="relative mr-auto boxed px-30 mt-13 show-on-scroll z-1">
            <Image className="z-1 relative" src={immagini[1].url} width={immagini[1].width} height={immagini[1].height} alt=""/>
            <Line2 />
        </div>
        <div className="w-full flex justify-end px-22 -mt-30 show-on-scroll z-1">
            <SingleStep stepObj={page.acf.step[1]} className="[&_img]:-ml-10" />
        </div>
        <div className="flex justify-between items-end mt-18 pl-32 pr-22 z-1 show-on-scroll">
            <SingleStep stepObj={page.acf.step[2]} className="[&_img]:-ml-[45px]" />
            <div className="relative flex">
                <Image src={immagini[2].url} width={immagini[2].width} height={immagini[2].height} alt="" />
                <Line3 />
            </div>
        </div>
        <div className="flex justify-between items-end mt-32 pl-16 pr-22 z-1 show-on-scroll">
            <Image src={immagini[3].url} width={immagini[3].width} height={immagini[3].height} alt="" />
            <SingleStep stepObj={page.acf.step[3]} className="[&_img]:-ml-[45px]" />
        </div>
    </div>
}