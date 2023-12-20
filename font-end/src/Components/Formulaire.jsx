import axios from "axios"
import { useEffect, useState } from "react"



export default function Formulaire({close, theme}){
    const[titre, setTitre]=useState('')
    const[contenue, setContenue]=useState('')
    const[aff, setAff]=useState(false)
    useEffect(() => {
       if(contenue!==''){
        const saveData = () => {
            const formData = {
              titre: titre,
              contenue: contenue
            };
            axios.post("http://localhost:5200/api/tache/post", formData)
              .then((res) => {
                console.log(res.data);
              })
              .catch((error) => {
                console.error(error);
              });
          };
      
          const timer = setInterval(saveData, 3000); // Sauvegarder automatiquement toutes les 5 secondes
      
          return () => clearInterval(timer); // Nettoyer le timer lors du démontage du composant
       }
    }, [titre, contenue]);

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            titre: titre,
            contenue: contenue
        }
        axios.post('http://localhost:5200/api/tache/post',formData).then((res)=>{
            console.log(res.data)
            close(false);
        })
    }
    return(
        <>
            <div className="Arriere"></div>
            <div className="form" data-theme={theme}>
                <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="entete">
                        <div className="elements">
                            <i className="fas fa-xmark" onClick={() => close(false)}></i>
                            <i className="fas fa-arrow-left-long" onClick={() => close(false)}></i>
                            <i className="fas fa-circle-check" onClick={handleSubmit}></i>
                        </div>
                        <div className="titre">
                            <input type="text" id="titre" name="titre" placeholder="Entrer le titre de la tache" value={titre} onChange={(e)=> setTitre(e.target.value)}/>
                        </div>
                    </div>
                    <div className="body-container">
                        <div className="text" onClick={()=> setAff(false)}>
                            <textarea name="contenue" cols="35" rows="14" id="contenue" placeholder="Ecrivez votre texte..." value={contenue} onChange={(e)=> setContenue(e.target.value)}></textarea>
                        </div>
                        <div className="btn">
                            <button  className="btn2" id="valider" onSubmit={handleSubmit}>Enregistrer</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </>
    )
}