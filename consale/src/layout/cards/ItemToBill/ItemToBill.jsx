import './ItemToBill.css';
import AnonPic from "../../../assets/anon.svg"
import cancelIcon from '../../../assets/cancel.svg'
const ItemToBill = (props) => {
    const { cancelItemToBill } = props;

    return(
        <div className='item-bill-pop'>
            <button className='cancel-item-bill-pop' onClick={cancelItemToBill}><img className='cancel-icon' src={cancelIcon}/></button>
            <div className='card-header'>
            <img className='card-img' src={AnonPic}/>
            <h1>{props.w_name}</h1>
        </div>

        <div className='card-p'>
            <h4>
             name: <span>{props.name}</span> <br/>
             unit: <span>{props.unit}</span> <br/>
             price/unit: <span>{props.priceUnit}</span> <br/>
             units required: <span>{props.requiredUnits}</span> <br/>
             Total: <span>{props.total}</span> <br/>
            </h4>
        </div>
        </div>
    )
}
export default ItemToBill