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
  </>
}
