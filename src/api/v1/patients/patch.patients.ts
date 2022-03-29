import { Request, Response } from 'express'




export const workflow = (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (id == 1) {
        res.json({
            messages: [{
                message: "Pacientove dáta boli úspešne upravené",
                type: 'SUCCESS'
            }]
        })
    }
}