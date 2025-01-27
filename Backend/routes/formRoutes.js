// routes/formRoutes.js
const express = require('express');
const { createForm, getAllForms, getFormsByUser, updateForm, deleteForm ,getResponsesByForm,getFormById,submitResponse} = require('../controllers/formController');
const {authMiddleware,admin}=require("../middleware/authMiddleware");

const router = express.Router();

router.post('/', authMiddleware, createForm);
router.get('/public', getAllForms);
router.get('/:id',authMiddleware, getFormById);
router.get('/user', authMiddleware, getFormsByUser);
router.put('/:id', authMiddleware, updateForm);
router.delete('/:id', authMiddleware, deleteForm);
router.get('/:id/responses',  getResponsesByForm);
router.post('/:formId/responses', submitResponse);

module.exports = router;