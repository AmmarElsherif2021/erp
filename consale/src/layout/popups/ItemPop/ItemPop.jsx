import './ItemPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import AnonPic from "../../../assets/product.svg";
import { useEffect, useState } from 'react';

const ItemPop = (props) => {
    const { cancelItemPop, handleItemEdit } = props;
    const [qty, setQty] = useState(Number(props.qtyStock));
    useEffect(() => console.log('editing item price'), [qty]);
    const handleQty = (e) => {
        setQty(e.target.value);
    }

    const [price, setPrice] = useState(Number(props.priceUnit));
    useEffect(() => console.log('editing unit price'), [price]);
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    return (
        <div className='item-pop'>
            <button className='cancel-item-pop' onClick={cancelItemPop}><img className='cancel-icon' src={cancelIcon} /></button>
            <div className='item-pop-header'>
                <img className='item-pop-img' src={props.img ? props.img : AnonPic} />
                <div className='item-info'>
                    <h1>{props.name}</h1>
                    <h5>{props.discription}</h5>
                </div>
            </div>

            <div className='item-pop-p'>
                <h4>ID: <span>{props.id}</span>
                    <br /> {`price/${props.unit}`}: last recorded <span>{props.priceUnit}</span><input type="number" value={price} onChange={handlePrice} />
                    <br /> Available: last recorded <span>{props.qtyStock}</span> <input type="number" value={qty} onChange={handleQty} />
                </h4>
                <div>
                    <button onClick={() => handleItemEdit(props.id, qty, price)} style={{ backgroundColor: "#00994d" }} className='item-pop-btn'>save</button>
                </div>
            </div>
        </div>
    )
}
export default ItemPop;