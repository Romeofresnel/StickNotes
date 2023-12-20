import { createPortal } from "react-dom"

export default function Portals({children}) {
    return createPortal(children,
        document.getElementById('modals')
    )
}