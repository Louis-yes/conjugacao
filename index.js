const conjugacao = require("./conjugacao.js")

conjugacao(process.argv[2]).then((cc) => { console.log(cc) }).catch((e) => {console.log(e)})