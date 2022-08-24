export interface Verbo {
    formasImpessoais: {
        infinitivo: string,
        // gerúndio: string,
        // particípio: string
    },
    formasPessoais: {
        modoIndicativo: {
            presente: Tempo,
            pretéritoImperfeito: Tempo,
            pretéritoPerfeito: Tempo,
            pretéritoMaisQuePerfeito: Tempo,
            futuroDoPresente: Tempo,
            futuroDoPretérito: Tempo,
        },
        modoSubjuntivo: {
            presente: Tempo,
            pretéritoImperfeito: Tempo,
            futuro: Tempo
        }
        // modoImperativo: {
        //     afirmativo: Tempo,
        //     negativo: Tempo
        // }
        // infinitivo: Tempo
    }
}

export interface Tempo {
    singular: {
        primeira?: string,
        segunda: string,
        terceira: string
    },
    plural: {
        primeira: string,
        segunda: string,
        terceira: string
    }
}