import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { getVerb } from "./storage"
import { verb, verbType, form, mood, tense, grammaticalPerson, grammaticalNumber, conjugation } from "../utils/verb"
import makeVerb from "../utils/verb";
import { VerbEntry } from "../types/appTypes"

type props = {
    verb: string
    group: string
    groupSelect: Function
    onRemove: Function
}

const singularPronouns = ["Eu", "Tu", "Ele/Você"]
const pluralPronouns = ["Nós", "Vós", "Eles"]
    

export default function VerbCard(props:props){
    const [verb, setVerb] = useState<verb>();
    const [tense, setTense] = useState(props.group);
    const select = useRef();
    let [conjugations, setConjugations] = useState({});
    

    useEffect(() => {
        if(props.verb){
            getVerb(props.verb).then((vv:verb) => {
                setVerb(makeVerb(vv))
            }).catch(er => {
                // bad luck
            })
        }
    }, [props.verb])

    return (
    <div className={`card relative p-5 drop-shadow bg-white m-3 max-w-2xl `}>     
        <span className="">
            <button className="remove absolute top-3 right-3" onClick={props.onRemove as MouseEventHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </span>
        {verb ? (
        <div>
            <section id="verb-card-heading" className="grid grid-cols-3 gap-4 mb-5">
                <div className="">
                    <Label>infinitive / <em>impersonal</em></Label>
                    <h1 className="font-bold text-2xl capitalize">{verb.query("INFINITIVE")[0].value}</h1>
                </div>
                <div>
                    <Label>
                        gerund
                    </Label>
                    <p>{verb.query("GERUND")[0].value}</p>
                </div>
                <div>
                <Label>past participle</Label>
                <p>{verb.query("PAST-PARTICIPLE")[0].value}</p>
                </div>
            </section>
            <section className="indicative verbtable flex mb-5">
                <Pronouns />
                <div className="conjugations flex w-full">
                    <div className="group flex flex-wrap w-full">
                        <Label className="mb-3">indicative</Label>
                        <ConjugationList conjugations={verb.query("PRESENT", "INDICATIVE")} title="present"/>
                        <ConjugationList conjugations={verb.query("PRETERITE", "INDICATIVE")} title="preterite"/>
                        <ConjugationList conjugations={verb.query("IMPERFECT", "INDICATIVE")} title="imperfect"/>
                        <ConjugationList conjugations={verb.query("PLUPERFECT", "INDICATIVE")} title="pluperfect"/>
                        <ConjugationList conjugations={verb.query("FUTURE", "INDICATIVE")} title="future"/>                   
                    </div>
                </div>
            </section>
            <section className="subjunctive verbtable flex mb-5">
                <Pronouns />
                <div className="conjugations flex w-full">
                    <div className="group flex flex-wrap">
                        <Label className="mb-3">conditional</Label>
                        <ConjugationList conjugations={verb.query("CONDITIONAL")} title="present"/>
                    </div>
                    <div className="group flex flex-wrap w-full pl-4 border-l border-slate">
                        <Label className="mb-3">subjunctive</Label>
                        <ConjugationList conjugations={verb.query("PRESENT", "SUBJUNCTIVE")} title="present"/>
                        <ConjugationList conjugations={verb.query("IMPERFECT", "SUBJUNCTIVE")} title="imperfect"/>
                        <ConjugationList conjugations={verb.query("FUTURE", "SUBJUNCTIVE")} title="future"/>                   
                    </div>
                </div>
            </section>
            <section className="subjunctive verbtable flex mb-5">
                <Pronouns />
                <div className="conjugations flex w-full">
                    <div className="group flex flex-wrap">
                        <Label className={`mb-3`}>imperative</Label>
                        <ConjugationList conjugations={[{value: "✧"},...verb.query("IMPERATIVE", "AFFIRMATIVE")]} title="affirmative"/>
                        <ConjugationList conjugations={[{value: "✧"},...verb.query("IMPERATIVE", "NEGATIVE")]} title="negative"/>
                    </div>
                    <div className="group flex flex-wrap pl-4 border-l border-slate">
                        <Label className="mb-3">infinitive</Label>
                        <ConjugationList conjugations={verb.query("PERSONAL-INFINITIVE")} title="personal "/>
                    </div>
                </div>
            </section>
        </div>
        ) : "fetching verb"}
    </div>
    )
}

function Label({children, className = ""}){
    return <h2 className={`w-full text-sm text-slate-400 block text-sm ${className}`}> {children} </h2>
}

function Pronouns(){
    return (
        <article className="pr-7 flex items-end text-sm">
            <ul className="mt-6"> 
                {singularPronouns.map(p => { return (<li className="leading-6" key={p}>{p}</li>)})}
                {pluralPronouns.map(p => { return (<li className="[&:nth-child(4)]:mt-3 leading-6" key={p}>{p}</li>)})}     
            </ul>
        </article>
    )
}


function ConjugationList({conjugations, title}){
    return (
        <article className="pr-3">
        <h3 className="text-sm italic">{title}</h3>
        <ul> {conjugations.map((c,i) => { return(<li className="[&:nth-child(4)]:mt-3" key={i}>{c.value.split("-")[0]}</li>) })} </ul>
        </article>
    )
}