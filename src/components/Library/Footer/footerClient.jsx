"use client"
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
export default function FooterClient({footer}){
    const ref = useRef(null);
    useEffect(() => {   
        if(!ref.current) return;
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 100%',
                //end: `+=${ref.current.offsetHeight}px`,
                scrub: true,
            }
        });
        tml.from(ref.current, {yPercent: 100});
        return () => tml.kill();
    }, [])
    return <footer ref={ref} className="absolute bottom-0 left-0 pt-7 px-8 w-full bg-[var(--primary)] rounded-t-[55px]">
        <div className="w-full flex items-stretch justify-between">
            <div className="flex flex-col items-start gap-5">
                {
                    footer.acf.dati_footer.map((elem, index) => {
                        var img = elem.icona;
                        return <div key={index} className="flex flex-col items-start gap-[6px]">
                            <Image src={img.url} width={img.width} height={img.height} alt="" />
                            <span className="text-[20px] font-normal">{parse(elem.testo)}</span>
                        </div>
                    })
                }
            </div>
            <div className="flex flex-col items-start justify-between">
                <Image src={footer.acf.logo_reverse.url} width={footer.acf.logo_reverse.width} height={footer.acf.logo_reverse.height} alt="" />
                <Image src={footer.acf.logo_nuovaeffemme.url} width={footer.acf.logo_nuovaeffemme.width} height={footer.acf.logo_nuovaeffemme.height} alt=""/>
            </div>
        </div>
        <div className="relative w-full mt-9 flex items-center justify-between pt-[15px] pb-2 border-t-[1px] border-t-black">
            <span className="font-normal">{parse(footer.acf.testo_finale)}</span>
            <span className="font-normal">
                <Link href={'https://375.studio/'} target="_blank">Privacy Policy</Link>   •   
                <Link href={''}> Cookie Policy</Link>   •   
                <Link href={''}> Credits</Link>
            </span>
        </div>
    </footer>
}