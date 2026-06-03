"use client"
import { useEffect, useRef, useState } from "react";
import Title from "./title";
import { gsap } from "@/lib/gsap";

export default function ScrollGallery({title,slides, ...props}){
    const ref = useRef(null);
    const refGallery = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        if(!ref.current || !refGallery.current) return;
        var slidesArray = Array.from(refGallery.current.querySelectorAll('.single-slide')); 
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current, 
                start: 'top 0',
                scrub:true,
                pin: true,  
                end: `+=${(slidesArray.length - 1) * 600}px`,
            }
        });
        slidesArray.forEach((element, index) => {
            tml.to(element, {y: 0, duration: 1, ease:"none"})
               .add(() => setActiveIndex(index));
        });
        return () => tml.kill();
    }, []);
    return <section {...props} className={`h-screen w-full pt-15 ${props.className || ''}`} ref={ref} >
        {title && <Title className="h1 text-[var(--primary)] text-center mb-6">{title}</Title>}
        <div className="relative">
            <div ref={refGallery} className="relative w-full">
                {
                    slides.map((elem, index) => {
                        return <div className={`single-slide absolute [&:first-child]:relative w-full top-0 left-0 translate-y-[150%] [&:first-child]:translate-y-0`} key={index}>{elem}</div>
                    })
                }
            </div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2">
                {
                    slides.map((elem, index) => {
                        return <div key={index} className={`w-[12px] h-[12px] rounded-full border-[1px] border-[var(--primary)] ${activeIndex === index ? 'bg-[var(--primary)]' : 'bg-white'}`} />
                    })
                }
            </div>
        </div>
    </section>
}