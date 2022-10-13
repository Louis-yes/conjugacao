import { useState } from "react";

export default function VerbCard({verb}){
    // conjugations []
    // tenses
    //  singular
    //  plural 
    // 

    
    const conjugations = verb.conjugations.reduce((a,c) => {
        console.log(c)
        a[c.group] = a[c.group] || {}
        if(c.form) {
            let plural = c.form[0] == 's' ? 'singular' : 'plural';
            let person = Number(c.form[1]) - 1;
            a[c.group][plural] = a[c.group][plural] || [] 
            a[c.group][plural][person] = c.value;
        }
        return a
    },{})
    const [tense, setTense] = useState('indicative/present')

    function selectChange(e){
        setTense(e.target.value)
    }

    return (
        <div className="card">

        <h1>{verb.word}</h1>
        <select onChange={selectChange} defaultValue="indicative/present">
            {Object.keys(conjugations).map(k => {
                return <option key={k} value={k}>{k}</option>
            })}
        </select>
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
    </div>
    )
}