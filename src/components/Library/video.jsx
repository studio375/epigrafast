"use client"
export default function Video({videoObj, ...props}){
    return <video width={videoObj.width} height={videoObj.height} {...props} autoPlay muted loop playsInline onContextMenu={() => {return false;}}> 
        <source src={`${videoObj.url}#t=0.1`} type="video/mp4" />
    </video>
}