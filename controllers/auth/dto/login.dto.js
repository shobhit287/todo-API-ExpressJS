const { IsEmail, IsString } = require('class-validator');
class LoginDto {
    constructor(email, password) {
       this.email = email
       this.password = password
    }
}
Reflect.decorate([IsEmail], LoginDto.prototype, "email");
Reflect.decorate([IsString], LoginDto.prototype, "password");
module.exports = LoginDto;