import {models} from "../../../db";

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use('login', new localStrategy({
        passReqToCallBack: false
    },
    async (username: string, password: string, done: any) => {
        console.log(username)
        console.log(password)
        try {
            const {User: User} = models
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user) return done(null, false, {status: "Failure", message: 'User not found'})

            const result = await user.verifyPassword(password)

            if (!result) return done(null, false, {status: "Failure", message: 'Invalid password'})

            return done(null, user, {status: "Success", message: 'Logged in successfully'})
        } catch (error) {
            return done(error)
        }
    }))