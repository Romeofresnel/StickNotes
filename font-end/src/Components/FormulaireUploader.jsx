import axios from "axios";
import { useState } from "react"


export default function FormulaireUploader({setModif,Data, setRefresh, theme}){
    const[titre, setTitre]=useState('')
    const[contenue, setContenue]=useState('')
    const[moon, setMoon]=useState(false)
    useEffect(() => {
        const saveData = () => {
            const NewData={
                _id: Data._id,
                titre: titre,
                contenue: contenue
            };
          axios.post(`http://localhost:5200/api/tache/${Data._id}`,NewData)
            .then((res) => {
              console.log(res.data);
              setRefresh([])
              setModif(false)
            })
            .catch((error) => {
              console.error(error);
            });
        };
    
        const timer = setTimeout(saveData, 3000); // Sauvegarder automatiquement toutes les 5 secondes
    
        return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
    }, [titre, contenue]);

    const handleUpdateSubmit=(e)=>{
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
                            <i className="fas fa-circle-check"></i>
                        </div>
                        <div className="titre">
                            <input type="text" id="titre" name="titre" placeholder="Entrer le titre de la tache"
                            defaultValue={Data.titre}  onChange={(e)=> setTitre(e.target.value)} />
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
            {moon && <Portal1>
                <Image close={setMoon} data={Data} theme={theme}/>
            </Portal1>}
        </>
    )
}