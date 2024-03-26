import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#02385A",
        },
        secondary: {
            main: "#0367A5",
        },
        background: {
            default: "#FFF",
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1440
        }
    },
    typography: {
        h1: {
            fontSize: "2.5rem",
            fontWeight: "bold"
        },
        h2: {
            fontSize: "2rem",
            fontWeight: "bold"
        },
        body1: {
            fontSize: "1.5rem"
        },
        body2: {
            fontSize: "1rem"
        },
        h6: {
            fontSize: "1rem",
            fontWeight: "bold"
        }
    }
})

export default theme