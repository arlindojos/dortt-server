import * as yup from 'yup';

export default {
  async user(
    name: any,
    surname: any,
    emailUsr: any,
    passwordUsr: any,
    websites: any,
    development: any
    ) {
    const schema = yup.object().shape({
      name: yup.string()
        .required('Nome obrigatório')
        .min(6, 'Nome deve ter mínimo 6 máximo 30 caracteres')
        .max(30, 'Nome deve ter mínimo 6 máximo 30 caracteres'),
      surname: yup.string()
        .required('apelido obrigatório')
        .min(4, 'apelido deve ter mínimo 4 máximo 15 caracteres')
        .max(15, 'apelido deve ter mínimo 4 máximo 15 caracteres'),
      emailUsr: yup.string()
        .email('inclua "@" no endereço de email')
        .required('email obrigatório'),
      websites: yup.boolean().required(),
      development: yup.boolean().required(),
      passwordUsr: yup.string()
        .min(8, 'Sua palavra-chave deve ter mínimo 8 máximo 15 caracteres')
        .max(15, 'Sua palavra-chave deve ter mínimo 8 máximo 15 caracteres')
        .required('Palavra-chave é obrigatória')
    })

    await schema.validate({
      name,
      surname, 
      emailUsr, 
      passwordUsr,
      websites, 
      development
    }, {
      abortEarly: false
    })
  }
}