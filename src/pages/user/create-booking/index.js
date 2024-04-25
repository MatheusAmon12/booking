import { 
    FormControl, 
    FormHelperText, 
    Input, 
    InputLabel 
} from "@mui/material"
import { Formik } from "formik"
import axios from "axios"

import TemplateDefault from "../../../templates/Default"
import { initialValues, validationSchema } from "../../../utils/formValuesBooking"
import useToasty from "@/context/Toasty"
import useStyles from "../../../styles/createBookingStyles"
import ButtonComponent from "@/components/Button"
import { baseURL } from "@/utils/axiosBaseUrl"

const CreateBooking = () => {
    const { classes } = useStyles()
    const { setToasty } = useToasty()

    const api = baseURL()
    
    const handleFormSubmit = async (values) => {
        try{
            const response = await api.post("/bookings", {
                roomId: values.roomId,
                guestName: values.name,
                checkInDate: values.checkInDate,
                checkOutDate: values.checkOutDate
            })

            if(response.status === 201){
                setToasty({
                    open: true,
                    text: "Reserva criada com sucesso!",
                    severity: "success"
                })
            }
        } catch(error){
            if(error.response.status === 500){
                setToasty({
                    open: true,
                    text: "Quarto já reservado para as datas selecionadas!",
                    severity: "error"
                })
            }
        }
        
    }

    return(
        <TemplateDefault title={"Criar reserva"}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleFormSubmit(values)
                }}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleSubmit,
                    }) => {
                        return(
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <FormControl variant="outlined" error={errors.name && touched.name}>
                                    <InputLabel>
                                        Nome
                                    </InputLabel>
                                    <Input 
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                    />

                                    <FormHelperText>
                                        { errors.name && touched.name ? errors.name : null }
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="outlined" error={errors.roomId && touched.roomId}>
                                    <InputLabel>
                                        Nº Quarto
                                    </InputLabel>
                                    <Input 
                                        name="roomId"
                                        value={values.roomId}
                                        onChange={handleChange}
                                    />

                                    <FormHelperText>
                                        { errors.roomId && touched.roomId ? errors.roomId : null }
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="outlined" error={errors.checkInDate && touched.checkInDate} className={classes.form__date}>
                                    <Input
                                        type="date"  
                                        name="checkInDate"
                                        value={values.checkInDate}
                                        onChange={handleChange}
                                    />

                                    <FormHelperText>
                                        { errors.checkInDate && touched.checkInDate ? errors.checkInDate : null }
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="outlined" error={errors.checkOutDate && touched.checkOutDate} className={classes.form__date}>
                                    <Input
                                        type="date" 
                                        name="checkOutDate"
                                        value={values.checkOutDate}
                                        onChange={handleChange}
                                    />

                                    <FormHelperText>
                                        { errors.checkOutDate && touched.checkOutDate ? errors.checkOutDate : null }
                                    </FormHelperText>
                                </FormControl>

                                <ButtonComponent
                                    color="secondary"
                                    text={"criar"}
                                    fullWidth={false}
                                    margin={"40px 0 0"}
                                />
                            </form>
                        )
                    }
                }
            </Formik>
        </TemplateDefault>
    )
}

CreateBooking.requireAuth = true

export default CreateBooking