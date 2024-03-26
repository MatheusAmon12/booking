import { Box, Grid, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"

import TemplaDefault from "@/templates/Default"

const useStyles = makeStyles()((theme) => {
  return{
    main: {
      marginLeft: "350px",
      padding: '160px 0 0 24px'
    },
    main__table: {
      width: "880px",
      marginTop: "32px",
      borderCollapse: "collapse"
    },
    main__table__border: {
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      textAlign: "left",
      padding: "8px"
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

const Home = () => {
  const { classes } = useStyles()

  return(
    <TemplaDefault>
      <Typography
        component={"h2"}
        variant="h2"
        color={"black"}
      >
        Lista de reservas
      </Typography>

      <table className={classes.main__table}>
        <thead>
          <tr>
            <th className={`${classes.main__table__border} ${classes.main__table_th}`}>
              Nome
            </th>
            <th className={`${classes.main__table__border} ${classes.main__table_th}`}>
              E-mail
            </th>
            <th className={`${classes.main__table__border} ${classes.main__table_th}`}>
              Check-in
            </th>
            <th className={`${classes.main__table__border} ${classes.main__table_th}`}>
              Check-out
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.main__table__border}>
              Matheus Amon
            </td>
            <td className={classes.main__table__border}>
              amonmatheus757@gmail.com
            </td>
            <td className={classes.main__table__border}>
              12/07/2024
            </td>
            <td className={classes.main__table__border}>
              14/07/2024
            </td>
          </tr>
        </tbody>
      </table>
    </TemplaDefault>
  )
}

export default Home