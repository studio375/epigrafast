import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./customButton";
import MobileHeader from "./mobileHeader";

export default async function Header({}){
    var menu_items = await fetchAPI('menu-items', {
        menu: 'Main Menu'
    });
    return <header className="fixed top-0 left-0 w-full max-w-screen px-4 max-m:px-[5vw] bg-white z-[9999]">
        {/* menu desk */}
        <div className="relative flex items-center justify-center max-m:hidden py-[15px]">
            <Link href="/"><Image src={'/logo.svg'} width={139} height={41} alt="logo epigrafast" /></Link>
            <div className="relative mx-auto flex items-center gap-12 max-xl:gap-6 justify-center">
                {
                    menu_items?.map(elem => {
                        return <Link className="text-[16px] font-bold" key={elem.id} href={elem.url} target={elem.target}>{elem.title.rendered}</Link>
                    })
                }
            </div>
            <div className="relative flex items-center justify-end gap-2">
                <Link href='#'><Image src={'/wts.svg'} width={26} height={28} alt="whatsapp" /></Link>
                <CustomButton href="#" className="!py-[5px]">Richiedi una demo</CustomButton>
            </div>
            <div className="absolute left-0 bottom-0 w-full h-[1px] bg-[#ADADAD] block z-[1]"></div>
        </div>
        
        <MobileHeader menu_items={menu_items} />
       
    </header>
}