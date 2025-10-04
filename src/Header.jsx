import './Header.css'

function Header(props){
    return(
        <>
            <div id="Header">
                {props.children}
            </div>
        </>
    );
}

export default Header;