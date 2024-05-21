import * as yup from "yup"

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2, "Mínimo de dois caracteres!")
        .required("Campo obrigatório!"),
    email: yup.string()
        .email("Formato de E-mail inválido!")
        .required("Campo obrigatório!"),
    password: yup.string()
        .min(8, "Mínimo de 8 caracteres!")
        .required("Campo obrigatório!"),
    passwordConfirm: yup.string()
        .oneOf([yup.ref("password"), null], "As senhas não coincidem!")
        .required("Campo obrigatório!")

})

export {
    validationSchema
}