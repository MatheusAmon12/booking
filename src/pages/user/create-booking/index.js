import TemplaDefault from "@/templates/Default"
import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { Formik } from "formik"

import { initialValues, validationSchema } from "./formValues"

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
        },
        form__date: {
            width: "12vw"
        },
        button: {
            width: "250px",
            height: "54px",
            marginTop: "40px",
            fontSize: "24px"
        }
    }
})

const Profile = () => {
    const { classes } = useStyles()

    return(
        <TemplaDefault title={"Criar reserva"}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
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

                                <FormControl variant="outlined" error={errors.email && touched.email}>
                                    <InputLabel>
                                        E-mail
                                    </InputLabel>
                                    <Input 
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />

                                    <FormHelperText>
                                        { errors.email && touched.email ? errors.email : null }
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

export default Profile