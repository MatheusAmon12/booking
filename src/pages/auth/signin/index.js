import { useState } from "react"

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

import { Email, Visibility, VisibilityOff } from "@mui/icons-material"

import { makeStyles } from "tss-react/mui"
import { Formik } from "formik"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"

import { initialValues, validationSchema } from "./formValues"
import TemplateAuth from "@/templates/Auth"

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
                padding: "20px 35px",
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

const Signin = () => {
    const { classes } = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const {data: session, status} = useSession()

    console.log(session, status)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleFormSubmit = async (values) => {
        await signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
    }
    const handleClickGoogle = async () => {
        await signIn('google', {
            callbackUrl: "/"
        })
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
                                            className={classes.margin__bottom__16}
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
                                                            onClick={handleClickShowPassword}
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
                                            entrar
                                        </Button>
                                        <span className={classes.margin__bottom__16}>
                                            OU
                                        </span>
                                        <IconButton
                                            disableRipple
                                            className={classes.margin__bottom__8}
                                            onClick={handleClickGoogle}
                                        >
                                            <img src="/images/google.svg"/>
                                            <span
                                                style={{marginLeft: "16px", color: "#02385A"}}
                                            >
                                                Entre com o Google
                                            </span>
                                        </IconButton>
                                        <span style={{fontSize: ".75rem"}}>
                                            Não tem conta?
                                            <Link href={"/auth/signup"} className={classes.form__link}>
                                                <strong>Crie a sua.</strong>
                                            </Link>
                                        </span>
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

export default Signin