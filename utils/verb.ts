export default function verb(data) {
    const conjugations: conjugation[] = data.conjugations.map((c) => {
        if(c.group == "gerund"){
            let form:form = "GERUND"
            let type: verbType = "NON-FINITE"
            let value = c.value
            return {
                value,
                form,
                type
            }
        } else if(c.group == "conditional"){
            let value = c.value
            let number:grammaticalNumber = c.form[0] == "s" ? "SINGULAR" : "PLURAL"
            let person:grammaticalPerson = ["FIRST", "SECOND", "THIRD"][Number(c.form[1] - 1)] as grammaticalPerson
            let type:verbType = "FINITE"
            let mood:mood = "CONDITIONAL"

            return {
                value,
                number,
                person,
                mood,
                type
            }
        } else if(c.group == "infinitive/impersonal"){
            let form: form = "INFINITIVE"
            let value = c.value
            let type:verbType = "NON-FINITE"
            return {
                value,
                form,
                type
            }
        } else if(c.group.includes("/")){
            if (c.group.includes("pastparticiple")) {
                if(c.group.includes("masculine") && c.form == "s"){
                    let form:form = "PAST-PARTICIPLE"
                    let value = c.value
                    let type:verbType = "NON-FINITE"
                    return {
                        value,
                        type,
                        form
                    }
                } else {
                    return null
                }
            } else if (c.group.includes("infinitive/")) {
                let number:grammaticalNumber = c.form[0] == "s" ? "SINGULAR" : "PLURAL"
                let person:grammaticalPerson = ["FIRST", "SECOND", "THIRD"][Number(c.form[1] - 1)] as grammaticalPerson
                let type:verbType = "NON-FINITE"
                let form:form = "PERSONAL-INFINITIVE"
                let value = c.value
                return {
                    value, 
                    type, 
                    form,
                    number, 
                    person, 
                }
            } else {
                let mood:mood = c.group.split("/")[0].toUpperCase()
                let tense:tense = c.group.split("/")[1].toUpperCase()
                let number:grammaticalNumber = c.form[0] == "s" ? "SINGULAR" : "PLURAL"
                let person:grammaticalPerson = ["FIRST", "SECOND", "THIRD"][Number(c.form[1] - 1)] as grammaticalPerson
                let type:verbType = "FINITE" 

                return {
                    value: c.value,
                    type,
                    mood,
                    tense,
                    number,
                    person,
                }
            }
        } else {
            return null
        }
    }).filter(c => c)

    function query(...args: (verbType | grammaticalNumber | grammaticalPerson | mood | tense | form)[]) {
        let filters = args;
        let matches = filters.reduce((cc, filter) => {
            cc = cc.filter(conjugation => hasMatch(conjugation, filter))
            return cc
        }, conjugations)
        return matches
    }

    return {
        conjugations,
        query
    }
}

function hasMatch(conjugation, query){
    return Object.keys(conjugation).some(k => conjugation[k] == query)
}

export type verbType = "FINITE" | "NON-FINITE"
export type grammaticalPerson  = "FIRST" | "SECOND" | "THIRD"
export type grammaticalNumber = "SINGULAR" | "PLURAL"
export type mood = "INDICATIVE" | "SUBJUNCTIVE" | "IMPERATIVE" | "CONDITIONAL"
export type tense = "PRESENT" | "PRETERITE" | "PLUPERFECT" | "IMPERFECT" | "FUTURE" | "AFFIRMATIVE" | "NEGATIVE"
export type form = "GERUND" | "INFINITIVE" | "PAST-PARTICIPLE" | "PERSONAL-INFINITIVE"

export type conjugation = {
    value: string,
    type: verbType
    form?: form
    mood?: mood
    person?: grammaticalPerson
    number?: grammaticalNumber
    tense?: tense
}

export type verb = {
    conjugations: conjugation[]
    query: (...args: (verbType | grammaticalNumber | grammaticalPerson | mood | tense | form)[]) => conjugation[]
}

