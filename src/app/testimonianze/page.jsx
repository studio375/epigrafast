import ScrollGallery from "@/components/Library/scrollGallery";
import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const page = await fetchAPI("pages", {
        slug: 'testimonianze',
        acf_format: "standard",
    });
    if(!page) notFound();
    var slides = page.acf.testimonianze.map((elem, index) => {
        return <div key={index} className="relative flex flex-col items-start justify-center gap-2 w-full h-full rounded-[20px] bg-[#F1F3F5] pt-15 pb-18 px-16">
            {elem.immagine && <Image className="w-12 h-12 rounded-full overflow-hidden mb-6" src={elem.immagine.url} width={elem.immagine.width} height={elem.immagine.height} alt="" />}
            <Title Tag="span" className="h2">{elem.frase}</Title>
            <span className="w-full block text-end font-bold uppercase absolute bottom-4 right-7">{elem.autore}</span>
        </div>
    })
    return <>
        <section className="flex flex-col items-center pt-20">
            <Title Tag="h1" className="text-center text-[var(--primary)]">{page.acf.titolo}</Title>
            <Image className="mt-5 -mb-15" src={page.acf.immagine_top.url} width={page.acf.immagine_top.width} height={page.acf.immagine_top.height} alt="Testimonianze" />
        </section>
        <ScrollGallery className="px-32" slides={slides} />
    </>   
}   