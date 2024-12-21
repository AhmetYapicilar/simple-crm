export class User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: number;
  street: string;
  zipCode: number;
  city: string;
  id?: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : ''; //if object exists take fisrtName of object else empty string
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.id = obj ? obj.id : '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      id: this.id
    };
  }
}
