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

    function row(subjectPronoun, conjugation){
        return (<tr><td className="pr-5">{subjectPronoun}</td><td>{conjugation}</td></tr>)
    }

    function conjugationTable(tense){
        return [
            ["Eu", conjugations[tense]['singular'][0]],
            ["Tu", conjugations[tense]['singular'][1]],
            ["Você", conjugations[tense]['singular'][2]],
            ["Nós", conjugations[tense]['plural'][0]],
            ["Vós", conjugations[tense]['plural'][1]],
            ["Eles", conjugations[tense]['plural'][2]],
        ]
    }

    function conjugationSection(){
        function hasforms(){
            return (
                <table className="table-fixed mt-2">
                <tbody>
                    {conjugationTable(tense).map(cc => {return row(cc[0],cc[1])})}
                </tbody>
            </table>
            )
        }

        function pastParticiple() {}

        function gerund(){

        }

        return (
            <article>
            <select className="py-2 px-3 w-full bg-slate-50 select appearance-none" onChange={selectChange} defaultValue={tense} ref={select}>
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
    <div className="card relative p-3 drop-shadow bg-white m-3">
        <h1 className="font-bold">{props.verb.verb}</h1>
        <span className="">
            <button className="remove absolute top-3 right-3" onClick={props.onRemove as MouseEventHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>

        </span>
        {verb ? conjugationSection() : "fetching verb"}
    </div>
    )
}