import type { experienceType, workerType } from "./types";
import { handleDatesInputInfShowErrorAndValidation, handleExperienceShowinfErrorAndValidation, handleInputShowinfErrorAndValidation } from "./utils/validation";

const addWorkerButoon = document.querySelector<HTMLButtonElement>(".add-worker");
const hideFormModal = document.querySelector<HTMLButtonElement>(".cancel-add-edit");
const formModal = document.querySelector<HTMLDivElement>(".form-modal");

// formInputs & errors
const nameInput = document.querySelector<HTMLInputElement>("#name-input");
const nameError = document.querySelector<HTMLParagraphElement>(".error-name");
const roleInput = document.querySelector<HTMLSelectElement>("#role-select");
const roleError = document.querySelector<HTMLParagraphElement>(".error-role");
const imageInput = document.querySelector<HTMLInputElement>("#image-input");
const imageError = document.querySelector<HTMLParagraphElement>(".error-image");
const emailInput = document.querySelector<HTMLInputElement>("#email-input");
const emailError = document.querySelector<HTMLParagraphElement>(".error-email");
const phoneInput = document.querySelector<HTMLInputElement>("#phone-input");
const phoneError = document.querySelector<HTMLParagraphElement>(".error-phone");
// add experience button
const addExperienceButton = document.querySelector(".add-exp-btn");

// add workers form
const addEditForm = document.querySelector<HTMLFormElement>(".add-edit-form");

let experienceErrorArray: string[] | [] = [];
let experienceFieldsCount = 1;

// workersList
let workers: workerType[] = JSON.parse(localStorage.getItem("worker") || "[]")
console.log("these are my workers", workers)

// show add formula when clicking on the add worker button on the sidebar
addWorkerButoon?.addEventListener("click", () =>
    formModal?.classList.remove("is-hidden")
);

// show add formula when clicking on the add worker button on the sidebar
hideFormModal?.addEventListener("click", () =>
    formModal?.classList.add("is-hidden")
);

// validating the worker name in realtime
nameInput?.addEventListener("input", () => {
    if (!nameError) return;
    handleInputShowinfErrorAndValidation(nameInput, nameError);
});

// validating the worker role in realtime
roleInput?.addEventListener("input", () => {
    if (!roleError) return;
    handleInputShowinfErrorAndValidation(roleInput, roleError);
});

// validating the worker image url in realtime
imageInput?.addEventListener("input", () => {
    if (!imageError) return;
    handleInputShowinfErrorAndValidation(imageInput, imageError);
});

// validating the worker email in realtime
emailInput?.addEventListener("input", () => {
    if (!emailError) return;
    handleInputShowinfErrorAndValidation(emailInput, emailError);
});

// validating the worker email in realtime
phoneInput?.addEventListener("input", () => {
    if (!phoneError) return;
    handleInputShowinfErrorAndValidation(phoneInput, phoneError);
});

targetExperiences();

addExperienceButton?.addEventListener("click", () => {
    const experienceContainer = document.querySelector(
        ".add-experience-container"
    );
    const div = document.createElement("div");
    div.classList.add("filed-container", "experience-field");
    div.innerHTML = `
            <div class="field">
                <label for="exp-company-input">Company:</label>
                <input type="company" class="exp-company-input" id="company-${experienceFieldsCount}"/>
                <p class="error-company-ex"></p>
            </div>

            <div class="field">
                <label for="exp-role-input">Role:</label>
                <input type="text" class="exp-role-input" id="experience-role-${experienceFieldsCount}"/>
                <p class="error-role-ex"></p>
            </div>

            <div class="field">
                <label for="exp-start-date-input">Start:</label>
                <input type="date" class="exp-start-date" id="start-date-${experienceFieldsCount}"/>
                <p class="error-start-date-ex"></p>
            </div>

            <div class="field">
                <label for="exp-end-date-input">End:</label>
                <input type="date" class="exp-end-date" id="end-date-${experienceFieldsCount}"/>
                <p class="error-end-date-ex"></p>
            </div>
    `;
    experienceFieldsCount++;
    experienceContainer?.appendChild(div);
    targetExperiences();
});

function targetExperiences() {
    const experiences = document.querySelectorAll(".experience-field");
    experiences.forEach((experience) => {
        const experienceCompanyInput = experience.querySelector<HTMLInputElement>(".exp-company-input");
        const experienceCompanyError = experience.querySelector<HTMLParagraphElement>(".error-company-ex");
        const experienceRoleInput = experience.querySelector<HTMLInputElement>(".exp-role-input");
        const experienceRoleError = experience.querySelector<HTMLParagraphElement>(".error-role-ex");
        const experienceStartInput = experience.querySelector<HTMLInputElement>(".exp-start-date");
        const experienceStartError = experience.querySelector<HTMLParagraphElement>(".error-start-date-ex");
        const experienceEndInput = experience.querySelector<HTMLInputElement>(".exp-end-date");
        const experienceEndError = experience.querySelector<HTMLParagraphElement>(".error-end-date-ex");

        experienceCompanyInput?.addEventListener("input", () => {
            if (!experienceCompanyError) return;
            const { errorArray } = handleExperienceShowinfErrorAndValidation(
                experienceCompanyInput,
                experienceCompanyError,
                experienceErrorArray
            );
            experienceErrorArray = [...errorArray];
        });

        experienceRoleInput?.addEventListener("input", () => {
            if (!experienceRoleError) return;
            const { errorArray } = handleExperienceShowinfErrorAndValidation(
                experienceRoleInput,
                experienceRoleError,
                experienceErrorArray
            );
            experienceErrorArray = [...errorArray];
        });

        experienceStartInput?.addEventListener("input", () => {
            if (!experienceStartError || !experienceEndInput || !experienceEndError)
                return;

            const { errorArray } = handleDatesInputInfShowErrorAndValidation(experienceStartInput, experienceEndInput, experienceStartError, experienceEndError, experienceErrorArray)
            experienceErrorArray = [...errorArray]
            console.log(experienceErrorArray);
        });

        experienceEndInput?.addEventListener("input", () => {
            if (!experienceEndError || !experienceStartInput || !experienceStartError)
                return;

            const { errorArray } = handleDatesInputInfShowErrorAndValidation(experienceStartInput, experienceEndInput, experienceStartError, experienceEndError, experienceErrorArray)
            experienceErrorArray = [...errorArray]
            console.log(experienceErrorArray);
        });
    });
}

addEditForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const experiencesArr = document.querySelectorAll(".experience-field");

    let experienceRoleValidation = false, experienceCompanyValidation = false, startingDateValidation = false, endDateValidationn = false;
    let experienceArray: experienceType[] = []

    if (!nameInput || !nameError || !roleInput || !roleError || !emailInput || !emailError || !phoneInput || !phoneError || !imageInput || !imageError) return;

    const nameValidation = handleInputShowinfErrorAndValidation(nameInput, nameError);
    const roleValidation = handleInputShowinfErrorAndValidation(roleInput, roleError);
    const imageValidation = handleInputShowinfErrorAndValidation(imageInput, imageError);
    const emailValidation = handleInputShowinfErrorAndValidation(emailInput, emailError);
    const phoneValidation = handleInputShowinfErrorAndValidation(phoneInput, phoneError);

    if (nameValidation || roleValidation || imageValidation || emailValidation || phoneValidation) return

    if (experienceErrorArray.length > 0) {
        const viewItem = document.querySelector<HTMLInputElement>(`#${experienceErrorArray[0]}`)
        viewItem?.scrollIntoView({ behavior: "smooth" })
        return;
    }

    experiencesArr.forEach((ex) => {
        const experienceCompanyInput = ex.querySelector<HTMLInputElement>(".exp-company-input");
        const experienceCompanyError = ex.querySelector<HTMLParagraphElement>(".error-company-ex");
        const experienceRoleInput = ex.querySelector<HTMLInputElement>(".exp-role-input");
        const experienceRoleError = ex.querySelector<HTMLParagraphElement>(".error-role-ex");
        const experienceStartInput = ex.querySelector<HTMLInputElement>(".exp-start-date");
        const experienceStartError = ex.querySelector<HTMLParagraphElement>(".error-start-date-ex");
        const experienceEndInput = ex.querySelector<HTMLInputElement>(".exp-end-date");
        const experienceEndError = ex.querySelector<HTMLParagraphElement>(".error-end-date-ex");

        if (!experienceCompanyInput || !experienceCompanyError || !experienceRoleInput || !experienceRoleError ||
            !experienceStartInput || !experienceStartError || !experienceEndInput || !experienceEndError) return;

        experienceCompanyValidation = handleInputShowinfErrorAndValidation(experienceCompanyInput, experienceCompanyError);
        experienceRoleValidation = handleInputShowinfErrorAndValidation(experienceRoleInput, experienceRoleError);

        const { firstDateError, secondDateError, errorArray } = handleDatesInputInfShowErrorAndValidation(experienceStartInput, experienceEndInput, experienceStartError, experienceEndError, experienceErrorArray)
        startingDateValidation = firstDateError
        endDateValidationn = secondDateError
        experienceErrorArray = [...errorArray]

        if (experienceErrorArray.length === 0 && !experienceCompanyValidation && !experienceRoleValidation && !startingDateValidation && !endDateValidationn) {
            console.log("experience Array is here")
            experienceArray = [...experienceArray, { id: experienceArray.length, company: experienceCompanyInput.value.trim(), role: experienceRoleInput.value.trim(), start: experienceStartInput.value.trim(), end: experienceEndInput.value.trim() }]
        }
        console.log("below experience Array is here")
        console.log(experienceErrorArray.length)
        console.log(!experienceCompanyValidation)
        console.log(!experienceRoleValidation)
        console.log(!startingDateValidation)
        console.log(!endDateValidationn)
    });

    if (experienceErrorArray.length > 0) {
        const viewItem = document.querySelector<HTMLInputElement>(`#${experienceErrorArray[0]}`)
        viewItem?.scrollIntoView({ behavior: "smooth" })
        return;
    }

    if (experienceCompanyValidation || experienceRoleValidation || startingDateValidation || endDateValidationn) {
        console.log("la rah maymkench a si simo");
        return;
    }

    let worker = {
        id: workers.length,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: Number(phoneInput.value.trim()),
        image: imageInput.value.trim(),
        role: roleInput.value.trim(),
        experiences: experienceArray
    };

    workers = [...workers, worker]
});
