import type { validatingInputValueType } from "../types";

export const validatingInputValue = (element: validatingInputValueType): string => {
  if (!element.value.trim()) return "Invalid Value";

  if (element.type == "email") {
    let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/
    if (!emailRegex.test(element.value.trim())) return "Invalid email format";
    return "";
  }

  if (element.id == "phone-input") {
    // test phone with regex
    if (!isNaN(Number(element.value.trim())) && element.value.trim().length === 10) return "";
    return "Invalid phone format";
  }

  if (element.id == "image-input") {
    const imageRegex = /^https?:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}(?::\d{1,5})?(?:\/[^\s]*)?$/
    if (!imageRegex.test(element.value.trim())) return "invalid URL";
    return "";
  }

  return "";
};

export const showError = (errorField: HTMLParagraphElement, mssg: string) => {
  const input = errorField.previousElementSibling as | HTMLInputElement| HTMLSelectElement;
  errorField.textContent = mssg;
  input.style.outlineColor = "red";
  input.style.borderColor = "red";

  if (!mssg) {
    input.style.outlineColor = "black";
    input.style.borderColor = "black";
  }
};

export function validatingDates(dateInp1: HTMLDataElement, dateInp2: HTMLDataElement): string[] {
  let date1Error = "", date2Error = "";

  if (!dateInp1.value.trim() && !dateInp2.value.trim()) return ["you must set a start date", "you must set an end date"]
  if (dateInp1.value.trim() && !dateInp2.value.trim()) return ["", "end date must be set too"]
  if (!dateInp1.value.trim() && dateInp2.value.trim()) date1Error = "first date must be set before end date"

  const date = new Date();
  const [todayYear, todayMonth, todayDay] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const [year, month, day] = dateInp1.value.split("-").map((d) => Number(d));


  if (year > todayYear || (todayYear === year && month > todayMonth) || (todayYear === year && month === todayMonth && day > todayDay)) {
    date1Error = "Start date can't be ahead or equal to today";
  }

  if (!dateInp2.value.trim()) return [date1Error, date2Error];

  const [year2, month2, day2] = dateInp2.value.split("-").map((d) => Number(d));
  if (year > year2 || (year2 === year && month > month2) || (year === year2 && month === month2 && day2 < day)
  ) {
    date2Error = "end date can't be before of start date"
  }

  return [date1Error, date2Error];
}

export function AddToExperienceErrorArray(
  word: string, input: validatingInputValueType, errorArray: string[] | []) {
  let newArr = [...errorArray];

  if (word) {
    return newArr = newArr.includes(input.id as never) ? newArr : [...newArr, input.id]
  } 
  return newArr = newArr.includes(input.id as never) ? newArr.filter((s) => s !== input.id) : newArr;
}

export function handleExperienceShowinfErrorAndValidation(input: validatingInputValueType, errorField: HTMLParagraphElement, ErrorArr: string[] | []) {
  let newErrorArray = [...ErrorArr];

  const validationResult = validatingInputValue(input);
  newErrorArray = AddToExperienceErrorArray(validationResult, input, newErrorArray);
  showError(errorField, validationResult);

  return { valid: validationResult !== "", errorArray: newErrorArray };
}

export function handleInputShowinfErrorAndValidation(input: validatingInputValueType, errorField: HTMLParagraphElement) {
  const validationResult = validatingInputValue(input);
  showError(errorField, validationResult);

  return validationResult !== "";
}

export function handleDatesInputInfShowErrorAndValidation(firstDate: HTMLInputElement, secondDate: HTMLInputElement, errorField1: HTMLParagraphElement, errorField2: HTMLParagraphElement, errorsArray: string[] | []) {
  let newErrorArray = [...errorsArray]
  const [result1, result2] = validatingDates(firstDate, secondDate);

  showError(errorField1, result1);
  showError(errorField2, result2);
  newErrorArray = AddToExperienceErrorArray(result1, firstDate, newErrorArray);
  newErrorArray = AddToExperienceErrorArray(result2, secondDate, newErrorArray);

  return { firstDateError: result1 !== "", secondDateError: result2 !== "", errorArray: newErrorArray }
}
