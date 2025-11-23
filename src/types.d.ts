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
    role: RoleType,
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
    conference: ["reception", "it", "security", "manager", "nettoyage", "other"],
    reception: ["reception", "manager"],
    servers: ["it", "manager"],
    security: ["security", "manager"],
    staff: ["reception", "it", "security", "manager", "nettoyage", "other"],
    vault: ["reception", "it", "security", "manager", "other"],
}

export type zonesLimits = {
    conference: number,
    reception: number,
    servers: number,
    security: number,
    staff: number,
    vault: number,
}


export type RoleType = "it" | "security" | "manager" | "nettoyage" | "other" | "reception"

export type roomType = keyof zonesType