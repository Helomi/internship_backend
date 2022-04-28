import passport from "passport";
import {Request} from "express";
import {ExtractJwt, Strategy as JwtStrategy, VerifiedCallback} from "passport-jwt";
import {Strategy as LocalStrategy} from "passport-local";
import {ROLE, ROLES} from "../utilities/enums";
import {models} from "../db";




passport.use('login', new LocalStrategy({
        passReqToCallback: false, passwordField: "password", session: false, usernameField: "username",
    },
    async (username: string, password: string, done: any) => {
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

passport.use('jwt-api', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token'), ExtractJwt.fromHeader('token')]),
    passReqToCallback: true,
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: true
}, (req: Request, payload: any, done: VerifiedCallback)=>{
    let user
    console.log(payload)
    if(!Object.values(ROLES).includes(payload.role)){
        throw new Error('Unauthorized')
    }
    if(payload.role===ROLE.USER){
        user={
            id: payload.id,
            patient_id: payload.p_id,
            role: ROLE.USER
        }
    }else if(payload.role===ROLE.ADMIN){
        user={
            id: payload.id,
            patient_id: payload.p_id,
            role: ROLE.ADMIN
        }
    }else{
        user={
            id: payload.id,
            patient_id: payload.p_id,
            role: ROLE.SUPER_ADMIN
        }
    }
    done(null, user)
}))