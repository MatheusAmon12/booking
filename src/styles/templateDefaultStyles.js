import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => {
    return{
      sidebar: {
          position: "fixed",
          top: "0",
          left: "0",
          padding: "16px 0 80px 64px",
          height: "100vh",
          width: "350px",
          backgroundColor: theme.palette.secondary.main,
          zIndex: 2
      },
      sidebarHidden: {
          [theme.breakpoints.down("sm")]: {
              left: "-100vw",
              transition: "ease-out 300ms"
          }
      },
      sidebarShow: {
          [theme.breakpoints.down("sm")]: {
              left: "0",
              transition: "ease-in 300ms"
          }
      },
      sidebar__actions: {
          display: "flex",
          gap: "24px",
      },
      sidebar__logout: {
          position: "fixed",
          bottom: "80px",
  
          display: "flex",
          alignItems: "center",
          gap: "24px"
      },
      sidebar__containerGrid: {
          display: "flex",
          flexDirection: "column"
      },
      main: {
          marginLeft: "350px",
          padding: "160px 24px",
  
          [theme.breakpoints.down("sm")]: {
              margin: "0",
              padding: "160px 8px 160px 8px",
          }
      },
      link__decoration: {
          textDecoration: "none"
      },
    }
  })

  export default useStyles