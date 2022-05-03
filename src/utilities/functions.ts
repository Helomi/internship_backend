import {PERSON_TYPE} from "./enums";

let FORMULA_PARAMS:any = []

FORMULA_PARAMS[PERSON_TYPE.ADULT] = {
    paramA: 2,
    paramB: 30,
    maxLimit: 220
}
FORMULA_PARAMS[PERSON_TYPE.CHILD]={
    paramA: 1.6,
    paramB: 20,
    maxLimit: 150
}





export const calculateSubstanceAmount = (personType: PERSON_TYPE, weight: number): number | null =>{
    const {paramA, paramB, maxLimit} = FORMULA_PARAMS[personType]
    let amount:number = null
    amount = (paramA*weight)+paramB
    amount = Math.min(amount, maxLimit)
    return amount
}