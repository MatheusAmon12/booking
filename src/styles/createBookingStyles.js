import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => {
    return{
        title: {
            marginBottom: "32px",
        },
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
        form__date: {
            width: "12vw",
            [theme.breakpoints.down("sm")]: {
                width: "45vw"
            }
        },
        button: {
            width: "250px",
            height: "54px",
            marginTop: "40px",
            fontSize: "24px"
        }
    }
})

export default useStyles