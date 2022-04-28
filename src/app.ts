import express from 'express'

import v1 from './api/v1'
import passport from "passport";

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

passport.serializeUser((user: {patient_id: number}, done) => done(null, user))
passport.deserializeUser((user: {patient_id: number}, done) => done(null, user))

require('./passport/strategy')
app.use(passport.initialize())

// Register router
app.use('/api/v1', v1())

export default app