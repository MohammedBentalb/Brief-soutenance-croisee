import type { allWorkersPlaceType, experienceType, roomType, zonesType } from "./types";
import { showToaster } from "./utils/toaster";
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
const avatarImage = document.querySelector<HTMLMediaElement>("#avatar-image")
// add experience button
const addExperienceButton = document.querySelector(".add-exp-btn");

// experiences container
const experienceContainer = document.querySelector(".add-experience-container");

// add workers form
const addEditForm = document.querySelector<HTMLFormElement>(".add-edit-form");
// list of unassigned workers
const unassignedList = document.querySelector(".unassigned-list")
// info modal
const infoModal = document.querySelector(".info-modal")

// the add button inside each room
const addWorkerTozoneButtons = document.querySelectorAll<HTMLButtonElement>('.room-emp-add')
// modal that shows unassigned workers to assigne a room to them
const showAnassignedToAssignModal = document.querySelector<HTMLDivElement>(".unassigned-list-container")
// rooms
const rooms = document.querySelectorAll<HTMLDivElement>("div[data-room")


let experienceErrorArray: string[] | [] = [];
let experienceFieldsCount = 1;

// workersList
const allWorkersPlace: allWorkersPlaceType = JSON.parse(localStorage.getItem("allWorkersPlace") || "null") || {
    unassigned: [],
    servers: [],
    staff: [],
    conference: [],
    security: [],
    vault: [],
    reception: [],
}
let workersCount = JSON.parse(localStorage.getItem("workersCount") || "null") || 0

const zones: zonesType = {
    conference: ["reception", "it", "security", "manager", "nettoyage", "other"],
    reception: ["reception", "manager"],
    servers: ["it", "manager"],
    security: ["security", "manager"],
    staff: ["reception", "it", "security", "manager", "nettoyage", "other"],
    vault: ["reception", "it", "security", "manager", "other"],
}
const zonesLimits = {
    conference: 6,
    reception: 8,
    servers: 4,
    security: 4,
    staff: 4,
    vault: 4,
}

Object.freeze(zonesLimits)

console.log("these are my workers", allWorkersPlace)

// show add formula when clicking on the add worker button on the sidebar
addWorkerButoon?.addEventListener("click", () => formModal?.classList.remove("is-hidden"));

// show add formula when clicking on the add worker button on the sidebar
hideFormModal?.addEventListener("click", () => formModal?.classList.add("is-hidden"));

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
    const validationResult = handleInputShowinfErrorAndValidation(imageInput, imageError);
    if (!validationResult && avatarImage) avatarImage.src = imageInput?.value.trim() as string
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

addExperienceButton?.addEventListener("click", () => {
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
// function that runs cheks on the experience feilds since they require a seperate logic to handle all experiences validation at the same time
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
// listnner to the submit event that happens to the form, we check again if the inputs got all the details we need and then we proced with the submitting event
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
    });

    if (experienceErrorArray.length > 0) {
        const viewItem = document.querySelector<HTMLInputElement>(`#${experienceErrorArray[0]}`)
        viewItem?.scrollIntoView({ behavior: "smooth" })
        return;
    }

    if (experienceCompanyValidation || experienceRoleValidation || startingDateValidation || endDateValidationn) return;

    let worker = {
        id: workersCount++,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: Number(phoneInput.value.trim()),
        image: imageInput.value.trim(),
        role: roleInput.value.trim() as keyof allWorkersPlaceType,
        experiences: experienceArray
    };

    allWorkersPlace["unassigned"] = [...allWorkersPlace["unassigned"], worker]
    localStorage.setItem("allWorkersPlace", JSON.stringify(allWorkersPlace))
    localStorage.setItem("workersCount", JSON.stringify(workersCount))

    experienceFieldsCount = 1
    if (experienceContainer) experienceContainer.innerHTML = ""
    if(avatarImage) avatarImage.src = "/assets/avatar.png"
    addEditForm.reset()
    formModal?.classList.add("is-hidden")
    
    renderUnassignedWorkers()
});

function renderUnassignedWorkers() {
    if (!unassignedList) return
    unassignedList.innerHTML = ""
    allWorkersPlace["unassigned"].forEach(w => {
        const li = document.createElement("li")
        li.draggable = true
        li.id = w.id.toString()
        li.onclick = showModalInfo
        li.setAttribute("data-place", "unassigned")
        li.innerHTML += `    
            <div class="avatar">
              <img src="${w.image}" alt="avatar" />
            </div>
            <div class="employee-name">
              <p>${w.name.split(" ")[0]}</p>
              <p>${w.role}</p>
            </div>
            <button class="edite" id="worker-${w.id}" >edit</button>
         `
        unassignedList.appendChild(li)
        dragEventStart(li)
    })
}

function showModalInfo(e: Event) {
    console.log(infoModal)
    if (!infoModal) return
    infoModal.innerHTML = ""
    if ((e.target as HTMLButtonElement).role === "delete") return

    const card = e.currentTarget as HTMLLIElement
    const [foundWorker] = allWorkersPlace[card.dataset.place as roomType].filter(w => w.id === Number(card.id))

    console.log(foundWorker)
    const personalDetails = document.createElement("div")
    personalDetails.classList.add("info-modal-container")
    personalDetails.innerHTML = `
            <div class="main-info-field">
                <div class="image-field">
                    <img src="${foundWorker.image}" alt="${foundWorker.name.split(" ")[0]} image" id="${foundWorker.name}-image-${foundWorker.id}"/>
                </div>
            <div>
            <p>${foundWorker.name.split(" ")[0]}</p>
            <p>${foundWorker.role}</p>
            </div>
            </div>
            
            <hr />
            
            <div class="personal-info">
            <p class="info-line"><span>Email:</span> ${foundWorker.email}</p>
            <p class="info-line"><span>Phone:</span> ${foundWorker.phone}</p>
            <p class="info-line"><span>current location:</span> servers room</p>
            </div>
            
            <h3>work experience</h3>
        `
    const experienceDiv = document.createElement("div")
    experienceDiv.classList.add("experience-col")

    foundWorker.experiences.forEach(e => {
        experienceDiv.innerHTML += `
            <div class="experience-row">
                <h4>${e.company}</h4>
                <p class="info-line"><span>role: </span> ${e.role}</p>
                <p class="info-line"><span>period: </span> ${e.start.replace("-", "/")} - ${e.end.replace("-", "/")}</p>
          </div>
        `
    })

    const closeButton = document.createElement("button")
    closeButton.classList.add("btn", "green")
    closeButton.textContent = "Cancel"


    infoModal.appendChild(personalDetails)
    personalDetails.appendChild(experienceDiv)
    personalDetails.appendChild(closeButton)

    closeButton.addEventListener("click", () => infoModal.classList.add("is-hidden"))
    infoModal.classList.remove("is-hidden")
}

addWorkerTozoneButtons.forEach(addButton => {
    addButton.addEventListener("click", () => {
        showAnassignedToAssignModal?.classList.remove("is-hidden")
        const closeButton = showAnassignedToAssignModal?.querySelector<HTMLButtonElement>("button")

        if (closeButton) closeButton.addEventListener("click", () => showAnassignedToAssignModal?.classList.add("is-hidden"))

        const list = showAnassignedToAssignModal?.querySelector<HTMLUListElement>("ul")
        if (!list) return

        list.innerHTML = ""

        allWorkersPlace["unassigned"].forEach(w => {
            const li = document.createElement("li")
            li.onclick = AssignWorkerToRoom.bind(null, w.role, w.id, addButton.dataset.room as roomType)
            li.innerHTML = `
                    <div class="image">
                        <img src="${w.image}" alt="${w.name}-avatar-${w.id}" />
                    </div>
                    <div class="name-role">
                        <p>${w.name.split(" ")[0]}</p>
                        <p>${w.role}</p>
                    </div>
            `
            list.appendChild(li)
        })
    })
})

function AssignWorkerToRoom(role: keyof allWorkersPlaceType, id: number, room: roomType) {
    const roomTarget = document.querySelector(`div[data-room=${room}]`)
    const listofWorkers = roomTarget?.querySelector("ul")
    
    if (!listofWorkers) return
    
    let shouldGo = false
    let reachedLimit = false

    zones[room].forEach(z => { if (z === role) shouldGo = true })
    reachedLimit = allWorkersPlace[room].length === zonesLimits[room]

    if (!shouldGo) {
        showToaster(true, `${role} can't go there`)
        showAnassignedToAssignModal?.classList.add("is-hidden")
        return
    }
    
    if (reachedLimit) {
        showToaster(true, `${room} has reached the limit`)
        showAnassignedToAssignModal?.classList.add("is-hidden")
        return
    }

    const [foundWorker] = allWorkersPlace["unassigned"].filter(w => w.id === Number(id))
    allWorkersPlace["unassigned"] = allWorkersPlace["unassigned"].filter(w => w.id !== Number(id))
    allWorkersPlace[room] = [...allWorkersPlace[room], foundWorker]
    localStorage.setItem("allWorkersPlace", JSON.stringify(allWorkersPlace))
    renderAllWorkersInsideRooms()
    renderUnassignedWorkers()
    scanRoomState()
    showToaster(false)
    showAnassignedToAssignModal?.classList.add("is-hidden")
}

function renderAllWorkersInsideRooms() {
    const allRooms = document.querySelectorAll<HTMLDivElement>("div[data-room]")
    allRooms.forEach(room => {
        const list = room.querySelector("ul")
        if (!list) return
        list.style.listStyle = "none"
        list.innerHTML = ""

        const key = room.dataset.room as roomType

        allWorkersPlace[key].forEach(w => {
            console.log(allWorkersPlace[key])
            const worker = document.createElement("li")
            const button = document.createElement("button")

            button.classList.add("delete")
            button.style.cursor = "pointer"
            button.textContent = "x"
            button.onclick = removeWorkerFromRoom.bind(null, Number(w.id), key)
            button.role = "delete"

            worker.onclick = showModalInfo
            worker.classList.add("employee")
            worker.draggable = true
            worker.id = w.id.toString()
            worker.setAttribute("data-place", key)
            worker.innerHTML = `
                        <div class="avatar">
                            <img src="${w.image}" alt="avatar" />
                        </div>
                        <div class="employee-name">
                            <p>${w.name.split(" ")[0]}</p>
                            <p>${w.role}</p>
                        </div>
            `
            worker.appendChild(button)
            list.appendChild(worker)
            dragEventStart(worker)
        })
    })
}

function removeWorkerFromRoom(id: number, room: roomType) {
    console.log(id)
    console.log(room)
    const [foundWorker] = allWorkersPlace[room].filter(w => w.id === Number(id))
    allWorkersPlace["unassigned"] = [...allWorkersPlace["unassigned"], foundWorker]
    allWorkersPlace[room] = allWorkersPlace[room].filter(w => w.id !== Number(id))
    localStorage.setItem("allWorkersPlace", JSON.stringify(allWorkersPlace))
    renderUnassignedWorkers()
    renderAllWorkersInsideRooms()
    scanRoomState()
}

function scanRoomState() {
    if (!rooms) return
    rooms.forEach(room => {
        const key = room.dataset.room as roomType
        if (key !== "conference" && key !== 'staff') room.classList.toggle('room', allWorkersPlace[key].length === 0)
    })
}

rooms.forEach(roomZone => {
    roomZone.addEventListener("dragover", (e) => e.preventDefault())

    roomZone.addEventListener("drop", (e) => {
        if (!e.dataTransfer) return
        const id = JSON.parse(e.dataTransfer.getData("id"))
        const role = JSON.parse(e.dataTransfer.getData("role"))
        const place = JSON.parse(e.dataTransfer.getData("place")) as roomType
        const roomKey = roomZone.dataset.room as roomType

        let replace = false
        let reachedLimit = false

        if (place === roomKey) return
        zones[roomKey].forEach(z => { if (z === role) replace = true })
        reachedLimit = allWorkersPlace[roomKey].length === zonesLimits[roomKey]

        if (!replace) {
            showToaster(true, `${role} can't go there`)
            return
        }
        
        if (reachedLimit) {
            showToaster(true, `${roomKey} has reached the limit`)
            return
        }

        const [foundUser] = allWorkersPlace[place].filter(f => f.id === Number(id))
        allWorkersPlace[place] = allWorkersPlace[place].filter(f => f.id !== Number(id))
        allWorkersPlace[roomKey] = [...allWorkersPlace[roomKey], foundUser]
        localStorage.setItem("allWorkersPlace", JSON.stringify(allWorkersPlace))

        renderAllWorkersInsideRooms()
        renderUnassignedWorkers()
        scanRoomState()
        showToaster(false)
    })
})

function dragEventStart(card: HTMLLIElement) {
    if (!card) return
    card.addEventListener("dragstart", e => {

        const key = card.dataset.place as roomType

        const [foundUser] = allWorkersPlace[key].filter(w => w.id === Number(card.id))
        e.dataTransfer?.setData("id", JSON.stringify(foundUser.id))
        e.dataTransfer?.setData("role", JSON.stringify(foundUser.role))
        e.dataTransfer?.setData("place", JSON.stringify(key))
    })
}

// function that calls functions that need to be called directly on the root
function AppCaller() {
    renderUnassignedWorkers()
    renderAllWorkersInsideRooms()
    targetExperiences();
    scanRoomState()
}
AppCaller()


/// limit the zones to spesic number of workers 