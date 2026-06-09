import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api"
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'faq',
        acf_format: 'standard'
    });
    if(!page) notFound();
    var faq = page.acf.faq;
    return <>
        <section className="relative flex flex-col items-center mt-15 boxed -mb-8 z-2">
            <Title Tag="h1" className="text-[var(--primary)] uppercase">{page.acf.titolo}</Title>
            <Image src={page.acf.immagine.url} width={page.acf.immagine.width} height={page.acf.immagine.height} alt="faq" />
        </section>
        <section className="relative w-full boxed flex flex-wrap gap-2 items-stretch justify-start mb-12">
            {
                faq.map((elem, index) => {
                    return <div key={index} className="w-[calc(50%-10px)] flex flex-col items-start justify-center px-[115px] bg-[#F1F3F5] min-h-40 rounded-[20px] gap-[15px]">
                        <span className="font-bold uppercase block">{elem.domanda}</span>
                        <span className="h2 block">{elem.risposta}</span>
                    </div>
                })
            }
            <div className="w-full flex flex-col items-center justify-center gap-6 px-[115px] bg-[#F1F3F5] min-h-40 rounded-[20px]">
                <span className="font-bold uppercase block">Chi posso contattare se ho bisogno di supporto?</span>
                <div className="relative flex items-center gap-28">
                    <div className="relative flex flex-col items-center gap-3">
                        <Image className="h-6 w-auto" src={page.acf.icona_whatsapp.url} width={page.acf.icona_whatsapp.width} height={page.acf.icona_whatsapp.height} alt="whatsapp" />
                        <span className="h2">{page.acf.whatsapp}</span>
                    </div>
                    <div className="relative flex flex-col items-center gap-3">
                        <Image className="h-6 w-auto" src={page.acf.icona_email.url} width={page.acf.icona_email.width} height={page.acf.icona_email.height} alt="whatsapp" />
                        <span className="h2">{page.acf.email}</span>
                    </div>
                </div>
            </div>
        </section>
    </>
}