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
import LineMobile from "./lineMobile";

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
    useEffect(() => {
        commonAnimations();
        
        //LINEA 1
        const line1Cont = document.getElementById('line-1-container');
        const line1 = (isMobile)?document.getElementById('line-1-mobile'):document.getElementById('line-1');
        const plane1 = document.getElementById('plane-1');
        var tml = followLine(line1Cont, plane1, line1, {
            start: `top ${isMobile?'45':'55'}%`,
            end: `bottom ${isMobile?'45':'55'}%`,  
        });

        //LINEA 2   
        const line2Cont = document.getElementById('line-2-container');
        const line2 = (isMobile)?document.getElementById('line-2-mobile'):document.getElementById('line-2');
        const camion2 = document.getElementById('camion-2');
        var tml2 = followLine(line2Cont, camion2, line2, {
            start: `top ${isMobile?'45':'55'}%`,
            end: `bottom ${isMobile?'45':'55'}%`,  
        }, {1:['x']});
        tml2.to(camion2, {opacity: 0, ease: 'none', duration: 0.5}, `-=${window.innerWidth > 1700?'1':'1'}`);
        if(!isMobile){
            var tmlRotate = gsap.timeline({
                scrollTrigger:{
                    trigger: camion2, 
                    start: 'top 30%',
                    scrub: true,
                    invalidateOnRefresh: true
                },
            });
            tmlRotate.to(camion2, {rotate: 10, ease: 'none'});
        }

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
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
            if(tml2){
                tml2.scrollTrigger?.kill();
                tml2.kill();
            }
            if(tmlRotate){
                tmlRotate.scrollTrigger?.kill();
                tmlRotate.kill();
            }
            
            tmlSlide.scrollTrigger?.kill();
            tmlSlide.kill();
        }

    }, [isMobile])
    return <div ref={ref} className="w-full flex flex-col mt-4 max-w-192">
        <div className="relative boxed ml-auto px-[75px] order-1 max-[1150px]:!mx-auto">
            <Line1 className="absolute right-[78%] top-[30%] z-1 max-[1150px]:top-[90%] max-[1150px]:right-[50%]" />
            <Image className="z-3 show-on-scroll max-xl:w-60 max-l:w-50" src={immagini[0].url} width={immagini[0].width} height={immagini[0].height} alt="" />
        </div>
        <div className="w-full order-2 flex justify-start boxed [1680px]:!px-32 [1150px]:!px-15 -mt-9 show-on-scroll max-[1150px]:mt-30 max-s:mt-25 max-[1150px]:justify-center">
            <SingleStep className="z-3" stepObj={page.acf.step[0]} />
        </div>
        <div id="slide-animation" className="relative order-3 boxed w-full flex justify-center flex-col items-center boxed z-3 min-h-60 opacity-0">
            {
                page.acf.animazione_slide.map((elem, index) => {
                    var moreClass = ''
                    if(index == 1)
                        moreClass = 'translate-y-[100%] opacity-0';
                    return <Image className={`w-55 max-w-[90vw] h-auto rounded-[10px] absolute left-[50%] translate-x-[-50%] ${moreClass}`} key={index} src={elem.url} width={elem.width} height={elem.height} alt="" />
                })
            }
        </div>
        <div className="relative order-4 mr-auto max-[1150px]:mx-auto boxed [1150px]:!px-30 mt-13 show-on-scroll z-1 max-[1150px]:order-5 max-[1150px]:mt-4">
            <Image className="z-1 relative" src={immagini[1].url} width={immagini[1].width} height={immagini[1].height} alt=""/>
            <Line2 className="absolute left-40 top-[calc(100%-110px)] z-0 max-[1400px]:top-[100%] max-[1150px]:left-[50%]" />
        </div>
        <div className="relative w-full order-5 flex justify-end boxed [1680px]:!px-22 [1150px]:!px-5 -mt-30 max-xl:-mt-15 max-[1400px]:-mt-8 max-s:-mt-14 z-1 max-[1150px]:order-4 max-[1150px]:pt-17 max-[1150px]:justify-center">
            {isMobile && <LineMobile className="absolute top-0 left-[50%] -translate-x-[50%]" />}
            <SingleStep stepObj={page.acf.step[1]} className="min-[1150px]:[&_img]:-ml-10 min-[1150px]:-mr-10 show-on-scroll" />
        </div>
        <div className="relative order-6 boxed flex justify-between items-end mt-18 [1680px]:!pl-32 xl:!pl-15 [1680px]:!pr-22 xl:!pr-15 z-1 show-on-scroll max-[1150px]:flex-col max-[1150px]:items-center max-[1150px]:mt-30 max-[1150px]:gap-4">
            <SingleStep stepObj={page.acf.step[2]} className="min-[1150px]:[&_img]:-ml-[45px]" />
            <div className="relative flex">
                <Image className="h-auto max-[1680px]:w-50 max-l:w-40 relative z-1" src={immagini[2].url} width={immagini[2].width} height={immagini[2].height} alt="" />
                <Line3 className="absolute z-0 right-[50%] top-[100%] max-xl:top-[90%] max-[1150px]:top-[100%] max-[1150px]:-translate-y-[50%] max-[1150px]:right-3" />
            </div>
        </div>
        <div className="boxed flex order-7 justify-between items-end mt-32 [1680px]:!pl-16 [1680px]:!pr-22 [1150px]:!px-10 z-1 show-on-scroll max-[1150px]:flex-col-reverse max-[1150px]:items-center max-[1150px]:mt-13 max-[1150px]:gap-2">
            <Image className="max-[1680px]:w-50 max-w-[100%]" src={immagini[3].url} width={immagini[3].width} height={immagini[3].height} alt="" />
            <SingleStep stepObj={page.acf.step[3]} className="[&_img]:-ml-[45px] max-l:w-40 [&_img]:max-l:-ml-3 [&_img]:max-[1150px]:ml-0 [&_img]:max-w-[90vw]" />
        </div>
    </div>
}