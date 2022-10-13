const conjugacao = require("./conjugacao.js")

conjugacao(process.argv[2]).then((cc) => { 
    console.log(JSON.stringify(cc, false, '\t')) 
}).catch((e) => {console.log(e)})