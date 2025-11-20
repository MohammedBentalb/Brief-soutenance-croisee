export function showToaster(bad: boolean, msg: string = "") {
    const toaster = bad ? document.querySelector(".toast.danger") : document.querySelector(".toast.good")
    if (!toaster) return

    if (msg) toaster.querySelector("p")!.textContent = msg

    toaster.classList.add("is-hidden")
    toaster.classList.remove("is-hidden")
    setTimeout(() => toaster.classList.add("is-hidden"), 2000);
}