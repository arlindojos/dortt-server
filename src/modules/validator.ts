import { check } from "express-validator";


const validator = [
    check('emailUsr').isEmail().normalizeEmail()
    .withMessage('E-mail deve ter mínimo 5 caracteres e ter "@" '),

    check('passwordUsr').isLength({ min: 3, max: 15 })
    .withMessage('deve ter no mínimo 6 caracteres e número ou caracteres especiais'),

    check('name').isLength({ min: 3, max: 15 })
    .withMessage('deve ter no mínimo 3 caracteres, máximo 15'), 

    check('surname').isLength({ min: 3, max: 15 })
    .withMessage('deve ter no mínimo 3 caracteres, máximo 15')
];

export default validator;