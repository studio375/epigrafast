"use client"
import Image from "next/image";
import SingleStep from "./singleStep";
import Line1 from "./line1";
import { useEffect, useRef, useState } from "react";
import { parseSVG } from "svg-path-parser";
import { gsap } from "@/lib/gsap";
import Line2 from "./line2";
import Line3 from "./line3";
import { useGSAP } from "@gsap/react";
import { commonAnimations, followLine } from "@/helpers/animations";

export default function ProductAnimatedSection({page}){
    const immagini = page.acf.immagini_animazione;
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth <= 1150);
        window.addEventListener('resize', () => {
           setIsMobile(window.innerWidth <= 1150); 
        })
    }, []);
    useGSAP(() => {
        commonAnimations();
        
        //LINEA 1
        const line1Cont = document.getElementById('line-1-container');
        const line1 = (isMobile)?document.getElementById('line-1-mobile'):document.getElementById('line-1');
        const plane1 = document.getElementById('plane-1');
        followLine(line1Cont, plane1, line1, {
            start: 'top 55%',
            end: 'bottom 55%',  
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
        //provare a fare il return di tml nella funzione followLine e vedere se si puo accodare
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
        
        return () => {
            tml.scrollTrigger?.kill();
            tml.kill();
            tml2.scrollTrigger?.kill();
            tml2.kill();
            tmlSlide.scrollTrigger?.kill();
            tmlSlide.kill();
        }

    }, [isMobile])
    return <div ref={ref} className="w-full flex flex-col mt-4">
        <div className="relative boxed ml-auto px-[75px] order-1 max-[1150px]:!mx-auto">
            <Line1 className="absolute right-[78%] top-[30%] z-1 max-[1150px]:top-[90%] max-[1150px]:right-[50%]" />
            <Image className="z-3 show-on-scroll max-xl:w-60 max-l:w-50" src={immagini[0].url} width={immagini[0].width} height={immagini[0].height} alt="" />
        </div>
        <div className="w-full order-2 flex justify-start boxed [1680px]:!px-32 [1150px]:!px-15 -mt-9 show-on-scroll max-[1150px]:mt-25 max-[1150px]:justify-center">
            <SingleStep stepObj={page.acf.step[0]} />
        </div>
        <div id="slide-animation" className="order-3 w-full flex justify-center flex-col items-center boxed z-3 min-h-60 opacity-0">
            {
                page.acf.animazione_slide.map((elem, index) => {
                    var moreClass = ''
                    if(index == 1)
                        moreClass = 'translate-y-[100%] opacity-0';
                    return <Image className={`w-55 h-auto rounded-[10px] absolute left-[50%] translate-x-[-50%] ${moreClass}`} key={index} src={elem.url} width={elem.width} height={elem.height} alt="" />
                })
            }
        </div>
        <div className="relative order-4 mr-auto max-[1150px]:mx-auto boxed [1150px]:!px-30 mt-13 show-on-scroll z-1 max-[1150px]:order-5 max-[1150px]:mt-4">
            <Image className="z-1 relative" src={immagini[1].url} width={immagini[1].width} height={immagini[1].height} alt=""/>
            <Line2 className="absolute left-40 top-[calc(100%-110px)] z-0 max-[1400px]:top-[100%]" />
        </div>
        <div className="w-full order-5 flex justify-end boxed [1680px]:!px-22 [1150px]:!px-5 -mt-30 max-xl:-mt-15 max-[1400px]:mt-0 show-on-scroll z-1 max-[1150px]:order-4 max-[1150px]:mt-17 max-[1150px]:justify-center">
            <SingleStep stepObj={page.acf.step[1]} className="[&_img]:-ml-10" />
        </div>
        <div className="relative order-6 boxed flex justify-between items-end mt-18 [1680px]:!pl-32 xl:!pl-15 [1680px]:!pr-22 xl:!pr-15 z-1 show-on-scroll max-[1150px]:flex-col max-[1150px]:items-center max-[1150px]:mt-30">
            <SingleStep stepObj={page.acf.step[2]} className="[&_img]:-ml-[45px]" />
            <div className="relative flex">
                <Image className="h-auto max-[1680px]:w-50 max-l:w-40" src={immagini[2].url} width={immagini[2].width} height={immagini[2].height} alt="" />
                <Line3 className="absolute right-[50%] top-[100%] max-xl:top-[90%]" />
            </div>
        </div>
        <div className="boxed flex order-7 justify-between items-end mt-32 [1680px]:!pl-16 [1680px]:!pr-22 [1150px]:!px-10 z-1 show-on-scroll max-[1150px]:flex-col max-[1150px]:items-center max-[1150px]:mt-13">
            <Image className="max-[1680px]:w-50" src={immagini[3].url} width={immagini[3].width} height={immagini[3].height} alt="" />
            <SingleStep stepObj={page.acf.step[3]} className="[&_img]:-ml-[45px] max-l:w-40 [&_img]:max-l:-ml-3" />
        </div>
    </div>
}