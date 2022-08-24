import { useState } from "react";
import type { Verbo } from "../types/conjugacao"

export default function AddVerbForm(props){
    const [verbo, setVerbo] = useState("");
    const [verbos, setVerbos] = useState({});
    const [quisdizeres, setQuizdizeres] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        // for each verb fetch it's definition
        // push into verb array
        const listaVerbos = verbo.split(',');
        listaVerbos.forEach(v => {
            if(!verbos[v]){
                // check local store
                // else
                fetch('api/verbo/'+verbo).then(res => res.json()).then((vv: Verbo) => {
                    const nv = {}
                    nv[verbo] = vv
                    setVerbos({...verbos, ...nv})
                }).catch(err => {
                    
                });
            }
        })
    }
    function verbChange(e){
        setVerbo(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="verbos" type="text" onChange={verbChange}/>
            <input type="submit" value="conjuga" />
            <ul>
                { Object.keys(verbos).map((v,i) => <li key={i}>{v}</li>) }
            </ul>
        </form>
    )
}