import CustomButton from "@/components/Library/customButton";
import Paragraph from "@/components/Library/paragraph";
import ScrollGallery from "@/components/Library/scrollGallery";
import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const page = await fetchAPI("pages", {
        slug: 'prodotto',
        acf_format: "standard",
    });
    if(!page) notFound();
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
        <section className="relative bg-[var(--secondary)] h-[100vh] flex flex-col items-center pt-20">
            <div className="relative flex flex-col items-center">
                <Title Tag="h1" className="text-center text-[var(--primary)]">{page.acf.titolo}</Title>
                <Paragraph className="text-center mt-6 text-white">{page.acf.paragrafo}</Paragraph>
                <Title Tag="h2" className="h2 text-center text-white mt-10">{page.acf.sottotitolo}</Title>
            </div>
        </section>
        <section className="relative h-[100vh] flex items-center justify-center">
            to do
        </section>
        <ScrollGallery className="boxed relative" title="Funzionalità principali" slides={slides} />
        <section className="mt-0 boxed relative flex flex-col items-center mb-18">
            <Title Tag="h2" className="h1 text-[var(--primary)] text-center">{page.acf.titolo_risparmia}</Title>
            <Paragraph className="text-center font-bold mt-3 uppercase">{page.acf.sottotitolo_risparmia}</Paragraph>
            <div className="flex items-center justify-center relative gap-10 mt-5">
                <CustomButton className="bg-[var(--primary)] text-white" href={page.acf.pulsante_risparmia_sx.url} target={page.acf.pulsante_risparmia_sx.target}>{page.acf.pulsante_risparmia_sx.title}</CustomButton>
                <CustomButton className="bg-[var(--primary)] text-white" href={page.acf.pulsante_risparmia_dx.url} target={page.acf.pulsante_risparmia_dx.target}>{page.acf.pulsante_risparmia_dx.title}</CustomButton>
            </div>
        </section>
    </>
}