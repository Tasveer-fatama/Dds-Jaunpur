import express from 'express';
const router = express.Router();

import upload from '../middleware/uploads.js';

import {
  createStudent,
  getAllStudents,
  getStudentById,
  searchStudent,
  updateStudent,
  deleteStudent,
  regeneratePDF
} from '../controlers/studentcontroller.js';

// Routes
router.post('/create', upload.single('photo'), createStudent);
router.get('/all', getAllStudents);
router.get('/search', searchStudent);
router.get('/:id', getStudentById);
router.put('/update/:id', upload.single('photo'), updateStudent);
router.delete('/delete/:id', deleteStudent);
router.post('/regenerate-pdf/:id', regeneratePDF);

export default router;