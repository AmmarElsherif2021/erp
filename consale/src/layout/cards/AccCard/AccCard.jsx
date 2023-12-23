/*
-For each account: last closed,operations by day :[each operation is tangeled to bills excuted records (BID)].
-Each Account Card:
        -Wid: Worker id
        -w_name: worker name
        -short:short per shift
        -lastClosed:last closed
        -theme:random color for decoration
*/
import './AccCard.css';

import AnonPic from "../../../assets/anon.svg"
const AccCard=(props)=>{
    return(
    <div className='acc-card'>
    <div className='card-img'>
        <img className='card-img' src={AnonPic}/>
    </div>
    <div className='card-p'>
    <h3>{props.w_name}</h3>
    <p>{props.short}</p> <small>{props.lastClosed}</small>
    </div>
        </div>
    )
}
export default AccCard;