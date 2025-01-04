require("reflect-metadata");
const { IsString, MinLength } = require("class-validator");

class ChangePasswordDto {
   constructor(oldPassword, newPassword) {
     this.oldPassword = oldPassword,
     this.newPassword = newPassword;
   }
}

Reflect.decorate([IsString()], ChangePasswordDto.prototype, "oldPassword");
Reflect.decorate([IsString(), MinLength(8)], ChangePasswordDto.prototype, "newPassword");

module.exports = ChangePasswordDto;