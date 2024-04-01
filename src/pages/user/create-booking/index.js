import TemplaDefault from "@/templates/Default"
import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { Formik } from "formik"

import { initialValues, validationSchema } from "./formValues"
import axios from "axios"

const useStyles = makeStyles()((theme) => {
    return{
        title: {
            marginBottom: "32px",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            rowGap: "16px",
            width: "60%",
            [theme.breakpoints.down("sm")]: {
                width: "90%",
                margin: "0 auto"
            }
        },
        form__date: {
            width: "12vw",
            [theme.breakpoints.down("sm")]: {
                width: "45vw"
            }
        },
        button: {
            width: "250px",
            height: "54px",
            marginTop: "40px",
            fontSize: "24px"
        }
    }
})

const CreateBooking = () => {
    const { classes } = useStyles()
    const api = axios.create({
        baseURL: "http://localhost:3333/api/"
    })
    
    const handleFormSubmit = (values) => {
        api.post("/bookings", {
            roomId: values.roomId,
            guestName: values.name,
            checkInDate: values.checkInDate,
            checkOutDate: values.checkOutDate
        })
            .then(response => console.log(response))
            .catch(error => console.log("Erro ao criar reserva:", error))
    }

    return(
        <TemplaDefault title={"Criar reserva"}>
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

                                <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                                    salvar
                                </Button>
                            </form>
                        )
                    }
                }
            </Formik>
        </TemplaDefault>
    )
}

export default CreateBooking