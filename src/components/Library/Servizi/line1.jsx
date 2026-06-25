import Image from "next/image";

export default function Line1({...props}){
    return <div id="line-1-container" {...props}>
        <Image id="plane-1" className="h-auto show-on-scroll absolute top-0 left-0 -translate-y-[50%] -translate-x-[50%] origin-center rotate-[135deg] -scale-y-100 max-xl:w-20 max-l:w-15 max-m:min-w-10 max-s:hidden" src={'/plane.svg'} width={236} height={131} alt="aereoplano" />
        <svg className="hidden m:block" xmlns="http://www.w3.org/2000/svg" width="522" height="431" viewBox="0 0 522 431" fill="none">
            <path id="line-1" d="M519.113 2C398.113 131.5 477.613 169 222.957 266.385C-1.60007 352.259 -5.86275 417.891 4.92311 429" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path className="draw-line" d="M4.92311,429C-5.86275,417.891 -1.60007,352.259 222.957,266.385C477.613,169 398.113,131.5 519.113,2" stroke="#fff" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
        <svg className="m:hidden" xmlns="http://www.w3.org/2000/svg" width="33" height="278" viewBox="0 0 28 283" fill="none">
            <path id="line-1-mobile" d="M17.5866 1.00025C-33.5145 184.657 53.109 167.894 17.5863 281.5" stroke="#C19B39" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 8"/>
            <path className="draw-line" d="M17.5863,281.5C53.109,167.894 -33.5145,184.657 17.5866,1.00025" stroke="#fff" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </div>
}