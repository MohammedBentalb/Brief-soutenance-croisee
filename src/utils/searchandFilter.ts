import type { workerType } from "../types"

export function searchAndFilterUnassigned(arr: workerType[], filterInput: HTMLSelectElement | null, searchInput: HTMLInputElement | null) {
    let newArr: workerType[] = arr
    if (!filterInput || !searchInput) return arr
    if (filterInput?.value.trim() && filterInput.value.trim() !== "all") newArr = newArr.filter(r => r.role === filterInput.value.trim())
    if (searchInput?.value.trim()) newArr = newArr.filter(r => r.name.split(" ")[0].includes(searchInput.value.trim()))

    return newArr
}