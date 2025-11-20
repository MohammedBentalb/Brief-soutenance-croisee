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

export type allWorkersPlaceType = {
    unassigned: workerType[],
    servers: workerType[],
    staff: workerType[],
    conference: workerType[],
    security: workerType[],
    vault: workerType[],
    reception: workerType[],
}

export type zonesType = {
    conference: ["reception", "it", "security", "manager", "nettoyage", "auther"],
    reception: ["reception", "manager"],
    servers: ["it", "manager"],
    security: ["security", "manager"],
    staff: ["reception", "it", "security", "manager", "nettoyage", "auther"],
    vault: ["reception", "it", "security", "manager", "auther"],
}

export type roomType = keyof zonesType