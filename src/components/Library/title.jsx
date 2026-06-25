"use client"
import { gsap, SplitText } from '@/lib/gsap';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
export default function Title({Tag = 'h2', children, ...props}){
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
                end: '+=300px',
                scrub: true,
            }
        });
        tml.to(splitText.chars, {opacity: 1, yPercent: 0, duration: 0.5, stagger: 0.05});

    }, [])
    return <Tag ref={ref} {...props}>{parse(children)}</Tag>
}