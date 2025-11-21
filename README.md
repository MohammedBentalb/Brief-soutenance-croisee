# WorkSphere — Visual Staff Floorplan Manager

## 🚀 Overview
WorkSphere is a visual and interactive personnel-management web application built with **Vite + TypeScript**. It allows users to assign, move, and organize employees directly on a floorplan interface while enforcing role-based access rules. The application is fully responsive, fluid, and designed for real-time spatial organization of staff in a workplace environment.

---

## ✨ Core Features
- Interactive floorplan with six zones:
  Conference Room, Reception, Server Room, Security Room, Staff Room, Archive Room.
- Sidebar listing all unassigned employees + `Add New Worker` button.
- Add-Employee modal with:
  name, role, photo URL, email, phone, and dynamic experience entries.
- Live photo preview inside the modal.
- Form validation using **REGEX + TypeScript types**.
- Validation ensuring start date < end date for each experience.
- Role-based access rules (Receptionist, IT Tech, Security Agent, Manager, Cleaning, etc.).
- Zone limits: configurable max number of employees per zone.
- Remove button `X` to unassign employees.
- Employee profile popup with detailed information.
- Zone restrictions visually highlighted (mandatory empty zones turn pale red, except Conference/Staff Rooms).
- Fully responsive UI with Flexbox, Grid, animations.
- W3C-validated HTML & CSS.
- Deployable on **GitHub Pages** or **Vercel**.

---

## 🧩 Tech Stack
- **Vite** (dev server + build)
- **TypeScript** (strict mode recommended)
- **HTML5 / CSS3 / Flex & Grid**
- Optional UI: Tailwind CSS or custom SCSS
- Local state: custom store / Zustand / Redux Toolkit (your choice)
- Validation: custom logic + TS types
- Testing: Vitest (optional)

---

## 📁 Project Structure
```
work-sphere/
├─ public/
│ └─ index.html
├─ src/
│ ├─ assets/
│ ├─ utils/
│ │ ├─ seachAndFilter.ts
│ │ ├─ toaster.ts
│ │ ├─ validation.tsx
│ │ └─ validation.tsx
│ ├─ styles/
│ | main.ts
│ └─ types.ts
├─ test/
│ └─ validation.test.ts
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 🔧 Installation & Development

```bash
# Clone the repo
git clone https://github.com/MohammedBentalb/work-sphere.git
cd work-sphere
```
# Install dependencies

```bash
 npm install
```

# Start dev environment

```bash
 npm run dev
```

# Build for production

```bash
 npm run build
```