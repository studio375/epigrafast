import Paragraph from "@/components/Library/paragraph";
import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api"
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'contatti',
        acf_format: 'standard'
    });
    if(!page) notFound();

    return <>
        <section className="w-full flex flex-col items-center boxed mt-20 max-xl:mt-15 max-m:mt-10">
            <Title Tag="h1" className="text-[var(--primary)]">{page.acf.titolo}</Title>
            <Image className="h-auto max-xl:w-[50%] max-s:w-27 max-s:mt-3" src={page.acf.immagine.url} width={page.acf.immagine.width} height={page.acf.immagine.height} alt="Contatti" />
        </section>
        <section className="relative flex flex-wrap items-stretch gap-2 mb-14 max-s:mb-5 boxed">
            <div className="w-full flex flex-col items-center justify-center gap-6 max-[600px]:gap-3 px-[115px] max-l:px-5 max-xs:px-2 bg-[#F1F3F5] s:min-h-40 max-s:py-4 rounded-[20px]">
                <Paragraph className="no-animate font-bold uppercase block text-center">{page.acf.titolo_contatti}</Paragraph>
                <div className="relative flex items-center gap-28 max-l:gap-10 max-s:gap-4 max-[600px]:flex-col max-[600px]:gap-3">
                    <div className="relative">
                        <Link className="flex flex-col items-center gap-3 max-xl:gap-[15px] max-s:gap-1 relative" href={`https://wa.me/${page.acf.whatsapp.replace(' ', '')}`} target="blank">
                            <Image className="h-6 w-auto max-xl:h-5 max-s:h-3" src={page.acf.icona_whatsapp.url} width={page.acf.icona_whatsapp.width} height={page.acf.icona_whatsapp.height} alt="whatsapp" />
                            <span className="h2">{page.acf.whatsapp}</span>
                        </Link>
                    </div>
                    <div className="relative">
                        <Link className="relative flex flex-col items-center gap-3 max-xl:gap-[15px]" href={`mailto:${page.acf.email}`} target="_blank">
                            <Image className="h-6 w-auto max-xl:h-5 max-s:h-3" src={page.acf.icona_email.url} width={page.acf.icona_email.width} height={page.acf.icona_email.height} alt="whatsapp" />
                            <span className="h2">{page.acf.email}</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative w-[calc(50%-10px)] max-[850px]:w-full flex flex-col items-start py-18 max-l:py-10 max-s:py-4 pl-15 max-[1680px]:px-10 max-l:px-5 max-xs:px-2 gap-3 max-xl:gap-[15px] bg-[#F1F3F5] rounded-[20px]">
                <Image className="w-6 h-auto max-xl:w-4 max-s:w-3" src={page.acf.icona_pin.url} width={page.acf.icona_pin.width} height={page.acf.icona_pin.height} alt="posizione" />
                <Paragraph className="h2 no-animate">{page.acf.indirizzo}</Paragraph>
            </div>
            <div className="relative min-h-40 max-s:min-h-30 w-[calc(50%-10px)] max-[850px]:w-full rounded-[20px] flex overflow-hidden">
                <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d776.8134766042868!2d11.506761328742094!3d45.61616938035724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f34c79a4ccebb%3A0x1ea0d4ed36556bc6!2sVia%20Pagello%2C%201%2C%2036030%20Caldogno%20VI!5e0!3m2!1sit!2sit!4v1780912376421!5m2!1sit!2sit" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    </>
}