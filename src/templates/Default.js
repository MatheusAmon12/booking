import { Logout } from "@mui/icons-material"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

import TopBar from "@/components/AppBar"
import useStyles from "../styles/templateDefaultStyles"

const TemplaDefault = ({ children, title }) => {
    const { classes } = useStyles()
    const [openMenu, setOpenMenu] = useState(false)
    const {data: session} = useSession()
    console.log(session.user.name)

    const handleClickMenu = () => {
        setOpenMenu(!openMenu)
    }
    const handleLogOut = async () => {
        await signOut({
            callbackUrl: "/auth/signin"
        })
    }

    return(
        <>  
            <TopBar onClickMenu={handleClickMenu}/>

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
                        {
                            session.user.name
                        }
                    </Typography>
                    <IconButton onClick={handleLogOut}>
                        <Logout color="#FFFFFF" />
                    </IconButton>
                </div>
            </Box>

            <main className={classes.main}>
                <Typography
                    component={"h2"}
                    variant="h2"
                    color={"secondary"}
                    style={{marginBottom: "16px"}}
                >
                    {title}
                </Typography>
                { children }
            </main>
        </>
    )
}

export default TemplaDefault