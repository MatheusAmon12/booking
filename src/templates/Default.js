import { Box, Grid, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => {
  return{
    sidebar: {
        position: "fixed",
        padding: "16px 0 80px 64px",
        height: "100vh",
        width: "350px",
        backgroundColor: theme.palette.secondary.main,
    },
    sidebar__actions: {
        display: "flex",
        gap: "24px",
    },
    sidebar__logout: {
        position: "absolute",
        bottom: "80px",

        display: "flex",
        gap: "24px"
    },
    main: {
        marginLeft: "350px",
        padding: '160px 0 160px 24px'
    },
    link__decoration: {
        textDecoration: "none"
    }
  }
})

const TemplaDefault = ({ children }) => {
    const { classes } = useStyles()

    return(
        <>
            <Box className = {classes.sidebar}>
                <Typography
                    color={"#FFF"}
                    component={"h1"}
                    variant="h1"
                    style={{marginBottom: "88px"}}
                >
                    Dreamscape
                </Typography>
                
                <Grid container rowGap="24px">
                    <Grid item md={12} className={classes.sidebar__actions}>
                        <img src="/images/profile.svg"/>
                        <Link href={"/user/profile"} className={classes.link__decoration}>
                            <Typography
                                color={"#FFF"}
                                component={"h6"}
                                variant="h6"
                            >
                                Meu perfil
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item md={12} className={classes.sidebar__actions}>
                        <img src="/images/add.svg"/>
                        <Link href={"/user/create-booking"} className={classes.link__decoration}>
                            <Typography
                                color={"#FFF"}
                                component={"h6"}
                                variant="h6"
                            >
                                Criar reserva
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item md={12} className={classes.sidebar__actions}>
                        <img src="/images/list.svg"/>
                        <Link href={"/"} className={classes.link__decoration}>
                            <Typography
                                color={"#FFF"}
                                component={"h6"}
                                variant="h6"
                            >
                                Listar reservas
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

                <div className={classes.sidebar__logout}>
                    <Typography
                        color={"#FFF"}
                        component={"h6"}
                        variant="h6"
                    >
                        Username
                    </Typography>
                    <Link href={"/auth/signin"}>
                        <img src="/images/logout.svg" />
                    </Link>
                </div>
            </Box>

            <main className={classes.main}>
                { children }
            </main>
        </>
    )
}

export default TemplaDefault