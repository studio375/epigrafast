import Image from "next/image";
import Title from "../title";
import CustomButton from "../customButton";

export default function SingleStep({stepObj, ...props}){
    return <div {...props} className={`flex flex-col items-start ${props.className || ''} max-[1150px]:items-center`}>
        <Title Tag="span" className="h2 text-white max-[1150px]:text-center">{stepObj.numero_step}</Title>
        <span className="text-white font-bold uppercase max-[1150px]:text-center">{stepObj.titolo}</span>
        <span className="text-white max-[1150px]:text-center">{stepObj.testo}</span>
        {
            stepObj.immagine? <Image className="mt-[45px]" src={stepObj.immagine.url} width={stepObj.immagine.width} height={stepObj.immagine.height} alt={stepObj.titolo} />
                            : (stepObj.pulsante) && <div className="flex flex-col items-start mt-4 gap-1 max-[1150px]:items-center">
                                <span className="uppercase text-[var(--primary)] font-bold max-[1150px]:text-center">{stepObj.label_pulsante}</span>
                                <CustomButton href={stepObj.pulsante.url} target={stepObj.pulsante.target}>{stepObj.pulsante.title}</CustomButton>
                            </div>
        }
    </div>
}