import ContattiClient from "@/components/Library/contattiClient";
import { fetchAPI } from "@/helpers/api/fetch-api"
import { notFound } from "next/navigation";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'contatti',
        acf_format: 'standard'
    });
    if(!page) notFound();

    return <ContattiClient page={page} />
}