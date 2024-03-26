import * as yup from "yup"

const initialValues = {
    name: "",
    email: "",
    password: "",
}

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2, "Mínimo de 2 caracteres!")
        .required("Campo obrigatório!"),
    email: yup.string()
        .email("Formato de E-mail inválido!")
        .required("Campo obrigatório!"),
    password: yup.string()
        .min(8, "Mínimo de 8 caracteres!")
        .required("Campo obrigatório!")

})

export{
    initialValues,
    validationSchema
}