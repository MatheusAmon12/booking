import { useEffect, useState } from "react"

import { 
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

import { Formik } from "formik"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

import { initialValues, validationSchema } from "../../../utils/formValuesSignin"
import TemplateAuth from "@/templates/Auth"
import useToasty from "@/context/Toasty"
import useStyles from "../../../styles/signInStyles"
import ButtonComponent from "@/components/Button"

const Signin = () => {
    const { classes } = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const {setToasty} = useToasty()

    useEffect(() => {
        if(router.query.i){
            setToasty({
                open: true,
                text: "Usuário não encontrado! Verifique suas credenciais",
                severity: "error"
            })
        }
    }, [router.query])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleFormSubmit = async (values) => {
        await signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: "/",
        })
            .then(res => console.log(res))
    }
    const handleClickGoogle = async () => {
        await signIn('google', {
            callbackUrl: "/",
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
                                        <ButtonComponent
                                            color="primary"
                                            text={"entrar"}
                                            fullWidth={true}
                                            margin={"0 0 16px"}
                                        />

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