import { Container } from "@mui/material"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()(() => {
    return{
        container: {
            padding: "185px 0",
            background: "url(/images/backgroundLogin.webp) center center",
            backgroundSize: "cover",
        }
    }
})

const TemplateAuth = ({children}) => {
    const { classes } = useStyles()

    return(
        <Container maxWidth={"100vw"} disableGutters className={classes.container}>
            {children}
        </Container>
    )
}

export default TemplateAuth