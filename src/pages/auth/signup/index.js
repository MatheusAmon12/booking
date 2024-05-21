import { useState } from "react"

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

import { Email, Person, Visibility, VisibilityOff } from "@mui/icons-material"

import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"

import { initialValues, validationSchema } from "../../../utils/formValuesSignup"
import TemplateAuth from "../../../templates/Auth"
import useToasty from "../../../context/Toasty"
import useStyles from "../../../styles/signUpStyles"
import ButtonComponent from "../../../components/Button"
import { baseURL } from "@/utils/axiosBaseUrl"

const Signup = () => {
    const { classes } = useStyles()
    const router = useRouter()
    const { setToasty } = useToasty()

    const api = baseURL()

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

            router.push(`/auth/signin`)
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
                                                aria-label="Nome"
                                                role="name"
                                                name="name"
                                                value={values.name}
                                                type="text"
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
                                                aria-label="E-mail"
                                                role="email"
                                                name="email"
                                                value={values.email}
                                                type="text"
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
                                                aria-label="Senha"
                                                role="password"
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
                                                aria-label="Confirmar senha"
                                                role="passwordConfirm"
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
                                        <ButtonComponent
                                            color="primary"
                                            text={"cadastrar"}
                                            fullWidth={true}
                                            margin={"0 0 16px"}
                                        />
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