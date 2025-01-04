const { IsString, IsOptional, IsMongoId, IsEnum } = require("class-validator");
const { TODO_STATUS } = require("../../../enum.constants");

class SearchTodoDto{
    constructor(title, description, userId, status) {
        this.title = title, 
        this.description = description, 
        this.userId = userId, 
        this.status = status
    }
}
Reflect.decorate([IsString(), IsOptional()], SearchTodoDto.prototype, "title");
Reflect.decorate([IsString(), IsOptional()], SearchTodoDto.prototype, "description");
Reflect.decorate([IsMongoId(), IsOptional()], SearchTodoDto.prototype, "userId");
Reflect.decorate([IsEnum(TODO_STATUS), IsOptional()], SearchTodoDto.prototype, "status");

module.exports = SearchTodoDto;