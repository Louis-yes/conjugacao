import { useEffect, useRef, useState } from 'react'
import { text } from 'stream/consumers'
import { VerbCollection, VerbEntry } from '../types/appTypes'

type props = {
    collection: VerbEntry[]
}

export function Editor(props){
    const editor = useRef()
    useEffect(() => {
        if(props.collection){
            setContent(collectionToText(props.collection))
        }
    }, [props.collection])

    function collectionToText(cc){
        return cc.map(ve => {
            return `${ve.verb}: ${ve.group}` 
        }).join("\n")
    }

    function textToCollection(text: string):VerbEntry[]{
        return text.split("\n").map(ll => {
            let line = ll.split(':')
            let verb = line[0]
            let group = line.length > 1 ? line[1].trim() : 'indicative/present'
            return {verb, group} as VerbEntry  
        })
    }

    function log(){
        //@ts-ignore
        if (editor.current) console.log(textToCollection(editor.current.value))
    }

    function setContent(str:string){
        if (editor.current) (editor.current as HTMLTextAreaElement).value = str 
    }

    return (
        <div id="editor" >
        <textarea name="" ref={editor}>
        </textarea>
        <button onClick={log}>
            add to collection +
        </button>
        </div>

    )
}