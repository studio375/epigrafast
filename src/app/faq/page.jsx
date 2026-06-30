import FaqClient from "@/components/Library/faqClient";
import { fetchAPI } from "@/helpers/api/fetch-api"
import { notFound } from "next/navigation";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'faq',
        acf_format: 'standard'
    });
    if(!page) notFound();
    var faq = page.acf.faq;
    return <FaqClient page={page} faq={faq} />
}