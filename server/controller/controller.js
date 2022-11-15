const UserDb = require('../model/model');
var userdb = require('../model/model');


//create and save user

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //New user
    const user = new userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in bd
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            });
        });
}

//retrive and return all users /retrive are return single user

exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        UserDb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Not found the user with"+ id})
            }else{
                res.send(data)
            }
           
        })
        .catch(err=>{
            res.status(500).send({message:"Error rettriving user with id" + id})
        })
    } else {
        userdb.find()

            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "error occured during retirving user data" })
            })
    }
}

//Update a new identified user by user id

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id

    UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update user with ${id}.May be user not found!" })
            } else {
                res.send(data)
            }

        })
        .catch(err => {
            res.status(500).send({ message: "Error update user chnages" })
        })
}

// Delete a specified user with user id

exports.delete = (req, res) => {
    const id = req.params.id;

    UserDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete with ${id}.May be id not found!" })
            } else {
                res.send({
                    message: "User is deleted"
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete the use" + id })
        })
}