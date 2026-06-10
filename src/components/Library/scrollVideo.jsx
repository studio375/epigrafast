"use client"
import { imageSequence } from "@/helpers/animations";
import { gsap } from "@/lib/gsap";
import { useEffect, useMemo, useRef, useState } from "react"

// export default function ScrollVideo({page}){
//     const videoRef = useRef(null);
//     const containerRef = useRef(null); 
//     useEffect(() => {
//         if(!videoRef.current) return;
//         if(!containerRef.current) return;
        
//         var vid = videoRef.current;
//         vid.pause();
        
//         console.log(vid.duration);
//         var tml = gsap.timeline({
//             defaults: {duration: 1},
//             scrollTrigger: {
//                 trigger: containerRef.current,
//                 start: 'top 0%',
//                 end: '+=1000px',
//                 scrub: true,
//                 pin: true,
//                 pinSpacing: true,
//                 refreshPriority: 1,
//                 markers: true,
//             }
//         });
//         tml.fromTo(vid,{currentTime: 0},{currentTime: vid.duration});

//         return () => {
//             if(tml){
//                 tml.scrollTrigger.kill();
//                 tml.kill();
//             }
//         }
//     }, []);
//     return <div ref={containerRef} className="relative w-[90%] mx-auto">
//         <video className="w-full h-auto" ref={videoRef} src={page.acf.video.url} playsInline={true} webkit-playsinline="true" preload="auto" muted={true}></video>
//     </div>
// }

export default function ScrollVideo({prefix = 'kit', path = 'https://www.sperottospa.com/kit', count = 78}){
    const container = useRef([]);
    const canvas = useRef();
    const sequence = useRef();
    const [folder, setFolder] = useState(path);
    const frames = useMemo(
        () =>
        new Array(count)
            .fill()
            .map(
            (o, i) =>
                `${folder}/${prefix}_${(i + 1).toString().padStart(2, "0")}.jpg`
            )
            .reverse(),
        [folder, count, prefix] // Dipendenze che fanno rigenerare i frames quando cambiano
    );

    useEffect(() => {
        if (window.innerWidth < 1024) setFolder(`${path}_mob`);
        const onResize = () => {
            if (window.innerWidth < 1024) setFolder(`${path}_mob`);
            else setFolder(path);
        };
        window.addEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (!sequence.current) {
        sequence.current = imageSequence({
            urls: frames,
            canvas: canvas.current,
            scrollTrigger: {
            scroller:
                window.innerWidth > 1023 ? window : document.querySelector("main"),
            trigger: container.current,
            start: "center center",
            end: "bottom+=" + window.innerHeight * 2.5 + "px",
            pin: true,
            scrub: true,
            pinType: "fixed",
            },
        });
        } else {
        if (window.innerWidth <= 1023) sequence.current.update(frames);
        }
    }, [frames]);
    return (
        <div ref={container}>
        <canvas width={1920} height={1080} ref={canvas} />
        </div>
    );
}