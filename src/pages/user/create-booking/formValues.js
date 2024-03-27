import * as yup from "yup"

const initialValues = {
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    roomId: "",
}

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2, "Mínimo de 2 caracteres!")
        .required("Campo obrigatório!"),
    email: yup.string()
        .email("Formato de E-mail inválido!")
        .required("Campo obrigatório!"),
    checkInDate: yup.date()
        .min(new Date(), "O check-in não pode ser anterior ao dia atual!")
        .required("Campo obrigatório!"),
    checkOutDate: yup.date()
        .min(yup.ref("checkInDate"), "O check-out não pode ser anterior ao check-in!")
        .required("Campo obrigatório!"),
    roomId: yup.number()
        .min(101, "Os quartos iniciam em 101!")
        .max(530, "Os quartos vão até o número 530!")
        .required("Campo obrigatório!")

})

export{
    initialValues,
    validationSchema
}