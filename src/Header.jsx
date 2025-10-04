import './Header.css'
import Button from './Button'
import mic from './assets/microphone.png'

function Header(props){
    return(
        <>
            <div id="Header">
                <span style={{fontSize:"45px"}}>{props.children}</span>
                <div style={{display:'flex'}}>
                <p style={{marginTop:"5px",marginRight:"10px"}}>Turn on transcription</p> 
                <Button height="30px" width="30px" background="none" borderRadius="5px">
                    <img src={mic} width={"25px"} height={"25px"}></img>
                </Button>
                </div>
            </div>

        </>
    );
}

export default Header;