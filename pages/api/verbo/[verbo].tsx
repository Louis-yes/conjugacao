import type { NextApiRequest, NextApiResponse } from 'next';
import type { Verbo, Tempo} from '../../../types/conjugacao';

import cheerio from 'cheerio';
import type { Cheerio, Element } from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import { isArray } from 'util';

const conseguirConjugacão = function(verbo:string): Promise<unknown> {
  const pp = new Promise(async (resolve, reject) => {
    axios.request({
        url:'https://www.conjugacao.com.br/verbo-'+verbo,
        // @ts-ignore
        responseEncoding: "binary"
    })
    .then((response) => {
        const v:Verbo = fazerVerbo(verbo, response.data)
        resolve(v)
    }).catch((e)=>{
      const nãoEncontrado = {
        mensagem: "verbo não encontrado",
        quizDizeres: []
      }
      reject(nãoEncontrado)
      // reject({result: 404, content: "verbo não encontrado"});
      // https://www.conjugacao.com.br/busca.php?q=verbo
      // tenta busca para quisdizer
    });
  });
  return pp;
}

function fazerVerbo(verbo:string, data:AxiosResponse["data"]): Verbo{
    const $ = cheerio.load(data);
    function tempos(): Cheerio<Element> { return $(`#conjugacao .tempos`) }
    
    function temposNoModoIndicativo(): Cheerio<Element> { return $(tempos().get(0)).find(".tempo-conjugacao") }
    function conjugacoesDoModoIndicativo(): Cheerio<Tempo> { return temposNoModoIndicativo().map((i,t) => tirarPessoaisGramaticasDoIndicativo(t)); }
    function tirarPessoaisGramaticasDoIndicativo(tempo: Element): Tempo { return arrayATempo( $(tempo).find(".f").map((i, ccc) => $(ccc).text()).toArray() ) }

    function temposNoModoSubjuntivo(): Cheerio<Element>  { return $(tempos().get(1)).find(".tempo-conjugacao") }
    function conjugacoesDoModoSubjuntivo(): Cheerio<Tempo> { return temposNoModoSubjuntivo().map((i,t) => tirarPessoaisGramaticasDoSubjuntivo(t)) }
    function tirarPessoaisGramaticasDoSubjuntivo(tempo: Element) { return arrayATempo( $(tempo).find(".f").map((i, ccc) => $(ccc).text()).toArray() ) }

    function arrayATempo(arr:string[]): Tempo {
      if(arr.length != 6) throw('Array tem o tamanho errado')
      let tempo:Tempo = {
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
      return tempo
    }
    
    const Verbo:Verbo = {
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
          futuroDoPretérito: conjugacoesDoModoIndicativo()[5]
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

export default (req: NextApiRequest, res: NextApiResponse) => {
    let { verbo } = req.query;

    if(Array.isArray(verbo)) verbo = verbo[0]

    conseguirConjugacão(verbo)
    .then((conjugacão: Verbo) => { res.status(200).json(conjugacão) })
    .catch(e => { res.status(404).send(e) })
}