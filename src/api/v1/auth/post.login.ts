import Joi from "joi";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";

export const schema = Joi.object( {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow = async (req: Request, res: Response) => {
    const user = res.locals.user
    const body = { id: user.id, role: user.role, p_id: user.patientID };
    const token = jwt.sign(body, process.env.JWT_SECRET)
    res.status(200).json({ status: "Success", message: "Your token was successfully generated", token: token })
}