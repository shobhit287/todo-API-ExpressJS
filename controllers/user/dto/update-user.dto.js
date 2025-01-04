const { IsEmail, IsString, IsOptional } = require('class-validator');
class UpdateUserDto {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

Reflect.decorate([IsString(), IsOptional()], UpdateUserDto.prototype, "firstName");
Reflect.decorate([IsString(), IsOptional()], UpdateUserDto.prototype, "lastName");
Reflect.decorate([IsEmail(), IsOptional()], UpdateUserDto.prototype, "email");

module.exports = UpdateUserDto;
