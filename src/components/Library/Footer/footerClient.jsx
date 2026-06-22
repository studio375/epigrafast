"use client"
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";
export default function FooterClient({footer}){
    const ref = useRef(null);
    const pathname = usePathname();
    useEffect(() => {   
        if(!ref.current || pathname !== '/' || window.innerWidth <= 1025) return;
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 100%',
                //end: `+=${ref.current.offsetHeight}px`,
                scrub: true,
            }
        });
        tml.from(ref.current, {yPercent: 100});
        return () => {
            tml.scrollTrigger.kill();
            tml.kill();
        };
    }, [])
    return <footer ref={ref} className={`${pathname === '/'?'m:absolute m:bottom-0 m:left-0 max-m:-mt-5 max-m:z-3 max-m:relative':'relative'} pt-7 px-8 max-m:px-[5vw] w-full bg-[var(--primary)] rounded-t-[55px]`}>
        <div className="w-full flex items-stretch justify-between max-s:flex-col-reverse max-s:gap-3">
            <div className="flex flex-col items-start gap-5 max-s:gap-3">
                {
                    footer.acf.dati_footer.map((elem, index) => {
                        var img = elem.icona;
                        return <div key={index} className="flex flex-col items-start gap-[6px]">
                            <Image className="h-auto max-s:w-3" src={img.url} width={img.width} height={img.height} alt="" />
                            <span className="text-[20px] font-normal max-s:text-[18px]">{parse(elem.testo)}</span>
                        </div>
                    })
                }
            </div>
            <div className="flex flex-col items-start justify-between max-m:items-end max-s:items-start max-s:gap-2">
                <Image className="w-auto max-l:h-10 max-m:h-7" src={footer.acf.logo_reverse.url} width={footer.acf.logo_reverse.width} height={footer.acf.logo_reverse.height} alt="" />
                <Image className="max-s:w-15" src={footer.acf.logo_nuovaeffemme.url} width={footer.acf.logo_nuovaeffemme.width} height={footer.acf.logo_nuovaeffemme.height} alt=""/>
            </div>
        </div>
        <div className="relative w-full mt-9 max-s:mt-4 flex items-center justify-between pt-[15px] pb-2 border-t-[1px] border-t-black max-m:flex-col max-m:items-center max-m:gap-1">
            <span className="font-normal text-center">{parse(footer.acf.testo_finale)}</span>
            <span className="font-normal">
                <Link href={'https://375.studio/'} target="_blank">Privacy Policy</Link>   •   
                <Link href={''}> Cookie Policy</Link>   •   
                <Link href={''}> Credits</Link>
            </span>
        </div>
    </footer>
}