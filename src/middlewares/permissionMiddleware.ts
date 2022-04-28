import {NextFunction, Request, Response} from "express"

export default (permissions: string[]) => (req: Request,res: Response, next: NextFunction) => {
    const usr = req.user as any
    if(!permissions.includes(usr.role)){
        return next(new Error('Forbidden'))
    }
    console.log(req.user)
    return next()
}