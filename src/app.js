const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
// const { helloWorld } = require('./controllers/users')
const userCrud = require('./controllers/users')
const User = require('./models/users')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json());
    }

    routes() {
        // Routes
        app.get("/user/", userCrud.getAll)
        app.get("/user/id/:id", userCrud.getById)
        app.get("/user/name/", userCrud.getByName)
        app.post("/user/create", userCrud.create)
        app.put("/user/update/:id", userCrud.updateWithPath)
        app.put("/user/update", userCrud.updateWithBody)
        app.delete("/user/delete/:id", userCrud.remove)

        app.get("/login", userCrud.login)
    }

    initDatabase() {
        connect('mongodb+srv://AdminEndava:Endava2021@endava.yyroa.mongodb.net/Endava?retryWrites=true&w=majority')
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App
