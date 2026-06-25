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
        return <div key={index} className="relative flex flex-col items-start justify-center gap-2 w-full h-full rounded-[20px] bg-[#F1F3F5] min-h-[65vh] pt-8 pb-8 max-m:pt-10 max-m:pb-10 max-s:pt-5 max-s:pb-5 px-16 max-l:px-10 max-m:px-5 max-s:px-2">
            {elem.immagine && <Image className="w-12 h-12 rounded-full overflow-hidden mb-6 max-s:w-6 max-s:h-6 max-s:mb-3" src={elem.immagine.url} width={elem.immagine.width} height={elem.immagine.height} alt="" />}
            <Title Tag="span" className="h2 no-animate">{elem.frase}</Title>
            <span className="w-full block text-end font-bold uppercase m:absolute m:bottom-4 m:right-7">{elem.autore}</span>
        </div>
    })
    return <>
        <section className="flex flex-col items-center pt-20 max-m:pt-10">
            <Title Tag="h1" className="text-center text-[var(--primary)]">{page.acf.titolo}</Title>
            <Image className="mt-5 s:-mb-15 max-[1680px]:w-[40%] max-m:mt-3 max-s:w-27" src={page.acf.immagine_top.url} width={page.acf.immagine_top.width} height={page.acf.immagine_top.height} alt="Testimonianze" />
        </section>
        <ScrollGallery className="boxed xl:!px-32 mb-10 max-s:mb-5" slides={slides} />
    </>   
}   