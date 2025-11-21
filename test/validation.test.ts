import {validatingInputValue} from "../src/utils/validation"
import {describe, expect, it} from "vitest"



describe("Validation", () => {

    it("validation returen error when email input is not valid or empty", () => {
        const input = document.createElement("input")
        input.type = "email"
        input.value = "aedawd"
        expect(validatingInputValue(input)).toBe("Invalid email format")

    })

    it("validation returen error when phone input is not valid or empty", () => {
        const phoneInput = document.createElement("input")
        phoneInput.type = "text"
        phoneInput.id = "phone-input"
        phoneInput.value = "mohammed"
        expect(validatingInputValue(phoneInput)).toBe("Invalid phone format")
    })

})
