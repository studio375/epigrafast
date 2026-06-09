import Image from "next/image";

export default function Arrow2(){
    return <div id="step2-anim" className="absolute left-[60vw]">
        <Image id="camion-step-2" className="absolute right-[100%] translate-y-[-100%] opacity-0" src={'/camion.svg'} width={214} height={100} alt="furgone"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="415" height="4" viewBox="0 0 415 4" fill="none">
            <path id="line-step-2" d="M2 2H412.5" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 15"/>
            <path className="draw-line rotate-[180deg] translate-x-[100%] translate-y-[4px]" d="M2 2H412.5" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>  
    </div>
}