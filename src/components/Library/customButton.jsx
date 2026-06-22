import Link from "next/link";

export default function CustomButton({Tag = Link, children, ...props}){
    return  <Tag 
                {...props} 
                className={`relative px-[17px] py-[8px] text-[var(--primary)] rounded-[50px] cursor-pointer border-[1px] border-[var(--primary)] text-[17px] font-bold uppercase  ${props.className || ''}`}
            >
        {children}
        </Tag>
}