import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPhoneNumberVN', async: false })
export class IsPhoneNumberVN implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    // here you can provide default error message if validation failed
    return `${validationArguments.property} invalid phone`;
  }
}
