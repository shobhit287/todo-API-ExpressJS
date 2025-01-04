require('dotenv').config();

const app = require("./conifg/app");
const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});
