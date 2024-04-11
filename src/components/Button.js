import { Button } from "@mui/material"

const ButtonComponent = ({fullWidth, color, text, margin}) => {
    return(
        <Button
            fullWidth={fullWidth}
            color={color}
            variant="contained"
            type="submit"
            style={{
                margin: `${margin}`,
            }}
        >
            {text}
        </Button>
    )
}

export default ButtonComponent