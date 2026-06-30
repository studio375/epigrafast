import Image from "next/image";

export default function Line2({...props}){
    return <div id="line-2-container" {...props} >
        <Image id="camion-2" className="show-on-scroll absolute left-0 top-5 rotate-[70deg] -translate-x-[50%] -translate-y-[50%] max-[1400px]:w-20 max-[1150px]:min-w-15 max-[1150px]:rotate-[90deg] max-[1150px]:hidden" src={'/camion.svg'} width={297} height={139} alt="furgone" />
        <svg className="max-[1400px]:w-[50vw] hidden min-[1150px]:block" xmlns="http://www.w3.org/2000/svg" width="915" height="858" viewBox="0 0 915 858" fill="none">
            <path id="line-2" d="M2.52966 2C-0.470336 40.5 -1.47052 435 286.53 561C574.53 687 726.03 630 912.03 856" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path className="draw-line" d="M912.03,856C726.03,630 574.53,687 286.53,561C-1.47052,435 -0.470336,40.5 2.52966,2" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
        <svg className="min-[1150px]:hidden" xmlns="http://www.w3.org/2000/svg" width="2" height="294" viewBox="0 0 2 294" fill="none">
            <path id="line-2-mobile" d="M1 1V293" stroke="#C19B39" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 8"/>
            <path className="rotate-[180deg] origin-center draw-line" d="M1 1V293" stroke="#111" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </div>
}