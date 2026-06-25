export default function Line3({...props}){
    return <div id="line-3-container" {...props}>
        <svg className="max-xl:w-[60vw] hidden min-[1150px]:block" xmlns="http://www.w3.org/2000/svg" width="987" height="575" viewBox="0 0 987 575" fill="none">
            <path d="M984.5 2.00049C836.5 484 96.5005 244 2.00049 573" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path className="draw-line" d="M2.00049,573C96.5005,244 836.5,484 984.5,2.00049" stroke="#111111" strokeWidth="6" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
        <svg className="min-[1150px]:hidden" xmlns="http://www.w3.org/2000/svg" width="241" height="282" viewBox="0 0 241 282" fill="none">
            <path d="M205.642 0.999991C230.642 26 259.642 80.5 220.142 129C180.642 177.5 41.1423 120 5.14187 206.5C-10.9045 245.055 23.6423 275.167 41.1423 280.5" stroke="#C19B39" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 8"/>
            <path className="draw-line" d="M41.1423,280.5C23.6423,275.167 -10.9045,245.055 5.14187,206.5C41.1423,120 180.642,177.5 220.142,129C259.642,80.5 230.642,26 205.642,0.999991" stroke="#111" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </div>
}