import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBlank', async: false })
export class IsBlank implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return value.trim().length > 0;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} can not empty`;
  }
}
