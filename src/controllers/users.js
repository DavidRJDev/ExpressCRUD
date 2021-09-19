const User = require('./../models/users');
const Users = require('./../models/users')

// Use class or functions
function helloWorld(req, res) {
    const userDB = new Users({
        name: 'EndavaUser',
        email: 'test@hotmail.com',
        age: 18,
        password: '123456'
    })
    try {
        userDB.save( (err, user) => {
            if(err) throw Error(err);
            console.log('user created');
            return res.status(200).json({
                status: 200,
                response: user
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function getAll(req, res) {
    try
    {
        logAction("User getAll");

        const filter = {}

        getCentralized(filter, res)
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function getById(req, res) {
    try {
        logAction("User getByName", req.params.id)

        const filter = { _id: req.params.id }

        getCentralized(filter, res)
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function getByName(req, res) {
    try {
        logAction("User getByName", req.body.name)

        const filter = { name: req.body.name }

        getCentralized(filter, res)
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function create(req, res) {
    try {
        console.log(`[User create: ${req.body.name}]`)

        var user = mapUser(req.body)
        user.save((err, user) => {
            if(err) throw Error(err);

            console.log('user was created');
            return res.status(200).json({
                response: user
            })
        })

    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function updateWithPath(req, res) {
    try {
        logAction("User update with path", req.params.id)

        var user = mapUser(req.body)
        const filter = { _id: req.params.id }
        const update = { age: user.age, email: user.email, password: user.password }
        const option = { new: true }

        updateCentralized(filter, update, option, res)
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function remove(req, res) {
    try {
        logAction("User remove", req.params.id)

        User.deleteOne({ _id: req.params.id }, (err, user) => {
            if(err) throw Error(err)

            return res.status(200).json({
                response: "The user has been deleted 2"
            }) 
        })

    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}


/* WITH BODY - to update using any property*/
function updateWithBody(req, res) {
    try {
        logAction("User update with body", req.body.name)

        var user = mapUser(req.body)
        const filter = { name: user.name }
        const update = { age: user.age, email: user.email, password: user.password }
        const option = { new: true }

        updateCentralized(filter, update, option, res)
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function getCentralized(filter, res) {
    try {
        Users.find(filter,
            (err, users) => {
            if(err) throw Error(err)

            return res.status(200).json({
                response: users
            });
        })
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function updateCentralized(filter, update, option, res) {
    try {
        var u = User.findOneAndUpdate(
            filter,
            update,
            option,
            (err, user) => {
                if(err) throw Error(err)

                return res.status(200).json({
                    response: user,
                    message: "The user was updated"
                })
            })
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function logAction(action, param) {
    console.log("[" + action + ": "+ param + "]")
}

function mapUser(user) {
    return new User({
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password
    })
}

/* EXTRA POINT */
function login(req, res){
    try
    {
        console.log(`[login: ${req.body.name}; ${req.body.password}]`)
        Users.findOne({name: req.body.name, password: req.body.password}, (err, user) => {
            if(err) throw Error(err)

            var status = 401
            var result = "Unauthorized"
        
            if (user != null)
            {
                status = 200
                result = "Welcome"
            }
            return res.status(status).json({
                response: result
            })
        })
    } catch(error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}



module.exports = {getAll, getById, getByName, create, updateWithBody, updateWithPath, remove, login}