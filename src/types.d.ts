export type validatingInputValueType = HTMLInputElement | HTMLSelectElement
export type experienceType = {
    id: number,
    company: string,
    role: string,
    start: string,
    end: string
}

export type workerType = {
    id: number,
    name: string,
    role: string,
    image: string,
    email: string,
    phone: number,
    experiences: experienceType[]
}