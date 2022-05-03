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

export enum USER_ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum PERSON_TYPE {
    CHILD = 'CHILD',
    ADULT = 'ADULT'
}

export const GENDERS = Object.values(GENDER)
export const TIME_UNIT_SUBSTANCES = Object.values(TIME_UNIT_SUBSTANCE)
export const USER_ROLES = Object.values(USER_ROLE)
export const PERSON_TYPES = Object.values(PERSON_TYPE)