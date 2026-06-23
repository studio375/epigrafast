import Image from "next/image";

export default function Line2({...props}){
    return <div id="line-2-container" {...props} >
        <Image id="camion-2" className="show-on-scroll absolute left-0 top-5 rotate-[68deg] -translate-x-[50%] -translate-y-[50%] max-[1400px]:w-20" src={'/camion.svg'} width={297} height={139} alt="furgone" />
        <svg className="max-[1400px]:w-[50vw] hidden min-[1150px]:block" xmlns="http://www.w3.org/2000/svg" width="915" height="858" viewBox="0 0 915 858" fill="none">
            <path id="line-2" d="M2.52966 2C-0.470336 40.5 -1.47052 435 286.53 561C574.53 687 726.03 630 912.03 856" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path className="draw-line" d="M912.03,856C726.03,630 574.53,687 286.53,561C-1.47052,435 -0.470336,40.5 2.52966,2" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </div>
}