import { version } from "os";
import { useState } from "react";

type Props = {
    selectVerb: (verb:string) => void;
}

export default function AddVerbForm({selectVerb}:Props){
    const [input, setInput] = useState("");
    const [allVerbs, addToAllVerbs] = useState({});
    const [verbOptions, setVerbOptions] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
    }

    function onChange(e){
        const text = e.target.value.toLowerCase()
        setInput(text);
        if(text.length < 2) { 
            setVerbOptions([]) 
        } else {
            filterVerbOptions(text);
        }
    }

    function filterVerbOptions(text){
        const firstLetter = text[0];
        getOptions(firstLetter).then(options => {
            setVerbOptions(options.filter(v => v.substring(0, text.length) == text))
        })
    }

    function getOptions(letter): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if(allVerbs[letter]){
                resolve(allVerbs[letter])
            } else {
                fetch(`portuguese/categories/${letter}.json`).then(res => res.json()).then(options => {
                    const nv = allVerbs;
                    nv[letter] = options;
                    addToAllVerbs(nv);
                    resolve(options);
                })
            }
        })
    }

    function setSelectedVerb(verb){
        selectVerb(verb);
    }

    return (
        <div className="add-verb">
            <form onSubmit={handleSubmit}>
                <input name="verbs" type="text" onChange={onChange} placeholder="começa com ..."/>
            </form>
            <p className="list-label">
                    {!!verbOptions.length && `verbos que começam com "${input}..."`}
            </p>
            <ul className="verblist">
                {verbOptions.map(v => <li key={v} className="verb" onClick={() => setSelectedVerb(v)}>{v}</li>)}
            </ul>
        </div>
    )
}