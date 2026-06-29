"use client"

import Link from "next/link";
import { useEffect } from "react"

export default function IubendaElements(){
    useEffect(() => {
        (function (w, d) {
            var loader = function () {
                var s = d.createElement("script"),
                    tag = d.getElementsByTagName("script")[0];

                s.src = "https://cdn.iubenda.com/iubenda.js";
                tag.parentNode.insertBefore(s, tag);
            };

            if (w.addEventListener) {
                w.addEventListener("load", loader, false);
            } else if (w.attachEvent) {
                w.attachEvent("onload", loader);
            } else {
                w.onload = loader;
            }
        })(window, document);

        if (typeof window !== "undefined") {
            const addLenisPrevent = () => {
                // Cerco l'elemento iubenda-iframe
                const banner = document.getElementById("iubenda-iframe");
                if (banner) {
                    banner.setAttribute("data-lenis-prevent", "");
                }
            };

            addLenisPrevent();

            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.id === "iubenda-iframe") {
                    node.setAttribute("data-lenis-prevent", "");
                    }
                });
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });
            return () => {
                observer.disconnect();
            };
        }

    }, []);
    return <div className="font-normal">
        <Link href={'https://375.studio/'} target="_blank">Privacy Policy</Link>   •   
        <span onClick={() => {document.getElementById('hidden-iub').click()}} className="cursor-pointer">Cookie policy</span>   •
        <Link href="https://www.iubenda.com/privacy-policy/49299343" title="Privacy Policy " className="iubenda-nostyle no-brand iubenda-embed cursor-pointer">Privacy policy</Link>
    </div>
}