import Taches from "../Components/Taches"
import Formulaire from "../Components/Formulaire"
import axios from "axios"
import { useEffect, useState } from "react"
import Portal from "../Components/Portal"
import useLocalStorage from 'use-local-storage'


// import { useHref } from "react-router"
export default function Home(){
const[tache, setTache]= useState([])
const[refresh, setRefresh]= useState([])
const[del, setDel]= useState([])
const[aff, setAff]= useState(false)
const[search, setSearch]= useState("")
const[theme, setTheme]= useLocalStorage('theme'? 'dark':'light')
    //recherche
    const handleSearch=(e)=>{
        const item= e.target.value;
        setSearch(item)
    }
// Dark mode
    const swichtTheme=()=>{
        const newTheme= theme==='light'?'dark':'light'
        setTheme(newTheme)
    }
    //pour laffichage des taches
    useEffect(()=>{
        axios.get('http://localhost:5200/api/tache/get').then((res)=>
            setTache(res.data)
            )
    },[aff, refresh, del]);
    return(
        <>
        <div className="Container-light" data-theme={theme}>
            <div className="sous"> 
                <div className="dessus">
                    <i className="fas fa-plus" onClick={()=> setAff(true)}></i>
                    <div className="icons">
                        <i className="fas fa-sun" onClick={swichtTheme}></i>
                        <i className="fas fa-gear"></i>
                    </div>
                    <i className="fas fa-x"></i>
                </div>
                <div className="dessous">
                    <h3><span>St</span>ick<span>No</span>te</h3>
                    <input type="text" name="search" id="search" placeholder="Recherche..." onChange={handleSearch}/>
                </div>
            </div>
            <div className="bloc-container">
                { 
                    tache
                    .filter((Tache)=>{
                        return Tache.contenue.includes(search)
                    })
                    .map((Tache, index) => (
                    <Taches key={index._id} Tache={Tache} setRefresh={setRefresh} setDel={setDel} theme={theme}/>))
                }
                <i className="fas fa-pen" onClick={()=> setAff(true)}></i>
            </div>
        </div>
        {aff && <Portal>
            <Formulaire close={setAff} theme={theme}/>
        </Portal>}
        </>
    )
}