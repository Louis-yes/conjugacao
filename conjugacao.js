const cheerio = require('cheerio');
const axios = require('axios');

const cc = function(verbo){
  const pp = new Promise(async (resolve, reject) => {
    axios.request({
        url:'https://www.conjugacao.com.br/verbo-'+verbo,
        responseEncoding: "binary"
    })
    .then((response) => {
        resolve({result: 200, content: fazerVerbo(verbo, response.data)})
    }).catch((e)=>{
      reject(e)
      // reject({result: 404, content: "verbo não encontrado"});
      // https://www.conjugacao.com.br/busca.php?q=verbo
      // tenta busca para quisdizer
    })
  })
  return pp
}

function fazerVerbo(verbo, data){
    const $ = cheerio.load(data)
    function tempos() { return $(`#conjugacao .tempos`) }
    
    function temposNoModoIndicativo() { return $(tempos().get(0)).find(".tempo-conjugacao") }
    function conjugacoesDoModoIndicativo() { return temposNoModoIndicativo().map((i,t) => tirarPessoaisGramaticasDoIndicativo(t)); }
    function tirarPessoaisGramaticasDoIndicativo(tempo) { return arrayATempo( $(tempo).find(".f").map((i, ccc) => $(ccc).text()).toArray() ) }

    function temposNoModoSubjuntivo() { return $(tempos().get(1)).find(".tempo-conjugacao") }
    function conjugacoesDoModoSubjuntivo() { return temposNoModoSubjuntivo().map((i,t) => tirarPessoaisGramaticasDoSubjuntivo(t)) }
    function tirarPessoaisGramaticasDoSubjuntivo(tempo) { return arrayATempo( $(tempo).find(".f").map((i, ccc) => $(ccc).text()).toArray() ) }

    function arrayATempo(arr){
      if(arr.length != 6) throw('Array tem o tamanho errado')
      return {
        singular: {
          primeira: arr[0],
          segunda: arr[1],
          terceira: arr[2]
        },
        plural: {
          primeira: arr[3],
          segunda: arr[4],
          terceira: arr[5]
        }
      }
    }
    
    const Verbo = {
      formasImpessoais: {
        infinitivo: verbo,
        //gerundio: ,
        //particípio: ,
      },
      formasPessoais: {
        modoIndicativo: {
          presente: conjugacoesDoModoIndicativo()[0],
          pretéritoImperfeito: conjugacoesDoModoIndicativo()[1],
          pretéritoPerfeito: conjugacoesDoModoIndicativo()[2],
          pretéritoMaisQuePerfeito: conjugacoesDoModoIndicativo()[3],
          futuroDoPresente: conjugacoesDoModoIndicativo()[4],
          futuroDoPréterito: conjugacoesDoModoIndicativo()[5]
        },
        modoSubjuntivo: {
          presente: conjugacoesDoModoSubjuntivo()[0],
          pretéritoImperfeito: conjugacoesDoModoSubjuntivo()[1],
          futuro: conjugacoesDoModoSubjuntivo()[2]
        }
        // modoImperativo: {
        //     afirmativo: Tempo,
        //     negativo: Tempo
        // }
        // infinitivo: Tempo
      }
    }

    return Verbo
}

module.exports = cc