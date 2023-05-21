const express = require('express');
const uuidV4 = require('uuid').v4;
const User = require("./dbconnect.js").User;
const {isValidRequestBody} = require("./validator");

const app = express();
const port = 3000;

class UserWeb {
    id;
    name;
    surname;
    age;
    email;

    constructor(id, name, surname, age, email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.email = email;
    }

    static from(user) {
        return new UserWeb(user._id, user.name, user.surname, user.age, user.email);
    }
}

app.use(express.json());

app.post("/api/user", async (req, res) => {
    if (!isValidRequestBody(req.body)) {
        return res.status(400).json({'body': 'invalid_arguments'});
    }

    const data = new User({
        _id: uuidV4(), name: req.body.name, surname: req.body.surname, age: req.body.age, email: req.body.email,
    });


    await data.save();
    res.status(201).json({'message': 'user created'});
});

app.get("/api/user", async (req, res) => {
    await User.find().then((users) => {
        const userWebArray = users.map(user => UserWeb.from(user));
        res.json(userWebArray);
    }).catch(() => {
        res.status(500).json({error: 'Internal server error'});
    })
});

app.get("/api/user/:id", async (req, res) => {
    const id = req.params.id;

    await User.findById(id).then((user) => {
        if (user) {
            res.json(UserWeb.from(user));
        } else {
            res.json({error: `No user with id: ${id}`}) // 404
        }
    }).catch(() => {
        res.status(500).json({error: 'Internal server error'});
    })
});

app.put("/api/user/:id", async (req, res) => {
    if (!isValidRequestBody(req.body)) {
        return res.status(400).json({'body': 'invalid_arguments'});
    }

    let upId = req.params.id;
    let upName = req.body.name;
    let upSurname = req.body.surname;
    let upAge = req.body.age;
    let upEmail = req.body.email;

    await User.findById(upId).then(async (user) => {
        if (user) {
            user.name = upName;
            user.surname = upSurname;
            user.age = upAge;
            user.email = upEmail;
            await user.save();
            res.status(200).json({message: `User with id ${upId} updated successfully`});
        } else {
            res.json({error: `No user with id: ${upId}`}); // 404 // user not found
        }
    }).catch(() => res.status(500).json({error: 'Internal server error'}));
});

app.delete("/api/user/:id", async (req, res) => {
    const id = req.params.id;
    const userExists = await User.exists({_id: id});
    if (!userExists) {
        return res.status(404).json({error: 'User not found to delete'})
    }

    await User.findByIdAndDelete(id).then((user) => {
        if (user) {
            res.status(200).json({message: `User with id ${id} deleted successfully`});
            // res.status(204).end();
        }
    }).catch(() => {
        res.status(500).json({error: 'Internal server error'});
    });
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})
