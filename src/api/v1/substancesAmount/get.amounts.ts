import {Request, Response} from 'express';
import {calculateSubstanceAmount} from "../../../utilities/functions";
import {PERSON_TYPE} from "../../../utilities/enums";



export const workflow = async (req:Request, res: Response) => {
    let values:any = []
    for(let i:number=1;i<=400;i++){
        if(i<=200){
            values[i-1] = {
                personType: PERSON_TYPE.ADULT,
                substanceAmount: calculateSubstanceAmount(PERSON_TYPE.ADULT, i),
                weight: i
        }
        }else{
            values[i-1] = {
                personType: PERSON_TYPE.CHILD,
                substanceAmount: calculateSubstanceAmount(PERSON_TYPE.CHILD, i-200),
                weight: i-200
            }
        }
    }
    return res.json({
        values
    })
}