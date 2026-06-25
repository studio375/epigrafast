"use client"
import { gsap, SplitText } from '@/lib/gsap';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
export default function Paragraph({children, ...props}){
    const ref = useRef(null);
    useEffect(() => {
        if(!ref.current) return;
        if(Array.from(ref.current.classList).indexOf('no-animate') > -1) return;
        var splitText = SplitText.create(ref.current, {
            type: 'words, chars',
            onSplit(self) {
                gsap.set(self.chars, {opacity: 0, yPercent:40})
            }
        });
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current, 
                start: 'top 60%',
                end: '+=230px',
                scrub: true,
            }
        });
        tml.to(splitText.chars, {opacity: 1, yPercent: 0, stagger: 1});

    }, [])
    return <span ref={ref} {...props} className={`${props.className || ''}`}>{parse(children)}</span>
}