import { useState } from "react"
import axios from "axios"

import { 
    Button,
    Box, 
    Container, 
    FormControl, 
    FormHelperText, 
    Input, 
    InputLabel, 
    Typography, 
    InputAdornment,
    IconButton
} from "@mui/material"

import { Email, Person, Visibility, VisibilityOff } from "@mui/icons-material"

import { makeStyles } from "tss-react/mui"
import { Formik } from "formik"
import Link from "next/link"

import { initialValues, validationSchema } from "./formValues"
import TemplateAuth from "@/templates/Auth"
import useToasty from "@/context/Toasty"
import { useRouter } from "next/router"

const useStyles = makeStyles()((theme) => {
    return{
        container: {
            height: "100vh",
            position: "relative",
        },
        box: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            padding: "40px 70px",
            width: "520px",

            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10.7px)",
            border: '1px solid rgba(255, 255, 255, 0.21)',

            [theme.breakpoints.down("sm")]: {
                padding: "40px 35px",
                width: "350px",
            }
        },
        form: {  
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        form__link: {
            textDecoration: "none",
            color: theme.palette.primary.main
        },
        form__leftItem: {
            marginLeft: "auto"
        },
        margin__bottom__40: {
            marginBottom: "40px"
        },
        margin__bottom__24: {
            marginBottom: "24px"
        },
        margin__bottom__16: {
            marginBottom: "16px"
        },
        margin__bottom__8: {
            marginBottom: "8px"
        }
    }
})

const Signup = () => {
    const { classes } = useStyles()
    const router = useRouter()
    const { setToasty } = useToasty()

    const api = axios.create({
        baseURL: "http://localhost:3333/api/"
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const handleClickShowPassword = (field) => {
        if(field === "password"){
            setShowPassword(!showPassword)
        }else if(field === "confirmPassword"){
            setShowPasswordConfirm(!showPasswordConfirm)
        }
    }
    const handleFormSubmit = async (values) => {
        try{
            const response = await api.post("/auth/register", {
                name: values.name,
                email: values.email,
                password: values.password
            })

            if(response.status === 201){
                setToasty({
                    open: true,
                    text: "Usuário registrado com sucesso!",
                    severity: "success"
                })
            }

            router.push("/auth/signin")
        } catch(error){
            if(error.response.status === 400){
                setToasty({
                    open: true,
                    text: "E-mail já cadastrado!",
                    severity: "error"
                })
            }
        }
    }

    return(
        <TemplateAuth>
            <Container disableGutters maxWidth={"100vw"} className={classes.container}>
                <Box className={classes.box}>
                    <Typography
                        component={"h2"}
                        variant="h2"
                        color={"primary"}
                        textAlign={"center"}
                        className={classes.margin__bottom__40}
                    >
                        Login
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleFormSubmit(values)}
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
                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                            error={errors.name && touched.name}
                                            className={classes.margin__bottom__40}
                                        >
                                            <InputLabel>
                                                Nome
                                            </InputLabel>
                                            <Input
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <Person />
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>
                                                { errors.name && touched.name ? errors.name : null }
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                            error={errors.email && touched.email}
                                            className={classes.margin__bottom__40}
                                        >
                                            <InputLabel>
                                                E-mail
                                            </InputLabel>
                                            <Input
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <Email />
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>
                                                { errors.email && touched.email ? errors.email : null }
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                            error={errors.password && touched.password}
                                            className={classes.margin__bottom__40}
                                        >
                                            <InputLabel>
                                                Senha
                                            </InputLabel>
                                            <Input
                                                name="password"
                                                value={values.password}
                                                type={ showPassword ? "text" : "password" }
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => handleClickShowPassword("password")}
                                                            edge="end"
                                                        >
                                                            {
                                                                showPassword
                                                                    ? <Visibility />
                                                                    : <VisibilityOff />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>
                                                { errors.password && touched.password ? errors.password : null }
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                            error={errors.passwordConfirm && touched.passwordConfirm}
                                            className={classes.margin__bottom__16}
                                        >
                                            <InputLabel>
                                                Confirmar senha
                                            </InputLabel>
                                            <Input
                                                name="passwordConfirm"
                                                value={values.passwordConfirm}
                                                type={ showPasswordConfirm ? "text" : "password" }
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => handleClickShowPassword("confirmPassword")}
                                                            edge="end"
                                                        >
                                                            {
                                                                showPasswordConfirm
                                                                    ? <Visibility />
                                                                    : <VisibilityOff />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText>
                                                { errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : null }
                                            </FormHelperText>
                                        </FormControl>
                                        <Link
                                            href={"#"}
                                            className={
                                                `${classes.form__link} ${classes.margin__bottom__40} ${classes.form__leftItem}`
                                            }
                                        >
                                            <span>Esqueci minha senha</span>
                                        </Link>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            className={classes.margin__bottom__16}
                                        >
                                            registrar
                                        </Button>
                                        <span className={classes.margin__bottom__16}>
                                            OU
                                        </span>
                                        <IconButton
                                            disableRipple
                                        >
                                            <img src="/images/google.svg"/>
                                            <span
                                                style={{marginLeft: "16px", color: "#02385A"}}
                                            >
                                                Entre com o Google
                                            </span>
                                        </IconButton>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Container>
        </TemplateAuth>
    )
}

export default Signup