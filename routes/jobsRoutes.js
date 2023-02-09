import express from 'express'
import { createJob, deleteJob, getAllJob, updateJob, showStats } from '../controllers/jobsController.js'

const router = express.Router()

router.route('/').post(createJob).get(getAllJob)
// remember about :id
router.route('/').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router