import { makeStyles } from "tss-react/mui"

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

export default useStyles