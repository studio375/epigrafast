import Image from "next/image";
import { useEffect, useState } from "react";

export default function Arrow1({...props}){
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth <= 1024);
    }, [])
    return <div id="step1-anim" {...props}>
        <Image id="plane-step-1" className={`absolute translate-y-[-50%] translate-x-[-50%] ${isMobile?'show-on-scroll':'opacity-0'} min-xl:-translate-x-[70%] min-xl:-translate-y-[70%] min-xl:min-w-13 max-xl:w-11 h-auto max-xl:translate-x-[-100%] max-l:w-8 max-l:translate-x-[-150%] max-m:min-w-15 max-m:-translate-x-[50%] max-s:hidden`} src={'/plane.svg'} width={141} height={78} alt="aereoplano di carta"/>
        <svg className="max-w-full max-xl:w-22 max-l:w-19 hidden m:block" xmlns="http://www.w3.org/2000/svg" width="287" height="100" viewBox="0 0 287 100" fill="none">
            <path id="line-step-1" d="M2 81.2666C11.8333 69.0999 30.5 39.5677 106 39.5677C158.5 39.5677 173.5 103.354 146 97.3539C118.5 91.3539 118 24.8538 167 7.85385C216 -9.14615 260.5 13.3538 284.5 27.8539" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 15"/>
            <path className="draw-line no-common" d="M284.5,27.8539C260.5,13.3538 216,-9.14615 167,7.85385C118,24.8538 118.5,91.3539 146,97.3539C173.5,103.354 158.5,39.5677 106,39.5677C30.5,39.5677 11.8333,69.0999 2,81.2666" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
        <svg className="m:hidden" xmlns="http://www.w3.org/2000/svg" width="29" height="278" viewBox="0 0 29 278" fill="none">
            <path id="line-step-1-mobile" d="M18.3549 1.00026C-35.1451 165 55.3549 175 18.3547 276.5" stroke="#C19B39" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 8"/>
            <path className="draw-line" d="M18.3547,276.5C55.3549,175 -35.1451,165 18.3549,1.00026" stroke="#111" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" />
        </svg>
    </div>
}