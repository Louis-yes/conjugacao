import Head from 'next/head'
import { useState, useEffect } from 'react'
import AddVerbForm from "../components/AddVerbForm"
import VerbCard from '../components/VerbCard'

type VerbEntry = {
    verb: string
    group: string
}

function HomePage() {
    const [listaDeErros, setListaDeErros] = useState([])
    const [verbos, setVerbos] = useState<any[]>([])
    const [verbEntries, setVerbEntries] = useState<VerbEntry[]>([])

    function agregarVerboNovo(verbo){
        const newv = [...verbos, verbo]
        localStorage.setItem("verbs", JSON.stringify(newv))
        if(verbos.map(v => v.word).indexOf(verbo.word) == -1) {
            setVerbos(newv);
        } else {
            console.log('hey')
        }
    }

    function selectVerbHandler(verb:string){
        const newVerb = {verb, group: "indicative/present"}
        setVerbEntries([...verbEntries, newVerb])
    }

    useEffect(() => {
        const vv = localStorage.getItem('verbs')
        if(vv){
            setVerbos(JSON.parse(vv))
        }
    }, []);

    return( 
    <div className="sans-serif pa3 debug">
        <Head>
            <title>Conjugação</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="sidebar">
            <AddVerbForm selectVerb={selectVerbHandler}></AddVerbForm>
        </div>
        <div className="main">
            <ul className='cards'>
                {/* {verbEntries.map(v => {
                    return <li key={v.verb}><VerbCard verb={v}></VerbCard></li>
                })} */}
                {verbEntries.map((v,i) => {
                    return <li key={i}>{v.verb}</li>
                })}
            </ul>
        </div>
        <p className='logotype'>
            Conjugação
        </p>
    </div>
    )
}
export default HomePage