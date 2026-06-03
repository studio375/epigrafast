import { fetchAPI } from "@/helpers/api/fetch-api"
import FooterClient from "./footerClient";

export default async function Footer({}){
    var footer = await fetchAPI('pages', {
        slug: 'configurazioni',
        acf_format: 'standard'
    });
    return <FooterClient footer={footer} />
}