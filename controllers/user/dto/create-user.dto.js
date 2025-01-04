const { IsEmail, IsString, MinLength } = require('class-validator');
class CreateUserDto {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

Reflect.decorate([IsString()], CreateUserDto.prototype, "firstName");
Reflect.decorate([IsString()], CreateUserDto.prototype, "lastName");
Reflect.decorate([IsEmail()], CreateUserDto.prototype, "email");
Reflect.decorate([IsString(), MinLength(8)], CreateUserDto.prototype, "password");

module.exports = CreateUserDto;
