import express from 'express'
import { Router } from 'express';

const router = express.Router();
// get all admin data 
router.get('/');
// get single admin data
router.get('/:id');
//admin update
router.patch('/:id');
//admin delete
router.delete('/:id');
