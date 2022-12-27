export type VerbEntry = {
    verb: string
    group: string
}

export type VerbCollection = {
    title: string,
    verbs: VerbEntry[]
}

export type userContent = {
    collections: VerbCollection[]
}