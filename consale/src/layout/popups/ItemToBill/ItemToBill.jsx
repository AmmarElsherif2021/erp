import './ItemToBill.css';
import AnonPic from "../../../assets/product.svg"
import cancelIcon from '../../../assets/cancel.svg'
import addPlus from '../../../assets/add-plus.svg'
import { useState, useEffect } from 'react';
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
    const { cancelItemToBill, handleItemsListPush, handleReqQty } = props;
    const [reqQty, setReqQty] = useState(0);
    useEffect(() => console.log, [reqQty]);
    function handleChange(e) {
        e.preventDefault();
        setReqQty(e.target.value)
        handleReqQty(e.target.value);
    }

    return (
        <div className='item-bill-pop'>
            <button className='cancel-item-bill-pop' onClick={cancelItemToBill}><img className='cancel-icon' src={cancelIcon} /></button>
            <div className='item-bill-pop-header'>
                <img className='item-bill-pop-img' src={AnonPic} />

                <h4 style={{ marginLeft: "5px", paddingLeft: "5px" }}>
                    Name: <span>{props.name}</span> <br />
                    Unit: <span>{props.unit}</span> <br />
                    Price/Unit: <span>{props.priceUnit}</span> <br />
                    Available <span>{props.stockQty}</span><br />

                </h4>
            </div>

            <div className='item-bill-pop-p'>

                <h4 style={{ marginLeft: "5px", paddingLeft: "5px" }}>
                    Required Quantity: <span><input style={{ width: "70px" }} min="0" max={props.stockQty} type="number" id="reqQty" value={reqQty} onChange={(e) => handleChange(e)} /></span> <br />
                    Total: <span>{Number(reqQty) * Number(props.priceUnit)}</span> <br />
                </h4>
                <div ><button className='add-item-bill-btn' onClick={(e) => handleItemsListPush(e, props.id)}><img src={addPlus} className='add-plus' /></button></div>
            </div>
        </div >
    )
}
export default ItemToBill