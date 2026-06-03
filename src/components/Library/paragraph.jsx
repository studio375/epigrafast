import parse from 'html-react-parser'
export default function Paragraph({children, ...props}){
    return <span {...props} className={`${props.className || ''}`}>{parse(children)}</span>
}