import { useState } from "react"

export default function learning(){
    const[gew, setGew]= useState('')

    function Name({click, onChange}){
        return <input type="text" className="nom" click={click} onChange={(e)=> console.log(e.target.value)}></input>
    }

    return(
        <>
            <form>
                <Name click={gew} onChange={setGew}/>
                <button disabled={!gew}>submit</button>
            </form>
        </>
    )
}