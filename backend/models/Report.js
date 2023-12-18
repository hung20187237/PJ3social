const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        postReportId:{
            type: String,
        },
        commentReportId:{
            type: String,
        },
        desc: {
            type: String,
            required: true
        },
    },
    {timestamps: true})

module.exports = mongoose.model('Comment',CommentSchema)
