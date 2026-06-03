import CustomButton from "@/components/Library/customButton";
import Paragraph from "@/components/Library/paragraph";
import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const page = await fetchAPI("pages", {
    slug: "homepage",
    acf_format: "standard",
  });
  
  return <>
    <section className="flex items-center jusitfy-center pt-14 flex flex-col items-center">
      <Title className="h2 text-center">{page.acf.titolo}</Title>
      <div className="h-[50vh]">
        video
      </div>
    </section>
    <section className="relative mt-13 boxed flex flex-col items-center gap-9">
      <Paragraph className="text-center">{page.acf.paragrafo}</Paragraph>
      <div className="flex gap-11 items-center justify-center">
        <CustomButton href={page.acf.pulsante_sx.url} target={page.acf.pulsante_sx.target}>{page.acf.pulsante_sx.title}</CustomButton>
        <CustomButton href={page.acf.pulsante_dx.url} target={page.acf.pulsante_dx.target}>{page.acf.pulsante_dx.title}</CustomButton>
      </div>
    </section>
    <section className="relative w-full mt-15 pt-12 pb-17 bg-[var(--secondary)] flex flex-col items-center">
        <Title Tag="h2" className="h1 text-center text-[var(--primary)]">{page.acf.perche_epigrafast.titolo}</Title>
        <div className="h-40 relative w-full">
          <Image className="w-[calc(100%-85px)] h-auto absolute left-0 top-0" src={page.acf.perche_epigrafast.immagine_top.url} width={page.acf.perche_epigrafast.immagine_top.width} height={page.acf.perche_epigrafast.immagine_top.height} alt="" />
        </div>
        <div className="relative flex flex-col items-start gap-4 boxed w-[50%] mr-auto mt-10">
          <Title Tag="h2" className="text-white">{page.acf.perche_epigrafast.sottotitolo}</Title>
          <Paragraph className="text-white">{page.acf.perche_epigrafast.paragrafo}</Paragraph>
        </div>
        <div className="w-full boxed relative flex items-center gap-40 mt-16">
          <div className="flex-1 relative px-2">
            <Image className="w-full h-auto" src={page.acf.perche_epigrafast.immagine.url} width={page.acf.perche_epigrafast.immagine.width} height={page.acf.perche_epigrafast.immagine.height} alt="" />
          </div>
          <div className="relative flex flex-col items-start gap-4 flex-1">
            <Title Tag="h2" className="text-white">{page.acf.perche_epigrafast.sottotitolo_2}</Title>
            <Paragraph className="text-white">{page.acf.perche_epigrafast.paragrafo_2}</Paragraph>
          </div>
        </div>
    </section>
    <section className="relative w-full pt-13 boxed flex flex-col items-center gap-9">
      <div className="flex items-start w-full pr-12 gap-12">
        <div className="flex flex-col items-start gap-6 flex-1">
          <Title Tag="h2" className="h1 text-[var(--primary)]">{page.acf.titolo_nato_per_semplificare}</Title>
          <Paragraph>{page.acf.paragrafo_nato_per_semplificare}</Paragraph>
        </div>
        <div className="flex flex-col items-start flex-1 relative gap-[15px]">
          {
            page.acf.obiettivi.map((elem, index) => {
              return <div key={index} className="relative flex flex-col gap-[15px] [&:last-child_.line]:hidden">
                <div className="flex items-center w-full gap-3">
                  <Image className="w-[95px] h-auto" src={elem.icona.url} width={elem.icona.width} height={elem.icona.height} alt={elem.titolo} />
                  <div className="flex flex-col items-start">
                    <span className="uppercase font-bold">{elem.titolo}</span>
                    <span className="text-[22px]">{elem.testo}</span>
                  </div>
                </div>
                <div className="line w-[1px] h-7 bg-[var(--primary)] ml-[47.5px]"></div>                
              </div>
            })
          }
        </div>
      </div>
      <div className="flex items-center w-full pr-12 gap-18 -mt-10">
        <div className="flex-1 relative">
          <Image className="w-full h-auto" src={page.acf.immagine_dove_operiamo.url} width={page.acf.immagine_dove_operiamo.width} height={page.acf.immagine_dove_operiamo.height} alt="" />
        </div>
        <div className="flex flex-col items-start flex-1 gap-5">
          <Title Tag="h2" className="h1 text-[var(--primary)]">{page.acf.titolo_dove_operiamo}</Title>
          <Paragraph>{page.acf.paragrafo_dove_operiamo}</Paragraph>
        </div>
      </div>
    </section>
    <section className="mt-10 relative w-full bg-[var(--secondary)] py-6 flex flex-col items-center">
      <Title Tag="h2" className="h1 text-[var(--primary)]">{page.acf.titolo_provalo_ora}</Title>
      <Paragraph className="text-center mt-4 text-white">{page.acf.paragrafo_provalo_ora}</Paragraph>
      <div className="flex items-center gap-7 mt-5">
        <CustomButton href={page.acf.pulsante_sx_provalo.url} target={page.acf.pulsante_sx_provalo.target}>{page.acf.pulsante_sx_provalo.title}</CustomButton>
        <CustomButton href={page.acf.pulsante_dx_provalo.url} target={page.acf.pulsante_dx_provalo.target}>{page.acf.pulsante_dx_provalo.title}</CustomButton>
      </div>
      <div className="w-full mt-10 relative px-30">
        <Image className="w-full h-auto" src={page.acf.immagine_software.url} width={page.acf.immagine_software.width} height={page.acf.immagine_software.height} alt="" />
        <div className="gradient-image absolute left-0 bottom-0 w-full h-full"></div>
      </div>
    </section>
  </>
}
