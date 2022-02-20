import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotBlank', async: false })
export class IsNotBlank implements ValidatorConstraintInterface {
  validate(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments: ValidationArguments,
  ): boolean | Promise<boolean> {
    return value.trim().length > 0;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} can not empty`;
  }
}
