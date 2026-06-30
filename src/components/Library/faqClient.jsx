"use client"
import Title from "@/components/Library/title";
import { commonAnimations } from "@/helpers/animations";
import Image from "next/image";
import { useEffect } from "react";
export default function FaqClient({page, faq}){
    useEffect(() => {
        commonAnimations();
    })
    return <>
        <section className="relative flex flex-col items-center mt-15 max-m:mt-10 boxed m:-mb-8 z-2">
            <Title Tag="h1" className="text-[var(--primary)] uppercase">{page.acf.titolo}</Title>
            <Image className="max-[1680px]:w-[50%] max-m:mt-3 max-s:w-27" src={page.acf.immagine.url} width={page.acf.immagine.width} height={page.acf.immagine.height} alt="faq" />
        </section>
        <section className="relative w-full boxed flex flex-wrap gap-2 items-stretch justify-start mb-12 max-s:mb-5">
            {
                faq.map((elem, index) => {
                    return <div key={index} className={`${index > 1 && 'box-animation'} w-[calc(50%-10px)] max-s:w-full flex flex-col items-start justify-center px-[115px] max-l:px-8 max-m:px-5 max-s:px-2 bg-[#F1F3F5] m:min-h-40 max-m:py-6 max-s:py-4 rounded-[20px] gap-[15px]`}>
                        <span className="font-bold uppercase block">{elem.domanda}</span>
                        <span className="h2 block">{elem.risposta}</span>
                    </div>
                })
            }
            <div className="box-animation w-full flex flex-col items-center justify-center gap-6 max-s:gap-3 px-[115px] max-l:px-8 max-m:px-5 bg-[#F1F3F5] m:min-h-40 max-m:py-6 max-s:py-4 rounded-[20px]">
                <span className="font-bold uppercase block">Chi posso contattare se ho bisogno di supporto?</span>
                <div className="relative flex items-center gap-28 max-l:gap-10 max-s:gap-4 max-[600px]:flex-col max-[600px]:gap-3">
                    <div className="relative flex flex-col items-center gap-3 max-m:gap-[15px]">
                        <Image className="h-6 w-auto max-xl:h-5 max-s:h-3" src={page.acf.icona_whatsapp.url} width={page.acf.icona_whatsapp.width} height={page.acf.icona_whatsapp.height} alt="whatsapp" />
                        <span className="h2">{page.acf.whatsapp}</span>
                    </div>
                    <div className="relative flex flex-col items-center gap-3 max-m:gap-[15px]">
                        <Image className="h-6 w-auto max-xl:h-5 max-s:h-3" src={page.acf.icona_email.url} width={page.acf.icona_email.width} height={page.acf.icona_email.height} alt="whatsapp" />
                        <span className="h2">{page.acf.email}</span>
                    </div>
                </div>
            </div>
        </section>
    </>
}