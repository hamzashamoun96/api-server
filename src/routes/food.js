'use strict'
const express = require('express');
const validator = require('../middleware/validator.js');
const Food = require('../models/data-collection-class.js');
const foodModel = require('../models/food.js');
const food = new Food(foodModel);
const router = express.Router();

router.get('/', getAllFoods);
router.get('/:id', validator, getFoodById);
router.get('/', validator, getFoodById);
router.post('/', createFood);
router.put('/:id', validator, updateFood);
router.put('/', validator, updateFood);
router.delete('/:id', validator, deleteFood);
router.delete('/', validator, deleteFood);

async function getAllFoods(req, res, next) {
    try {
        const readFood = await food.read();
        res.json(readFood);
    } catch (error) {
        next(error)
    }
};

async function getFoodById(req, res, next) {
    try {
        const readFood = await food.read(req.params.id)
        res.json(readFood[0]);
    } catch (error) {
        next(error)
    }
}

async function createFood(req, res, next) {
    try {
        const createFood = await food.create(req.body);
        res.json(createFood);
    } catch (error) {
        next(error)
    }
}

async function updateFood(req, res, next) {
    try {
        const updateFood = await food.update(req.params.id, req.body)
        res.json(updateFood)
    } catch (error) {
        next(error)
    }
}

async function deleteFood(req, res, next) {
    try {
        await food.delete(req.params.id)
        const afterDelete = await food.read()
        res.json(afterDelete)
    } catch (error) {
        next(error)
    }

}

module.exports = router;