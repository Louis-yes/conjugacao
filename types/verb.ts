export type verb = {
    conjugations: conjugation[]
    description: string
    etymology: string
    page_id: number
    word: string
}

export type conjugation = {
    group: string
    group_sort: number
    sort: number
    value: string
    form: string
}

