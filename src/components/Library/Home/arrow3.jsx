import Image from "next/image";

export default function Arrow3(){
    return <div id="arrow-down-animation" className="absolute left-[50vw] -top-10">
        <Image id="last-plane" className="absolute translate-y-[-50%] translate-x-[-50%] rotate-y-[-180deg] opacity-0" src={'/plane.svg'} width={256} height={142} alt="furgone"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="355" height="483" viewBox="0 0 355 483" fill="none">
            <path id="last-line" className="opacity-0" d="M86.5 2C105.5 177.5 319 82 350 231C381 380 101.5 326.5 2 481" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18" strokeDashoffset={1000}/>
        </svg>
    </div>
}