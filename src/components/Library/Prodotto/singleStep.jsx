import Image from "next/image";
import Title from "../title";
import CustomButton from "../customButton";

export default function SingleStep({stepObj, ...props}){
    return <div {...props} className={`flex flex-col items-start ${props.className || ''}`}>
        <Title Tag="span" className="h2 text-white">{stepObj.numero_step}</Title>
        <span className="text-white font-bold uppercase">{stepObj.titolo}</span>
        <span className="text-white">{stepObj.testo}</span>
        {
            stepObj.immagine? <Image className="mt-[45px]" src={stepObj.immagine.url} width={stepObj.immagine.width} height={stepObj.immagine.height} alt={stepObj.titolo} />
                            : (stepObj.pulsante) && <div className="flex flex-col items-start mt-4 gap-1">
                                <span className="uppercase text-[var(--primary)] font-bold">{stepObj.label_pulsante}</span>
                                <CustomButton href={stepObj.pulsante.url} target={stepObj.pulsante.target}>{stepObj.pulsante.title}</CustomButton>
                            </div>
        }
    </div>
}