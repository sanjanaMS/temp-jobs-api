const express = require('express');
const jobRouter = express.Router();
const { getAllJobs, getSingleJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')

jobRouter.route('/').get(getAllJobs).post(createJob)
jobRouter.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob)

module.exports = jobRouter