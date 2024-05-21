import { useEffect, useState } from "react"

import TemplateDefault from "../templates/Default"
import useStyles from "../styles/indexStyles"
import { baseURL } from "@/utils/axiosBaseUrl"
import { useSession } from "next-auth/react"

const Home = () => {
  const { classes } = useStyles()
  const [bookings, setBookings] = useState([])
  const { data: session } = useSession()

  const api = baseURL()

  useEffect(() => {
    if(session) {
      const cachedBookings = localStorage.getItem("bookings")
      if (cachedBookings) {
        setBookings(JSON.parse(cachedBookings))
      } else {
        api.get("/bookings")
          .then(response => {
            setBookings(response.data.bookings)
            localStorage.setItem("bookings", JSON.stringify(response.data.bookings))
          })
          .catch(error => console.log("Error na listagem:", error))
      }
    }
  }, [session])

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