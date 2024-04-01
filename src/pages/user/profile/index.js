import TemplaDefault from "@/templates/Default"
import { Button, FormControl, FormHelperText, IconButton, Input, InputLabel, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { Formik } from "formik"

import { initialValues, validationSchema } from "./formValues"
import { Edit } from "@mui/icons-material"
import { useState } from "react"

const useStyles = makeStyles()((theme) => {
    return{
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
        button: {
            width: "250px",
            height: "54px",
            marginTop: "40px",
            fontSize: "24px"
        },
    }
})

const Profile = () => {
    const { classes } = useStyles()
    const [disabledName, setDisableName] = useState(true)
    const [disabledEmail, setDisableEmail] = useState(true)
    const [disabledPassword, setDisablePassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleDisabled = (field) => {
        if(field === "name"){
            setDisableName(!disabledName)
        }else if(field === "email"){
            setDisableEmail(!disabledEmail)
        }else if(field === "password"){
            setDisablePassword(!disabledPassword)
            setShowConfirmPassword(!showConfirmPassword)
        }
    }

    return(
        <TemplaDefault title={"Meu perfil"}>
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
                                        value={"Matheus Amon dos Santos Ferreira"}
                                        onChange={handleChange}
                                        disabled={disabledName ? true : false}
                                        endAdornment={
                                            <IconButton edge="end"
                                                onClick={() => handleDisabled("name")}
                                            >
                                                <Edit />
                                            </IconButton>
                                        }
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
                                        value={"amonmatheus757@gmail.com"}
                                        onChange={handleChange}
                                        disabled={disabledEmail ? true : false}
                                        endAdornment={
                                            <IconButton edge="end"
                                                onClick={() => handleDisabled("email")}
                                            >
                                                <Edit />
                                            </IconButton>
                                        }
                                    />

                                    <FormHelperText>
                                        { errors.email && touched.email ? errors.email : null }
                                    </FormHelperText>
                                </FormControl>

                                <FormControl variant="outlined" error={errors.password && touched.password}>
                                    <InputLabel>
                                        Senha
                                    </InputLabel>
                                    <Input 
                                        name="password"
                                        value={"MatheusAmon"}
                                        type={disabledPassword ? "password" : "text"}
                                        onChange={handleChange}
                                        disabled={disabledPassword ? true : false}
                                        endAdornment={
                                            <IconButton edge="end"
                                                onClick={() => handleDisabled("password")}
                                            >
                                                <Edit />
                                            </IconButton>
                                        }
                                    />

                                    <FormHelperText>
                                        { errors.password && touched.password ? errors.password : null }
                                    </FormHelperText>
                                </FormControl>

                                {
                                    showConfirmPassword ?
                                        <FormControl 
                                            variant="outlined" 
                                            error={errors.passwordConfirm && touched.passwordConfirm}
                                        >
                                            <InputLabel>
                                                Confirmar senha
                                            </InputLabel>
                                            <Input 
                                                name="passwordConfirm"
                                                value={"MatheusAmon"}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                { errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : null }
                                            </FormHelperText>
                                        </FormControl> 
                                        : null
                                        
                                }

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

Profile.requireAuth = true

export default Profile