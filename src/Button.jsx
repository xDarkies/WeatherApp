

function Button(props){
   return(
    <button
        style={{
            backgroundColor: props.backgroundColor,
            color: props.color,
            paddingLeft: props.paddingWidth,
            paddingRight: props.paddingWidth,
            paddingTop: props.paddingHeight,
            paddingBottom: props.paddingHeight 
        }}
        
        onClick={props.onClick}
    >
        {props.children}
    </button>
   );
}

export default Button;