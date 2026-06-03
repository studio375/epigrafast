import ScrollGallery from "@/components/Library/scrollGallery";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";

export default async function Page({params}){
    const page = await fetchAPI("pages", {
        slug: 'prodotto',
        acf_format: "standard",
    });
    console.log(page);
    var slides = page.acf.funzionalita.map((elem, index) => {
        return <div key={index} className="relative flex items-stretch gap-2 w-full">
            <Image className="w-[calc(50%-10px)] h-auto rounded-[30px]" src={elem.media.url} width={elem.media.width} height={elem.media.height} alt={elem.titolo} />
            <div className="relative w-[calc(50%-10px)] flex flex-col items-start justify-center gap-3 px-16 bg-[#F1F3F5] rounded-[20px]">
                <Image src={elem.icona.url} width={elem.icona.width} height={elem.icona.height} alt={elem.titolo} />
                <span className="font-bold uppercase">{elem.titolo}</span>
                <span>{elem.label}</span>
            </div>
        </div>
    })
    return <>
        <section className="relative bg-[var(--secondary)] h-[100vh] flex items-center justify-center text-white">
            to do
        </section>
        <section className="relative h-[100vh] flex items-center justify-center">
            to do
        </section>
        <ScrollGallery className="boxed relative" title="Funzionalità principali" slides={slides} />
    </>
}