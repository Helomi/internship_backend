import { Request, Response } from 'express'




export const workflow = (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (id == 1) {
        res.json({
            patient: {
                id: 1,
                firstName: "john",
                lastName: "doe",
                birthdate: new Date(1982, 3, 21),
                weight: 48,
                height: 185,
                identificationNumber: '123456789012',
                gender: "MALE",
                age: 14,
                personType: "ADULT",
                substanceAmount: 56461653,
                diagnose: {
                    id: 68468486,
                    name: "Nejaká",
                    description: "Nejaká choroba",
                    substance: {
                        id: 65489864,
                        name: "Vápnik",
                        timeUnit: "DAY",
                        halfLife: 64516581,
                    }
                }
            }
        })
    }
}