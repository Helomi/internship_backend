export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum TIME_UNIT_SUBSTANCE {
    SECOND = 'SECOND',
    MINUTE = 'MINUTE',
    HOUR = 'HOUR',
    DAY = 'DAY'
}

export enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export const GENDERS = Object.values(GENDER)
export const TIME_UNIT_SUBSTANCES = Object.values(TIME_UNIT_SUBSTANCE)
export const ROLES = Object.values(ROLE)