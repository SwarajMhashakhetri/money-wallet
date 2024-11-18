require('dotenv').config({ path: '.env.local' })
const express = require('express')
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');

const JWT_SECRET = process.env.JWT_SECRET;

const SignupSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

router.post("/signup", async (req, res) => {
    const body = req.body
    const { success } = SignupSchema.safeParse(body);
    if (!success) {
        res.status(411).json({
            msg: "invalid input"
        })
    }

    const exsistingUser = await User.findOne({
        username: body.username
    })

    if (exsistingUser) {
        res.status(409).json({
            msg: "username already exists"
        })
    }

    const user = await User.create(body);
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)
    res.json({
        msg: "user created successfully",
        token: token
    })
})

const SigninSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin", async (req, res) => {
    const body = req.body
    const { success } = SigninSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "invalid input"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "error while logging in"
    })
})

const UpdateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = UpdateSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "error while uploading info"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })
    res.json({
        message: "updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router