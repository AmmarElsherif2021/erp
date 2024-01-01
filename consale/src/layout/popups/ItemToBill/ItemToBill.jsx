import './ItemToBill.css';
import AnonPic from "../../../assets/anon.svg"
import cancelIcon from '../../../assets/cancel.svg'

/*
Item attributes in the bill items list:
-ibid
-name
-req_qty
-unit
-price_unit
-total
*/
const ItemToBill = (props) => {
    const { cancelItemToBill } = props;

    return(
        <div className='item-bill-pop'>
            <button className='cancel-item-bill-pop' onClick={cancelItemToBill}><img className='cancel-icon' src={cancelIcon}/></button>
            <div className='pop-header'>
            <img className='pop-img' src={AnonPic}/>
            <h1>Add new Item to Bill</h1>
        </div>

        <div className='pop-p'>
            <h4>
             name: <span>{props.name}</span> <br/>
             unit: <span>{props.unit}</span> <br/>
             price/unit: <span>{props.priceUnit}</span> <br/>
             units required: <span>{props.reqQty}</span> <br/>
             Total: <span>{props.total}</span> <br/>
            </h4>
        </div>
        </div>
    )
}
export default ItemToBill