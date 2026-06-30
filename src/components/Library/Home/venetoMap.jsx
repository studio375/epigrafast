"use client"
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function VenetoMap({imgObject, ...props}){
    var ref = useRef(null);
    useEffect(() => {
        if(!ref.current) return;
        console.log(ref.current.children);
        //gsap.set(ref.current.children, {scale: 0});
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current, 
                start: 'top 50%',
                end: '+=200px',
                scrub: true
            }
        });
        tml.to(ref.current.children, {opacity: 1, duration: 1, stagger: 0.5, ease: 'none'});

        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }
    });
    return <div {...props}>
        <Image className="w-full h-auto show-on-scroll" src={imgObject.url} width={imgObject.width} height={imgObject.height} alt="" />
        <svg ref={ref} className="absolute left-[25px] bottom-2 w-[74%] h-auto overflow-hidden" width="485" height="422" viewBox="0 0 485 422" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-0 !origin-center" cx="393" cy="92" r="91" fill="#C19B39" fillOpacity="0.2" stroke="#C19B39" strokeWidth="2"/>
            <path className="opacity-0 !origin-center" d="M268.5 172C336.7 172 392 227.733 392 296.5C392 365.267 336.7 421 268.5 421C200.3 421 145 365.267 145 296.5C145 227.733 200.3 172 268.5 172Z" fill="#C19B39" fillOpacity="0.2" stroke="#C19B39" strokeWidth="2"/>
            <path className="opacity-0 !origin-center" d="M103.5 148C160.105 148 206 194.11 206 251C206 307.89 160.105 354 103.5 354C46.8954 354 1 307.89 1 251C1 194.11 46.8954 148 103.5 148Z" fill="#C19B39" fillOpacity="0.2" stroke="#C19B39" strokeWidth="2"/>
            <path className="opacity-0 !origin-center" d="M211.5 1C286.883 1 348 62.3336 348 138C348 213.666 286.883 275 211.5 275C136.117 275 75 213.666 75 138C75 62.3336 136.117 1 211.5 1Z" fill="#C19B39" fillOpacity="0.2" stroke="#C19B39" strokeWidth="2"/>
        </svg>
    </div>
}