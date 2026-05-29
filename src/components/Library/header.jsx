import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./customButton";

export default async function Header({}){
    var menu_items = await fetchAPI('menu-items', {
        menu: 'Main Menu'
    });
    return <header className="fixed top-0 left-0 w-full px-4 py-[15px] bg-white flex items-center justify-center z-[9999]">
        <Image src={'/logo.svg'} width={139} height={41} alt="logo epigrafast" />
        <div className="relative mx-auto flex items-center gap-12 justify-center">
            {
                menu_items?.map(elem => {
                    return <Link className="text-[16px] font-bold" key={elem.id} href={elem.url} target={elem.target}>{elem.title.rendered}</Link>
                })
            }
        </div>
        <div className="relative flex items-center justify-end gap-2">
            <Link href='#'>wts</Link>
            <CustomButton href="#">Richiedi una demo</CustomButton>
        </div>
        <div className="absolute left-4 bottom-0 w-[calc(100%-80px)] h-[1px] bg-[#ADADAD] block z-[1]"></div>
    </header>
}