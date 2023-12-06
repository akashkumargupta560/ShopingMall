import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
export const uppperCse = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  let upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) != true) {
    return {
      checkUpperCase: true,
    };
  }
  return null;
};

export const lowerCase = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  let lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) != true) {
    return {
      checkLowerCase: true,
    };
  }
  return null;
};

export const numberCharacters = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  let numberCaseCharacters = /[0-9]+/g;
  if (numberCaseCharacters.test(value) != true) {
    return {
      checkNumChar: true,
    };
  }
  return null;
};

export const specialCharacter = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) != true) {
    return {
      checkSpecialChar: true,
    };
  }
  return null;
};