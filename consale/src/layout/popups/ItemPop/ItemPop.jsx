import './ItemPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import AnonPic from "../../../assets/product.svg";

const ItemPop=(props)=>{
    const {cancelItemPop}=props;
    return(
        <div className='item-pop'>
            <button className='cancel-item-pop' onClick={cancelItemPop}><img className='cancel-icon' src={cancelIcon}/></button>
            <div className='card-header'>
            <img className='card-img' src={props.img?props.img:AnonPic}/>
            <h1>{props.name}</h1>
        </div>

        <div className='card-p'>
            <h4>ID: <span>{props.id}</span> 
            <br/> {`price/${props.unit}`}: <span>{props.priceUnit}</span> 
            <br/> Available: <span>{props.available}</span>  
            </h4>
        </div>
        </div>
    )
}
export default ItemPop;