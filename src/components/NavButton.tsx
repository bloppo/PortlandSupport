
import {useNavigate} from "react-router-dom";

import {Button} from "@mui/material";

export default function NavButton({title,link,className}:{title:string,link:string,className?:string}){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    }

    return (
        <Button variant='contained' disabled = {link === ''} className={className} onClick = {handleClick} sx={{textTransform:'capitalize'}}>
            {title}
        </Button>
    )
}