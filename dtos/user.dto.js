module.exports = class UserDto {
    id;
    email;
    isActivated;
    roles;

    constructor(model){
        this.id = model._id;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.roles = model.roles
    }
}