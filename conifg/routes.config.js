const userRoutes = require("../routes/user.routes");
const authRoutes = require("../routes/auth.routes");
const todoRoutes = require("../routes/todo.routes");
module.exports = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(todoRoutes);
}