import CustomButton from "@/components/Library/customButton";
import Paragraph from "@/components/Library/paragraph";
import AnimatedSection from "@/components/Library/Servizi/animatedSection";
import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const page = await fetchAPI('pages', {
        slug: 'servizi',
        acf_format: 'standard'
    });
    if(!page) notFound();
    return <>
        <section className="relative boxed w-full flex flex-col items-center pt-12">
            <Title Tag="h1" className="text-[var(--primary)] !font-bold uppercase !text-[30px] text-center">Stampepigrafast</Title>
            <Title Tag="h2" className="h1 text-[var(--primary)] text-center">{page.acf.titolo}</Title>
        </section>
        <AnimatedSection page={page} />
    </>
}