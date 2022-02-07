import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return propertyValue < args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments): string {
    return `"${args.property}" must be before "${args.constraints[0]}"`;
  }
}
