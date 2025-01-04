const {IsString, IsEnum, IsMongoId, MaxLength} = require("class-validator");
const TODO_STATUS = require("../../../enum.constants");
class CreateTodoDto {
    constructor(title, description) {
        this.title = title,
        this.description = description
    }
}

Reflect.decorate([IsString(), MaxLength(100)], CreateTodoDto.prototype, "title");
Reflect.decorate([IsString(), MaxLength(300)], CreateTodoDto.prototype, "description");

module.exports = CreateTodoDto;