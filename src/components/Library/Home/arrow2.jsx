"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Arrow2({...props}){
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth <= 1024);
    }, [])
    return <div id="step2-anim" {...props}> 
        <Image id="camion-step-2" className={`absolute right-[100%] translate-y-[-100%] ${isMobile?'show-on-scroll':'opacity-0'} max-xl:w-15 h-auto max-l:w-10 max-m:min-w-17 max-m:rotate-[90deg] max-m:-translate-x-[20%] max-s:hidden`} src={'/camion.svg'} width={214} height={100} alt="furgone"/>
        <svg className="max-xl:w-30 max-l:w-23 hidden m:block" xmlns="http://www.w3.org/2000/svg" width="415" height="4" viewBox="0 0 415 4" fill="none">
            <path id="line-step-2" d="M2 2H412.5" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 15"/>
            <path className="draw-line no-common rotate-[180deg] translate-x-[100%] translate-y-[4px]" d="M2 2H412.5" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>  
        <svg className="m:hidden" xmlns="http://www.w3.org/2000/svg" width="2" height="333" viewBox="0 0 2 333" fill="none">
            <path id="line-step-2-mobile" d="M1 1V332" stroke="#C19B39" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 8"/>
            <path className="draw-line rotate-[180deg] origin-center" d="M1 1V332" stroke="#111111" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </div>
}