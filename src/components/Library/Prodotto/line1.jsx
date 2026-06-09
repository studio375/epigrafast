import Image from "next/image";

export default function Line1(){
    return <div id="line-1-container" className="absolute right-[78%] top-[30%] z-1">
        <Image id="plane-1" className="show-on-scroll rotate-[135deg] -scale-y-100 absolute right-0 top-0 -translate-y-[50%] -translate-x-[50%] opacity-0" src={'/plane.svg'} width={213} height={118} alt="plane"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="470" height="1224" viewBox="0 0 470 1224" fill="none">
            <path id="line-1" d="M467.385 25.1235C241.385 -64.8766 -100.615 113.123 31.3848 467.124C171.307 842.37 155.385 1013.12 31.3848 1221.12" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"  strokeDasharray="15 18"/>
            <path id="line-1-overlay" className="draw-line" d="M31.3848,1221.12C155.385,1013.12 171.307,842.37 31.3848,467.124C-100.615,113.123 241.385,-64.8766 467.385,25.1235" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round" />
        </svg>
    </div>
}