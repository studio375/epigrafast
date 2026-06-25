export default function Arrow({...props}){
    return <>
        <svg className={`hidden m:block ${props.className || ''}`} xmlns="http://www.w3.org/2000/svg" width="1069" height="104" viewBox="0 0 1069 104" fill="none">
            <path d="M1066.59 101.955C1006.65 61.1438 875.006 -26.1435 672.815 10.9913C420.077 57.4097 240.024 137.992 2.00052 37.731" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path id="draw-line" className="-translate-x-[3px]" d="M1066.59 101.955C1006.65 61.1438 875.006 -26.1435 672.815 10.9913C420.077 57.4097 240.024 137.992 2.00052 37.731" stroke="#F7F0E3" strokeWidth="7" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
        <svg className={`m:hidden ${props.className || ''}`} xmlns="http://www.w3.org/2000/svg" width="133" height="302" viewBox="0 0 133 302" fill="none">
            <path d="M128.319 299.075C131.19 277.382 136.867 230.056 99.6348 180.22C53.0946 117.925 7.18579 79.887 2.00008 1.99984" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path className="draw-line" d="M128.319 299.075C131.19 277.382 136.867 230.056 99.6348 180.22C53.0946 117.925 7.18579 79.887 2.00008 1.99984" stroke="#F7F0E3" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </>
}