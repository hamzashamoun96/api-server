'use strict'
const express = require('express');
const validator = require('../middleware/validator.js');
const Cloth = require('../models/data-collection-class.js');
const clothesModel = require('../models/clothes.js');
const cloth = new Cloth(clothesModel);
const router = express.Router();

router.get('/', getAllcloth);
router.get('/:id',validator, getClothById);
router.get('/',validator, getClothById);
router.post('/', createCloth);
router.put('/:id',validator,updateCloth);
router.put('/',validator,updateCloth);
router.delete('/:id',validator,deleteCloth);
router.delete('/',validator,deleteCloth);

async function getAllcloth(req, res, next) {
    try {
        const readcloth = await cloth.read();
        res.json(readcloth);
    } catch (error) {
        next(error)
    }
};
async function getClothById(req, res, next) {
    try {
        const readcloth = await cloth.read(req.params.id)
        res.json(readcloth[0]);
    } catch (error) {
        next(error)
    }
}
async function createCloth(req, res, next) {
    try {
        const createcloth = await cloth.create(req.body);
        res.json(createcloth);
    } catch (error) {
        next(error)
    }
}
async function updateCloth(req, res, next) {
    try {
        const updatecloth = await cloth.update(req.params.id, req.body)
        res.json(updatecloth)
    } catch (error) {
        next(error)
    }
}
async function deleteCloth(req, res, next) {
    try {
        await cloth.delete(req.params.id)
        const afterDelete = await cloth.read()
        res.json(afterDelete)
    } catch (error) {
        next(error)
    }

}

module.exports = router;