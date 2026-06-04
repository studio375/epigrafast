import Image from "next/image";

export default function Arrow1(){
    return <div id="step1-anim" className="absolute left-45">
        <Image id="plane-step-1" className="absolute translate-y-[-50%] translate-x-[-50%] opacity-0" src={'/plane.svg'} width={141} height={78} alt="aereoplano di carta"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="287" height="100" viewBox="0 0 287 100" fill="none">
            <path className="opacity-0" id="line-step-1" d="M2 81.2666C11.8333 69.0999 30.5 39.5677 106 39.5677C158.5 39.5677 173.5 103.354 146 97.3539C118.5 91.3539 118 24.8538 167 7.85385C216 -9.14615 260.5 13.3538 284.5 27.8539" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 15"/>
        </svg>
    </div>
}