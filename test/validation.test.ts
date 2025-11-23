import {showError, validatingInputValue} from "../src/utils/validation"
import {describe, expect, it} from "vitest"



describe("Validation", () => {

    it("return error when email input is not valid or empty", () => {
        const input = document.createElement("input")
        input.type = "email"
        input.value = "aedawd"
        expect(validatingInputValue(input)).toBe("Invalid email format")

    })

    it("return error when phone input is not valid or empty", () => {
        const phoneInput = document.createElement("input")
        phoneInput.type = "text"
        phoneInput.id = "phone-input"
        phoneInput.value = "mohammed"
        expect(validatingInputValue(phoneInput)).toBe("Invalid phone format")
    })

    it("return error when phone format is incorrect", () => {
        const phoneInput = document.createElement("input")
        phoneInput.type = "text"
        phoneInput.id = "phone-input"
        phoneInput.value = "0214253678"
        expect(validatingInputValue(phoneInput)).toBe("Invalid phone format")
    })

    it("return empty string when phone format is valid", () => {
        const phoneInput = document.createElement("input")
        phoneInput.type = "text"
        phoneInput.id = "phone-input"
        phoneInput.value = "0600927165"
        expect(validatingInputValue(phoneInput)).toBe("")
    })
    
    it("error field display the return when phone format is invalid", () => {
        const errorField = document.createElement("p")
        const phoneInput = document.createElement("input")
        phoneInput.type = "text"
        phoneInput.id = "phone-input"
        phoneInput.value = "0214253678"
        const result = validatingInputValue(phoneInput)
        showError(errorField, result)
        expect(errorField.textContent).toBe("Invalid phone format");        
    })
    
    it("error field display nothing when phone format is valid", () => {
        const errorField = document.createElement("p")
        const phoneInput = document.createElement("input")
        phoneInput.type = "text"
        phoneInput.id = "phone-input"
        phoneInput.value = "0614253678"
        const result = validatingInputValue(phoneInput)
        showError(errorField, result)
        expect(errorField.textContent).toBe("");        
    })
})
