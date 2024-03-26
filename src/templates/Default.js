import { Box, Grid, Typography } from "@mui/material"
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
        padding: '160px 0 0 24px'
    },
    textWhite: {
        color: "#FFF"
    }
  }
})

const TemplaDefault = ({ children }) => {
    const { classes } = useStyles()

    return(
        <>
            <Box className = {classes.sidebar}>
                <Typography
                    className={classes.textWhite}
                    component={"h1"}
                    variant="h1"
                    style={{marginBottom: "88px"}}
                >
                    Dreamscape
                </Typography>
                
                <Grid container rowGap="24px">
                    <Grid item md={12} className={classes.sidebar__actions}>
                        <img src="/images/profile.svg"/>
                        <Typography
                            className={classes.textWhite}
                            component={"h6"}
                            variant="h6"
                        >
                            Meu perfil
                        </Typography>
                    </Grid>

                    <Grid item md={12} className={classes.sidebar__actions}>
                        <img src="/images/add.svg"/>
                        <Typography
                            className={classes.textWhite}
                            component={"h6"}
                            variant="h6"
                        >
                            Criar reserva 
                        </Typography>
                    </Grid>

                    <Grid item md={12} className={classes.sidebar__actions}>
                        <img src="/images/list.svg"/>
                        <Typography
                            className={classes.textWhite}
                            component={"h6"}
                            variant="h6"
                        >
                            Listar reservas
                        </Typography>
                    </Grid>
                </Grid>

                <div className={classes.sidebar__logout}>
                    <Typography
                        className={classes.textWhite}
                        component={"h6"}
                        variant="h6"
                    >
                        Username
                    </Typography>
                    <img src="/images/logout.svg" />
                </div>
            </Box>

            <main className={classes.main}>
                { children }
            </main>
        </>
    )
}

export default TemplaDefault