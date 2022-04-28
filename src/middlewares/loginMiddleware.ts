import {NextFunction, Request, Response} from "express";
import passport from "passport";

export default function loginMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('login',
            async (err, user, info) => {
                if (err) return res.status(500).json({ message: "Something goes wrong"})
                if (!user) return res.status(401).json(info)
                res.locals.user = user
                return next()
                })(req, res, next)
    }
}



