const addWorkerButoon =
  document.querySelector<HTMLButtonElement>(".add-worker");
const hideFormModal =
  document.querySelector<HTMLButtonElement>(".cancel-add-edit");
const formModal = document.querySelector<HTMLDivElement>(".form-modal");

console.log(hideFormModal);

// show add formula when clicking on the add worker button on the sidebar
addWorkerButoon?.addEventListener("click", () =>
  formModal?.classList.remove("is-hidden")
);

hideFormModal?.addEventListener("click", () =>
  formModal?.classList.add("is-hidden")
);
