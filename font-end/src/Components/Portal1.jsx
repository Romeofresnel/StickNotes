import { createPortal } from "react-dom"

export default function Portal1({children}) {
    return createPortal(children,
        document.getElementById('pic')
    )
}