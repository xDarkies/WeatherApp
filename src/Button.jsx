

function Button(props){
   return(
    <button
        style={{
            backgroundColor: props.backgroundColor,
            color: props.color,
            paddingLeft: props.paddingWidth,
            paddingRight: props.paddingWidth,
            paddingTop: props.paddingHeight,
            paddingBottom: props.paddingHeight,
            height: props.height,
            width: props.width,
            background: props.background,
            border: props.border,
            borderRadius: props.borderRadius,
        }}
        
        onClick={props.onClick}
    >
        {props.children}
    </button>
   );
}

export default Button;