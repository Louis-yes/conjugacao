import Head from 'next/head'
import { useState, useEffect } from 'react'
import AddVerbForm from "../components/AddVerbForm"
import { Editor } from '../components/Editor'
import VerbCard from '../components/VerbCard'
import { VerbEntry, VerbCollection } from '../types/appTypes'
import { userContent } from '../components/storage'



function HomePage() {
    const [listaDeErros, setListaDeErros] = useState([])
    const [verbos, setVerbos] = useState<any[]>([])
    const [verbEntries, setVerbEntries] = useState<VerbEntry[]>([])
    const [collectionTitle, setCollectionTitle] = useState("untitled")
    const [blurMain, toggleBlurMain] = useState(false)

    function selectVerbHandler(verb:string){
        const newVerb = {verb, group: "indicative/present"}
        saveVerbEntries([newVerb, ...verbEntries])
    }

    function saveVerbEntries(newVerbEntries){
        setVerbEntries(newVerbEntries)
        userContent.setItem(collectionTitle, newVerbEntries)
    }

    function verbGroupUpdate(i, group){
        verbEntries[i].group = group
        console.log(verbEntries[i])
        saveVerbEntries(verbEntries)
    }

    function removeVerb(i){
        let nv = verbEntries.filter((v,ii) => i !== ii)
        saveVerbEntries(nv)
    }

    function formFocus(focus){
        toggleBlurMain(focus)
    }

    useEffect(() => {
        const vv = localStorage.getItem('verbs')
        if(vv){
            setVerbos(JSON.parse(vv))
        }
        userContent.getItem('selectedCollection').then((sc:string) => {
            if(sc){
                setCollectionTitle(sc)
            }
            userContent.getItem(collectionTitle).then((collection:VerbEntry[]) => {
                if(collection){
                    setVerbEntries(collection)
                }
            })
        })
    }, []);

    return( 
    <div className="sans-serif pa3 debug">
        <Head>
            <title>Conjugação</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width,  maximum-scale=1.0, user-scalable=0" />
            <link href="favicon.ico" rel="shortcut icon"></link>
        </Head>
        <div className="sidebar">
            <AddVerbForm selectVerb={selectVerbHandler} toggleFocus={formFocus}></AddVerbForm>
        </div>
        <div className={["main", blurMain ? "blur-main" : ""].join(" ")}>
        {!!verbEntries.length && (
            <ul className='cards'>
                {verbEntries.map((v,i) => {
                    return <li key={i}><VerbCard verb={v} groupSelect={g => verbGroupUpdate(i, g)} onRemove={() => removeVerb(i)}></VerbCard></li>
                })}
            </ul>)
        }
        {!verbEntries.length && (
            <p>
                No verbs to show! <br />Try adding a couple using the input to the left
            </p>
        )}

        </div>
        {/* <Editor collection={verbEntries}></Editor> */}
        <p className='logotype'>
            Conjugação
        </p>
    </div>
    )
}
export default HomePage