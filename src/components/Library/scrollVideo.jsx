"use client"
import { imageSequence } from "@/helpers/animations";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react"

export default function ScrollVideo({page}){
    var prefix = 'video_pc';
    var count = 117;
    const container = useRef([]);
    const imagesRef = useRef(null);
    const canvas = useRef();
    const sequence = useRef();
    const [folder, setFolder] = useState('video_pc');
    const frames = useMemo(
        () =>
        new Array(count)
            .fill()
            .map(
            (o, i) =>
                `/${folder}/video_pc-${(i + 1).toString()}.webp`
            ),
        [folder, count, prefix] // Dipendenze che fanno rigenerare i frames quando cambiano
    );

    //to do
    // useEffect(() => {
    //     if (window.innerWidth < 1024) setFolder(`${path}_mob`);
    //     const onResize = () => {
    //         if (window.innerWidth < 1024) setFolder(`${path}_mob`);
    //         else setFolder(path);
    //     };
    //     window.addEventListener("resize", onResize);
    // }, []);

    //div con immagini
    useEffect(() => {
        if(!imagesRef.current) return;
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: imagesRef.current,
                start: "center center",
                end: "bottom+=" + window.innerHeight * 2.5 + "px",
                pin: true,
                scrub: true,
                pinSpacing: true,
                refreshPriority: 1,
            },
        })
    }, []);

    useEffect(() => {
        if (!sequence.current) {
        sequence.current = imageSequence({
            urls: frames,
            canvas: canvas.current,
            scrollTrigger: {
                scroller: window.innerWidth > 1023 ? window : document.querySelector("main"),
                trigger: container.current,
                start: "center center",
                end: "bottom+=" + window.innerHeight * 2.5 + "px",
                pin: true,
                scrub: true,
                pinSpacing: true,
                refreshPriority: 2,
            },
        });
        } else {
            if (window.innerWidth <= 1023) sequence.current.update(frames);
        }
    }, [frames]);


    return <>
        <div ref={imagesRef} className="z-10 absolute top-0 left-0 w-full h-screen boxed flex justify-between items-end pb-10">
            <Image className="translate-y-[18%] w-34 h-auto object-contain" src={page.acf.immagine_video_sx.url} width={page.acf.immagine_video_sx.width} height={page.acf.immagine_video_sx.height} alt="omino sinistra" />
            <Image className="w-30 h-auto -translate-x-[30%] mb-auto mt-15" src={page.acf.immagine_video_dx.url} width={page.acf.immagine_video_dx.width} height={page.acf.immagine_video_dx.height} alt="omino destra" />
        </div>
        <div ref={container} className="w-full relative">
            <canvas className="z-[-1] relative" width={1920} height={1080} ref={canvas} />
        </div>
    </>;
}