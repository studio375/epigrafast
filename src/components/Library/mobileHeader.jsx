"use client"
import { ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MobileHeader({menu_items}){
    const [menuOpen, setMenuOpen] = useState(false);
    return  <>
        <div className="hidden w-full max-m:flex justify-center items-center py-[15px] relative z-2">
            <Image className="absolute left-0 top-[50%] -translate-y-[50%] cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} src={(menuOpen)?'/cross.svg':'/hamburger.svg'} width={30} height={30} alt="menu open" />
            <Link href="/" onClick={() => setMenuOpen(false)}><Image src={'/logo.svg'} width={139} height={41} alt="logo epigrafast" /></Link> 
        </div>  
        {
            !menuOpen && <div className="absolute left-0 bottom-0 w-full h-[1px] bg-[#ADADAD] block z-[1]"></div>
        }
        {
            menuOpen && <div className="fixed top-0 left-0 w-full h-screen z-[1] flex flex-col items-center justify-center gap-5 bg-[var(--primary)]">
                {
                    menu_items.map(elem => {
                        return <Link onClick={() => setMenuOpen(false)} className="text-[33px] max-s:text-[28px] font-bold text-white" key={elem.id} href={elem.url} target={elem.target}>{elem.title.rendered}</Link>
                    })
                }
            </div>
        }
    </>
}