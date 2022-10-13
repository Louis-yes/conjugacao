import Head from 'next/head'
import { useState, useEffect } from 'react'
import AddVerbForm from "../components/AddVerbForm"
import VerbCard from '../components/VerbCard'


function HomePage() {
    const [listaDeErros, setListaDeErros] = useState([])
    const [verbos, setVerbos] = useState<any[]>([])
    const [pedidos, setPedidos] = useState<String[]>([])

    function pedidosCB (verbos:string[]){
        return setPedidos(verbos)
    }
    function errosCB (error) {
        const novosErros = [...listaDeErros, error.verbo + ' - não achado']
        setListaDeErros(novosErros)
    }

    function agregarVerboNovo(verbo){
        const newv = [...verbos, verbo]
        localStorage.setItem("verbs", JSON.stringify(newv))
        if(verbos.map(v => v.word).indexOf(verbo.word) == -1) {
            setVerbos(newv);
        } else {
            console.log('hey')
        }
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
            <AddVerbForm pedidos={pedidosCB} confirmados={agregarVerboNovo} erros={errosCB}></AddVerbForm>
        </div>
        <div className="main">
            <ul className='cards'>
                {verbos.map(v => {
                    return <li key={v.word}><VerbCard verb={v}></VerbCard></li>
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