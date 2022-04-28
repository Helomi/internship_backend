import express from 'express'

import v1 from './api/v1'
import auth from './auth'
import passport from "passport";

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.use(passport.initialize())
require('./auth/strategy/local/login')

// Register router
app.use('/api/v1', v1())
app.use('/auth', auth())

export default app