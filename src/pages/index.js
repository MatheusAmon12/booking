import { makeStyles } from "tss-react/mui"

import TemplaDefault from "@/templates/Default"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

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

const Home = () => {
  const { classes } = useStyles()
  const [bookings, setBookings] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession()
  console.log(session, status)

  const api = axios.create({
    baseURL: "http://localhost:3333/api/"
  })

  useEffect(() => {
    api.get("/bookings")
      .then(response => {
        setBookings(response.data.bookings)
      })
      .catch(error => console.log("Error na listagem:", error))
  }, [])

  return(
    <TemplaDefault title={"Lista de reservas"}>
      <div style={{overflowX: "auto"}}>
        <table className={classes.main__table}>
          <thead>
            <tr>
              <th className={`${classes.main__table__border} ${classes.main__table_th}`}>
                Nome
              </th>
              <th className={`${classes.main__table__border} ${classes.main__table_th}`}>
                Nº do Quarto
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
            {
              bookings.map(booking => (
                <tr key={booking.id}>
                  <td className={classes.main__table__border}>
                    {booking.guestName}
                  </td>
                  <td className={classes.main__table__border}>
                    {booking.roomId}
                  </td>
                  <td className={classes.main__table__border}>
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                  <td className={classes.main__table__border}>
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </TemplaDefault>
  )
}

Home.requireAuth = true

export default Home