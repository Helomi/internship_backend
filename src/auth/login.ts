import Joi from "joi";
import {Request, Response} from "express";




export const schema = Joi.object( {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow = async (req: Request, res: Response) => {
    res.status(200).json(res.locals.user)
}