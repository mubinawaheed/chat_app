const express = require('express')
const router = express.Router();
const Msgs = require('../models/Msgs')

router.post('/storemsg', async(req, res) => {
    try {
        console.log('the user name is', req.body.username)
        console.log('the msg is', req.body.msg)

        const newmsg = new Msgs({ username: req.body.username, msg: req.body.msg })
        const savedmsg = await newmsg.save()
        res.json(savedmsg)


    } catch (error) {
        console.error(error.message)
        res.status(500).json("Some error occured")
    }
})


module.exports = router;