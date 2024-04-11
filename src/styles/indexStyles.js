import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => {
    return{
      main__table: {
        width: "100%",
        marginTop: "32px",
        borderCollapse: "collapse",
        tableLayout: "fixed",
  
        [theme.breakpoints.down("sm")]: {
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "1rem"
        }
      },
      main__table__border: {
        border: "1px solid",
        borderColor: theme.palette.secondary.main,
        textAlign: "left",
        padding: "8px",
        overflowX: "scroll",
        whiteSpace: "nowrap",
      },
      main__table_th: {
        backgroundColor: theme.palette.secondary.main,
        color: "#FFF"
      },
      textWhite: {
        color: "#FFF"
      }
    }
  })

  export default useStyles