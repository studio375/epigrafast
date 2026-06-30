"use client";
import { commonAnimations } from "@/helpers/animations";
import Link from "next/link";
import { useEffect } from "react";

export default function CustomButton({Tag = Link, children, ...props}){
    useEffect(() => {
        commonAnimations();
    }, []);
    return  <Tag 
                {...props} 
                className={`relative px-[17px] py-[8px] text-[var(--primary)] rounded-[50px] cursor-pointer border-[1px] border-[var(--primary)] text-[17px] font-bold uppercase show-on-scroll  ${props.className || ''}`}
            >
        {children}
        </Tag>
}