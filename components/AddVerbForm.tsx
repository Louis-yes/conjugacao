import { useState } from "react";

type Props = {
    pedidos: (verbos:string[]) => void;
    confirmados: (verbo:any) => void;
    erros: (error:any) => void;    
}

type error = {
    verbo: string;
    quizDizeres ?: string[];
}

export default function AddVerbForm({pedidos, confirmados, erros}:Props){
    const [verbo, setVerbo] = useState("");

    function manageErrors(response) { 
        if (!response.ok) { 
               if (response.status == 404){ 
                      throw Error(response.statusText); 
                }
               return ; // will print '200 - ok'
         }
        return response;
    }

    function handleSubmit(e) {
        e.preventDefault();
        // for each verb fetch it's definition
        // push into verb array
        const listaVerbos = verbo.split(',');
        pedidos(listaVerbos)
        listaVerbos.forEach(v => {
            // check local store
            // else
            const first = v[0]
            fetch(`verb-data/json/portuguese/content/${first}/${v}.json`).then(manageErrors).then(res => res.json()).then((vv) => {
                confirmados(vv);         
            }).catch(err => {
                const error = {
                    verbo:v
                }
                erros(error);
            });
        })
    }
    function verbChange(e){
        setVerbo(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit} className="add-verb">
            <input name="verbos" type="text" onChange={verbChange}/>
            <input className="conjugar" type="submit" value="conjugar" />
        </form>
    )
}