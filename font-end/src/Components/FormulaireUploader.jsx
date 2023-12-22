import axios from "axios";
import { useState } from "react"


export default function FormulaireUploader({setModif,Data, setRefresh, theme}){
    const[titre, setTitre]=useState(Data.titre)
    // on met data.titre comme valeur auuseState de titre pour que si lord de a modification on n'y apporte pas de modif elle ne deviens pas vide c'est donc en gros initialement ca prend la valeur de data.titre lord de l'envoi cest pour ca qu'on met useState(Data.titre) plutot que useState('')
    const[contenue, setContenue]=useState(Data.contenue)

    const date= Data.updatedAt
    const time= Date.parse(date)
    const updata= new Date(time).toLocaleDateString("fr-FR",{
        // year: 'numeric',
        month:  'numeric',
        day: 'numeric',
        hour:"numeric",
        minute:'numeric'
    })

    const handleUpdateSubmit=(e)=>{
        if(contenue!==""){
                e.preventDefault();
            const NewData={
                _id: Data._id,
                titre: titre,
                contenue: contenue
            }
            axios.put(`http://localhost:5200/api/tache/${Data._id}`,NewData).then((res)=> {
                console.log(res.data)
                setRefresh([])
                setModif(false)
            })
            console.log(setModif);
        }else{
            setModif(false)
        }
    }
    return(
        <>
            <div className="Arriere"></div>
            <div className="form" data-theme={theme}>
                <form action="" onSubmit={handleUpdateSubmit}>
                    <div className="entete">
                        <div className="elements">
                            <i className="fas fa-xmark" onClick={()=>setModif(false)}></i>
                            <i className="fas fa-arrow-left-long" onClick={()=>setModif(false)}></i>
                            <i className="fas fa-circle-check" onClick={handleUpdateSubmit}></i>
                        </div>
                        <div className="titre">
                            <input type="text" id="titre" name="titre" className="titres" placeholder="Entrer le titre de la tache"
                            defaultValue={Data.titre}  onChange={(e)=> setTitre(e.target.value)} />
                            <div className="modifier">Modifier le : {updata}</div>
                        </div>
                    </div>
                    <div className="body-container">
                        <div className="text">
                            <textarea name="contenue" cols="35" rows="14" id="contenue" placeholder="Ecrivez votre texte..."
                            defaultValue={Data.contenue}  onChange={(e)=> setContenue(e.target.value)} ></textarea>
                        </div>
                        <div className="btn">
                            <button  className="btn2" id="valider">Modifier</button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}