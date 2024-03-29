import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => {
    return{
        box: {
            display: "none",
            [theme.breakpoints.down("sm")]: {
                display: "block"
            }
        },
        appBar: {
            padding: "15px 0"
        },
        toolBar: {
            display: "flex",
            justifyContent: "space-between",
        }
    }
})

const TopBar = ({ onClickMenu }) => {
    const { classes } = useStyles()

    return (
        <Box sx={{ flexGrow: 1 }} className={classes.box}>
            <AppBar position="fixed" color='secondary' className={classes.appBar}>
                <Toolbar variant="dense" className={classes.toolBar}>
                    <Typography variant="h2" color="inherit" component="div">
                        Dreamscape
                    </Typography>
                    <IconButton 
                        edge="end" 
                        color="inherit" 
                        aria-label="menu" 
                        sx={{ mr: 2 }}
                        onClick={onClickMenu}
                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopBar