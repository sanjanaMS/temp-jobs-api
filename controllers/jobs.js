
const Job = require('../models/Job')
const StatusCode = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors/')
const getAllJobs = async (req, res) => {

    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')


    res.status(StatusCode.OK).json({ jobs, count: jobs.length })
}

const getSingleJob = async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.userId })
    if (!job) {
        throw new NotFoundError(`job not found with  the particular jobid ${req.params.id}`)
    }
    res.status(StatusCode.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    console.log(req.user);
    const job = await Job.create(req.body)
    res.status(StatusCode.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const { company, position } = req.body;
    if (company === ' ' || position === '') {
        throw new BadRequestError('provide company and position')
    }
    const job = await Job.findByIdAndUpdate({ _id: req.params.id, createdBy: req.user.userId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError('not found')
    }

    res.status(StatusCode.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const job = await Job.findByIdAndRemove({ _id: req.params.id, createdBy: req.user.userId })
    if (!job) {
        throw new NotFoundError('not found')
    }
    res.status(StatusCode.OK).send()


}


module.exports = {
    getAllJobs, getSingleJob, createJob, updateJob, deleteJob
}