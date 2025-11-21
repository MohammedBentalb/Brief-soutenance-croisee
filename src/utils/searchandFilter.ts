import type { workerType } from "../types"


/**
 * function that checks both search and filter input to return an array that match the needed details
 * @param arr 
 * @param filterInput 
 * @param searchInput 
 * @returns 
 */
export function searchAndFilterUnassigned(arr: workerType[], filterInput: HTMLSelectElement | null, searchInput: HTMLInputElement | null) {
    let newArr: workerType[] = arr
    if (!filterInput || !searchInput) return arr
    if (filterInput?.value.trim() && filterInput.value.trim() !== "all") newArr = newArr.filter(r => r.role === filterInput.value.trim())
    if (searchInput?.value.trim()) newArr = newArr.filter(r => r.name.split(" ")[0].includes(searchInput.value.trim()))

    return newArr
}