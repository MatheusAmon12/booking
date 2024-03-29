import TopBar from "@/components/AppBar"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => {
  return{
    sidebar: {
        position: "absolute",
        top: "0",
        left: "0",
        padding: "16px 0 80px 64px",
        height: "100vh",
        width: "350px",
        backgroundColor: theme.palette.secondary.main,
    },
    sidebarHidden: {
        [theme.breakpoints.down("sm")]: {
            left: "-100vw",
            transition: "ease-out 300ms"
        }
    },
    sidebarShow: {
        [theme.breakpoints.down("sm")]: {
            left: "0",
            transition: "ease-in 300ms"
        }
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
    sidebar__containerGrid: {
        display: "flex",
        flexDirection: "column"
    },
    main: {
        marginLeft: "350px",
        padding: "160px 24px",

        [theme.breakpoints.down("sm")]: {
            margin: "0",
            padding: "160px 8px 160px 8px",
        }
    },
    link__decoration: {
        textDecoration: "none"
    },
  }
})

const TemplaDefault = ({ children, title }) => {
    const { classes } = useStyles()
    const [openMenu, setOpenMenu] = useState(false)

    const handleClickMenu = () => {
        setOpenMenu(!openMenu)
    }

    return(
        <>
            <Box className = {`${classes.sidebar} ${openMenu ? classes.sidebarShow : classes.sidebarHidden}`}>
                <Typography
                    color={"#FFF"}
                    component={"h1"}
                    variant="h1"
                    style={{marginBottom: "88px"}}
                >
                    Dreamscape
                </Typography>
                
                <Grid container rowGap="24px" className={classes.sidebar__containerGrid}>
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

            <TopBar onClickMenu={handleClickMenu}/>

            <main className={classes.main}>
                <Typography
                    component={"h2"}
                    variant="h2"
                    color={"black"}
                >
                    {title}
                </Typography>
                { children }
            </main>
        </>
    )
}

export default TemplaDefault