import TemplaDefault from "@/templates/Default"
import { Button, FormControl, FormHelperText, IconButton, Input, InputLabel, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { Formik } from "formik"

import { initialValues, validationSchema } from "./formValues"
import { Edit } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import useToasty from "@/context/Toasty"

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
    const [user, setUser] = useState({})
    const [userLoaded, setUserLoaded] = useState(false)
    const { setToasty } = useToasty()
    const { data: session } = useSession()

    const api = axios.create({
        baseURL: "http://localhost:3333/api/"
    })
    const userEmail = session.user.email

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
    const handleFormSubmit = async (values) => {
        try{
            await api.put("/auth/update", {
                id: user.id,
                name: values.name,
                email: values.email,
                password: values.password
            })
    
            setToasty({
                open: true,
                text: "Cadastro atualizado com sucesso!",
                severity: "success"
            })

            await signOut({
                callbackUrl: "/auth/signin"
            })
        } catch(error){
            setToasty({
                open: true,
                text: "Erro ao atualizar cadastro! Tente novamente.",
                severity: "error"
            })
        }

    }

    useEffect(() => {
        api.get(`/auth/user?email=${userEmail}`)
            .then(response => {
                const user = response.data.storedUser
                setUser(user)
                
                setUserLoaded(true)
            })
            .catch(error => console.log(error))
    }, [])

    console.log("nome do usuário", user.name)

    return(
        <TemplaDefault title={"Meu perfil"}>
            {
                userLoaded ? (
                    <Formik
                        initialValues={{
                            name: `${user.name}`,
                            email: `${user.email}`,
                            password: "",
                            passwordConfirm: ""
                        }}
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
                                        <FormControl variant="outlined" error={errors.name && touched.name}>
                                            <InputLabel>
                                                Nome
                                            </InputLabel>
                                            <Input 
                                                name="name"
                                                value={values.name}
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
                                                value={values.email}
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
                                                value={values.password}
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
                                                        value={values.passwordConfirm}
                                                        onChange={handleChange}
                                                    />
                                                    <FormHelperText>
                                                        { errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : null }
                                                    </FormHelperText>
                                                </FormControl> 
                                                : null
                                                
                                        }

                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            color="secondary" 
                                            className={classes.button}
                                        >
                                            salvar
                                        </Button>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                )
                : (<Typography>Carregando...</Typography>)
            }
        </TemplaDefault>
    )
}

Profile.requireAuth = true

export default Profile