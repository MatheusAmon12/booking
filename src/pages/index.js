import { useEffect, useState } from "react"
import axios from "axios"

import TemplateDefault from "../templates/Default"
import useStyles from "../styles/indexStyles"

const Home = () => {
  const { classes } = useStyles()
  const [bookings, setBookings] = useState([])

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
    <TemplateDefault title={"Lista de reservas"}>
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
    </TemplateDefault>
  )
}

Home.requireAuth = true

export default Home