const Category = require('../models').categories
const Event = require('../models').events
const User = require('../models').users
const Sequelize = require('sequelize');

exports.showByKeyword = (req, res) => {
    // const title = req.body.title
    const Op = Sequelize.Op
    Event.findAll({
        include: [
            {
                model: Category,
                as: "categoryId"
            }
        ],
        where: {
            title: {
                [Op.like]: '%' + req.params.title + '%'
            }
        }
    })
        .then(event => res.send(event))
        .catch(err => res.send(err))

}
exports.showByToday = (req, res) => {
    const Op = Sequelize.Op
    Event.findAll({
        include: [
            {
                model: Category, attributes: ["id", "name"],
                as: "categoryId"
            }, {
                model: User, attributes: ['id', 'name', 'phone_number', 'email', 'img'],
                as: "createBy"
            }
        ]
    })
        .then(event => res.send(event))
        .catch(err => res.send(err))

}
exports.showByCategory = (req, res) => {

    Event.findAll({
        include: [
            {
                model: Category, attributes: ['id', 'name'],
                as: "categoryId"
            },
            {
                model: User, attributes: ['id', 'name', 'phone_number', 'email', 'img'],
                as: "createBy"
            }
        ], where: { category_event: req.params.id }
    }).then(event => res.send(event)).catch(err => res.send(err))
}
exports.showById = (req, res) => {
    Event.findOne({
        include: [
            {
                model: Category, attributes: ["id", "name"],
                as: "categoryId"
            }, {
                model: User, attributes: ['id', 'name', 'phone_number', 'email', 'img'],
                as: "createBy"
            }
        ],
        where: { id: req.params.id }
    })
        .then(event => res.send(event))
        .catch(err => res.send(err))

}
exports.addEvent = (req, res) => {
    Event.create(req.body)
        .then(events => {
            if (events) {
                res.send({
                    message: "success",
                    events
                })
            }
        })
        .catch(err => res.send)
}
