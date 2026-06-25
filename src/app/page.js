import CustomButton from "@/components/Library/customButton";
import HomeAnimatedSection from "@/components/Library/Home/homeAnimatedSection";
import StampeSection from "@/components/Library/Home/Stampe/stampeSection";
import Paragraph from "@/components/Library/paragraph";
import ParticlesEffect from "@/components/Library/particlesEffect";
import ScrollVideo from "@/components/Library/scrollVideo";
import Title from "@/components/Library/title";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const page = await fetchAPI("pages", {
    slug: "homepage",
    acf_format: "standard",
  });
  if(!page) notFound();
  return <>
    <section className="relative w-full flex items-center jusitfy-center flex flex-col items-center boxed min-h-[80vh]">
      <ParticlesEffect page={page} />
      <Title className="boxed h2 text-center w-full z-5 absolute top-14 left-[50%] -translate-x-[50%]">{page.acf.titolo}</Title>
      <ScrollVideo page={page} />
    </section>
    <section className="relative mt-13 boxed flex flex-col items-center gap-9 max-m:gap-7 max-s:gap-5">
      <Paragraph className="text-center">{page.acf.paragrafo}</Paragraph>
      <div className="flex gap-11 items-center justify-center max-l:gap-7 max-m:gap-5 max-s:flex-col max-s:gap-3">
        <CustomButton href={page.acf.pulsante_sx.url} target={page.acf.pulsante_sx.target}>{page.acf.pulsante_sx.title}</CustomButton>
        <CustomButton href={page.acf.pulsante_dx.url} target={page.acf.pulsante_dx.target}>{page.acf.pulsante_dx.title}</CustomButton>
      </div>
    </section>
    <HomeAnimatedSection page={page} />
    <StampeSection page={page} />
    <section className="relative w-full pt-13 max-s:pt-7 boxed flex flex-col items-center gap-9">
      <div className="flex items-start w-full l:pr-12 gap-12 max-m:flex-col max-m:gap-5">
        <div className="flex flex-col items-start gap-6 flex-1 max-m:gap-3">
          <Title Tag="h2" className="h1 text-[var(--primary)]">{page.acf.titolo_nato_per_semplificare}</Title>
          <Paragraph>{page.acf.paragrafo_nato_per_semplificare}</Paragraph>
        </div>
        <div className="flex flex-col items-start flex-1 relative gap-[15px]">
          {
            page.acf.obiettivi.map((elem, index) => {
              return <div key={index} className="relative flex flex-col gap-[15px] [&:last-child_.line]:hidden">
                <div className="flex items-center w-full gap-3">
                  <Image className="w-[95px] h-auto max-xs:w-5" src={elem.icona.url} width={elem.icona.width} height={elem.icona.height} alt={elem.titolo} />
                  <div className="flex flex-col items-start">
                    <span className="uppercase font-bold">{elem.titolo}</span>
                    <span className="text-[22px] max-xs:text-[18px]">{elem.testo}</span>
                  </div>
                </div>
                <div className="line w-[1px] h-7 bg-[var(--primary)] ml-[47.5px] max-xs:ml-[25px]"></div>                
              </div>
            })
          }
        </div>
      </div>
      <div className="flex items-center w-full l:pr-12 gap-18 max-l:gap-10 max-s:gap-5 -mt-10 max-l:mt-0 max-s:flex-col-reverse">
        <div className="flex-1 relative">
          <Image className="w-full h-auto" src={page.acf.immagine_dove_operiamo.url} width={page.acf.immagine_dove_operiamo.width} height={page.acf.immagine_dove_operiamo.height} alt="" />
        </div>
        <div className="flex flex-col items-start flex-1 gap-5 max-s:gap-3">
          <Title Tag="h2" className="h1 text-[var(--primary)]">{page.acf.titolo_dove_operiamo}</Title>
          <Paragraph>{page.acf.paragrafo_dove_operiamo}</Paragraph>
        </div>
      </div>
    </section>
    <section className="mt-10 relative w-full bg-[var(--secondary)] py-6 flex flex-col items-center max-m:pb-5">
      <Title Tag="h2" className="h1 text-[var(--primary)] boxed">{page.acf.titolo_provalo_ora}</Title>
      <Paragraph className="text-center mt-4 text-white boxed">{page.acf.paragrafo_provalo_ora}</Paragraph>
      <div className="flex items-center gap-7 mt-5 max-[600px]:gap-3 max-xs:flex-col boxed">
        <CustomButton href={page.acf.pulsante_sx_provalo.url} target={page.acf.pulsante_sx_provalo.target}>{page.acf.pulsante_sx_provalo.title}</CustomButton>
        <CustomButton href={page.acf.pulsante_dx_provalo.url} target={page.acf.pulsante_dx_provalo.target}>{page.acf.pulsante_dx_provalo.title}</CustomButton>
      </div>
      <div className="w-full mt-10 relative px-30 max-xl:px-20 max-l:px-10 max-m:px-[5vw] max-s:mt-5">
        <Image className="w-full h-auto relative" src={page.acf.immagine_software.url} width={page.acf.immagine_software.width} height={page.acf.immagine_software.height} alt="" />
        <div className="gradient-image absolute left-0 bottom-0 w-full h-full"></div>
      </div>
    </section>
  </>
}
