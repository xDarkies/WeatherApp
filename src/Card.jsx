import './Card.css'

export default function Card(props){
    
    return(
        <>
            <div id="Card" style={{height:props.height,width:props.width}}>
                <h2>{props.children}</h2>
                <p>{props.value}</p>
            </div>   
        </>
    )

}