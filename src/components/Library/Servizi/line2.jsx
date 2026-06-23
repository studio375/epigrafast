export default function Line2({...props}){
    return <>
        <svg {...props} className={`hidden m:block ${props.className || ''}`} xmlns="http://www.w3.org/2000/svg" width="342" height="586" viewBox="0 0 342 586" fill="none">
            <path d="M3.58252 2.00024C-24.9175 222 339.583 298 339.583 583.5" stroke="#C19B39" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="15 18"/>
            <path className="draw-line" d="M339.583,583.5C339.583,298 -24.9175,222 3.58252,2.00024" stroke="#fff" strokeWidth="4" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
        <svg {...props} className={`m:hidden ${props.className || ''}`} xmlns="http://www.w3.org/2000/svg" width="128" height="324" viewBox="0 0 128 324" fill="none">
            <path d="M122.8 1.00024C147.984 108 27.138 210.49 2.81123 163.68C-14.5651 130.244 70.2018 117.705 96.5011 163.68C122.8 209.654 133.484 261.898 122.8 322.5" stroke="#C19B39" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round" strokeDasharray="10 8"/>
            <path className="draw-line" d="M122.8,322.5C133.484,261.898 122.8,209.654 96.5011,163.68C70.2018,117.705 -14.5651,130.244 2.81123,163.68C27.138,210.49 147.984,108 122.8,1.00024" stroke="#fff" strokeWidth="2" strokeMiterlimit="8.15" strokeLinecap="round"/>
        </svg>
    </>
}