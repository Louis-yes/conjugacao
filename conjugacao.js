const cheerio = require('cheerio');
const axios = require('axios');

const cc = function(verbo){
  const pp = new Promise(async (resolve, reject) => {
    axios.request({
        url:'https://www.conjugacao.com.br/verbo-'+verbo,
        responseEncoding: "binary"
    })
    .then((response) => {
        resolve(fazerVerbo(verbo, response.data))
    }).catch((e)=>{
        console.log(e)
        reject("hey")
        // https://www.conjugacao.com.br/busca.php?q=verbo
        // tenta busca para quisdizer
    })
  })
  return pp
}

function fazerVerbo(verbo, data){
    const $ = cheerio.load(data)
    let vrb = {
        verbo: verbo,
        conjugacao: []
    }
    vrb.conjugacao = $('.tempos').map((i,t) => {
        const tempo = {
            modoconjugacao: $(t).find('.modoconjuga').text(),
            modo: $(t).find('.modo').text(),
            tempo_conjugacoes : []
        }
        tempo.tempo_conjugacoes = $(t).find('.tempo-conjugacao').map((a,b) => {
            return {
                title: $(b).find('.tempo-conjugacao-titulo').text()
            }
        }).toArray()
        return tempo
    }).toArray()
    return vrb
}

module.exports = cc

// .tempos
// 	h3.modoconjugo
// 	.tempo-conjugacao
// 		h4.tempo-conjugacao-titulo
// 		p - table of conjugations
// 			span
// 				span
// 					span - grammatical person
// 					span.f - verb conjugation

/** 
tempos:
[
  {
    modoconjugo: title,
    tempo-conjugacoes: [
      {
        tempo: tempo-conjugacao-titulo
        conjugacoes: [
          { 
            pessoa gramatical: "eu",
            conjugacao: "canto",
            irregular: false
          }
        ]
        }
        ]
      }
    ]
    
  }
]

**/