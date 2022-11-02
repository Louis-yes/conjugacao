import localforage from "localforage";

const verbOptions = localforage.createInstance({name: 'verbOptionsStorage'});
const verbs = localforage.createInstance({name: 'verbStorage'});
const userContent = localforage.createInstance({name: 'userContent'});

export function getVerb(verb:string){
    return new Promise((resolve, reject) => {
        verbs.getItem(verb).then(v => {
            if (v) {
                resolve(v)
            } else {
                if(! verb) { 
                    reject(v);
                    return;
                }
                let fl = verb.substring(0,1)
                fetch(`portuguese/content/${fl}/${verb}.json`).then(res => res.json()).then(w => {
                    verbs.setItem(verb, w)
                    resolve(w)
                }).catch(r => {
                    reject(v)
                })
            }
        })
    })
}

export { userContent }