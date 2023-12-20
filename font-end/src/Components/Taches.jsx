import { useEffect, useState } from "react"
import FormulaireUploader from "./FormulaireUploader"
import { createPortal } from "react-dom"
import axios from "axios"
import Portals from "../Components/Portals"

export default function Taches({Tache, setRefresh, setDel, theme}){
    const[modif, setModif]=useState(false)
    //configuration de la date au format fr-FR
    const date= Tache.updatedAt
    const time= Date.parse(date)
    const updata= new Date(time).toLocaleDateString("fr-FR",{
        // year: 'numeric',
        month:  'long',
        day: 'numeric'
    })
    // function de suppression d'une tache dans la base de donnes

        const handlDelete=()=>{
            axios.delete(`http://localhost:5200/api/tache/${Tache._id}`).then((res)=>{
                console.log(res);
                setDel([])
            } )
        }
    
    return(
        <>
        <div className="Tache" data-theme={theme}>
            <div className="tache-container"  onClick={()=> setModif(true)}>
                <div className="title">
                    <div className="titres">{Tache.titre}</div>
                    <div className="date">{updata}</div>
                </div>
                <div className="infos">
                    <p>{Tache.contenue}</p>
                </div>
            </div>
            <div className="trash" onClick={handlDelete}><i className="fas fa-trash"></i></div>
        </div>
        {modif && <Portals>
            <FormulaireUploader Data={Tache} setModif={setModif} setRefresh={setRefresh} theme={theme}/>
        </Portals>}
    </>
    )
}