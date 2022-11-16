import { version } from "os";
import { useRef, useState } from "react";

type Props = {
    selectVerb: (verb:string) => void;
    toggleFocus: (focus:boolean) => void;
}

export default function AddVerbForm({selectVerb, toggleFocus}:Props){
    const [input, setInput] = useState("");
    const [allVerbs, addToAllVerbs] = useState({});
    const [verbOptions, setVerbOptions] = useState([]);
    const [selected, setSelected] = useState(-1)

    const inputEl = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        setSelectedVerb(verbOptions[selected < 0 ? 0 : selected]);
        setVerbOptions([]);
        toggleFocus(false);
        setInput('');
        setSelected(-1);
        (inputEl.current as HTMLInputElement).value = '';
    }

    function onChange(e){
        const text = e.target.value.toLowerCase()
        setInput(text);
        if(text.length < 2) { 
            setVerbOptions([])
            toggleFocus(false);
        } else {
            filterVerbOptions(text);
        }
    }

    function filterVerbOptions(text){
        const firstLetter = text[0];
        getOptions(firstLetter).then(options => {
            setVerbOptions(options.filter(v => v.substring(0, text.length) == text))
        })
        toggleFocus(true);
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

    function handleKeyPress(e){
        switch(e.key){
            case 'ArrowUp': 
                setSelected(selected < 1 ? verbOptions.length - 1 : selected - 1);
                break;
            case 'ArrowDown':
                setSelected(selected == verbOptions.length - 1 ? 0 : selected + 1);
                break;
        }
    }

    function setSelectedVerb(verb){
        if(!verb) return;
        setVerbOptions([]);
        toggleFocus(false);
        setInput('');
        setSelected(-1);
        (inputEl.current as HTMLInputElement).value = '';
        selectVerb(verb);
    }   

    return (
        <div className="text-black p-3">
            <form onSubmit={handleSubmit}>
                <input 
                className=" rounded p-2 w-full border-solid border text-black border-black 
                            active:outline-0 active:border" 
                name="verbs" type="text" onChange={onChange} ref={inputEl} onKeyDown={handleKeyPress} placeholder="começa com ..."/>
            </form>
            <p className="list-label">
                    {!!verbOptions.length && `verbos que começam com "${input}..."`}
            </p>
            <ul className="verblist w-full">
                {verbOptions.map((v,i) => <li key={v} className={["verb", i == selected ? 'text-blue-400' : '', "inline-block p-1 px-2 bg-black text-white mr-1 mb-1 rounded hover:text-blue-400 cursor-pointer"].join(' ')} onClick={() => setSelectedVerb(v)}>{v}</li>)}
            </ul>
        </div>
    )
}