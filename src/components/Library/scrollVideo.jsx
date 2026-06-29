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

    useEffect(() => {
        if(window.innerWidth < 769){
            setFolder('video_pc_mobile');
            console.log('setto mobile');
        }else{
            setFolder('video_pc');
        }
        window.addEventListener('resize', () => {
            if(window.innerWidth < 769){
                setFolder('video_pc_mobile');
                console.log('setto mobile');
            }else{
                setFolder('video_pc');
            }
        })
    })

    //div con immagini
    useEffect(() => {
        if(!imagesRef.current) return;
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: imagesRef.current,
                start: "center center",
                end: window.innerHeight * 2.5 + "px",
                pin: true,
                scrub: true,
                pinSpacing: true,
                refreshPriority: 1,
            },
        })

        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }
    }, []);

    useEffect(() => {
        if (!sequence.current) {
            sequence.current = imageSequence({
                urls: frames,
                canvas: canvas.current,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    end: ''+window.innerHeight * 2 + "px",
                    pin: true,
                    scrub: true,
                    pinSpacing: true,
                    refreshPriority: 2,
                },
            });
        }else {
            if (window.innerWidth < 769) sequence.current.update(frames);
        }
    }, [frames]);


    return <>
        <div ref={imagesRef} className="z-10 relative top-0 left-0 w-full h-screen flex justify-between items-end pb-10">
            <Image className="translate-y-[18%] w-34 min-[2000px]:w-40 h-auto object-contain max-[1680px]:w-30 max-l:w-24 max-m:w-20 max-s:w-17 max-s:translate-y-0 max-[600px]:w-12 max-[600px]:mb-6" src={page.acf.immagine_video_sx.url} width={page.acf.immagine_video_sx.width} height={page.acf.immagine_video_sx.height} alt="omino sinistra" />
            <Image className="w-30 min-[2000px]:w-35 h-auto -translate-x-[30%] l:translate-y-[1vw] xl:translate-y-[3vw] max-m:mb-auto mt-10 max-[1680px]:w-23 max-l:w-20 max-m:w-17 max-m:mt-20 max-s:w-14 max-[600px]:w-10 max-[600px]:mt-23 max-[600px]:translate-x-0" src={page.acf.immagine_video_dx.url} width={page.acf.immagine_video_dx.width} height={page.acf.immagine_video_dx.height} alt="omino destra" />
        </div>
        <div ref={container} className="w-full h-auto absolute top-[50vh] aspect-1920/1080">
            <canvas className="z-[-1] relative translate-y-[-50%] max-w-full aspect-1920/1080" width={1920} height={1080} ref={canvas} />
        </div>
    </>;
}