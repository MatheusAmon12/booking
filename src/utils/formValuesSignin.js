import * as yup from "yup"

const initialValues = {
    email: "",
    password: "",
}

const validationSchema = yup.object().shape({
    email: yup.string()
        .email("Formato de E-mail inválido!")
        .required("Campo obrigatório!"),
    password: yup.string()
        .min(8, "Mínimo de 8 caracteres!")
        .required("Campo obrigatório!"),
})

export{
    initialValues,
    validationSchema
}