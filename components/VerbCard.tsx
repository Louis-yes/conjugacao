import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { getVerb } from "./storage"
import { verb, conjugation } from "../types/verb"
import { VerbEntry } from "../types/appTypes"

type props = {
    verb: VerbEntry
    groupSelect: Function
    onRemove: Function
}

export default function VerbCard(props:props){
    const [verb, setVerb] = useState<verb>();
    const [tense, setTense] = useState(props.verb.group);
    const select = useRef();
    let [conjugations, setConjugations] = useState({});

    useEffect(() => {
        getVerb(props.verb.verb).then((vv:verb) => {
            setConjugations(vv.conjugations.reduce((a,c) => {
                a[c.group] = a[c.group] || {}
                if(c.form) {
                    let plural = c.form[0] == 's' ? 'singular' : 'plural';
                    let person = Number(c.form[1]) - 1;
                    a[c.group][plural] = a[c.group][plural] || [] 
                    a[c.group][plural][person] = c.value;
                }
                return a
            },{}));
            setVerb(vv);
            setTense(props.verb.group);
            if(select.current) (select.current as HTMLSelectElement).value = props.verb.group; 
        })    
    }, [props.verb]);
    
    function selectChange(e){
        setTense(e.target.value)
        props.groupSelect(e.target.value)
    }

    function conjugationSection(){

        function hasforms(){
            return (
                <table>
                <tbody>
                    <tr>
                        <td>Eu</td><td>{conjugations[tense]['singular'][0]}</td>
                    </tr>
                    <tr>
                        <td>Tu</td><td>{conjugations[tense]['singular'][1]}</td>
                    </tr>
                    <tr>
                        <td>Você</td><td>{conjugations[tense]['singular'][2]}</td>
                    </tr>
                    <tr>
                        <td>Nós</td><td>{conjugations[tense]['plural'][0]}</td>
                    </tr>
                    <tr>
                        <td>Vós</td><td>{conjugations[tense]['plural'][1]}</td>
                    </tr>
                    <tr>
                        <td>Eles</td><td>{conjugations[tense]['plural'][2]}</td>
                    </tr>
                </tbody>
            </table>
            )
        }

        function pastParticiple() {}

        function gerund(){

        }

        return (
            <article>
            <select onChange={selectChange} defaultValue={tense} ref={select}>
                {Object.keys(conjugations).filter(k => {
                    return  k !== 'gerund'
                            && k !== 'infinitive/impersonal'
                            && !k.includes('pastparticiple/') 
                }).map(k => {
                    return <option key={k} value={k}>{k}</option>
                })}
            </select>
            {!!conjugations[tense].singular && hasforms()}  
            </article>
        )
    }

    return (
    <div className="card">
        <h1>{props.verb.verb}</h1>
        <span className="controls">
            <button className="remove" onClick={props.onRemove as MouseEventHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>

        </span>
        {verb ? conjugationSection() : "fetching verb"}
    </div>
    )
}