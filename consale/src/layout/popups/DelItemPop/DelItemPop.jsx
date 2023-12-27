import './DelItemPop.css';
import cancelIcon from '../../../assets/cancel.svg';
const DelItemPop=(props)=>{
    const {cancelDelItemPop,confirmDelItem}=props;
    return(
        <div className='del-item-pop'>
            <button className='cancel-del-item-pop'  onClick={cancelDelItemPop}><img className='cancel-icon' src={cancelIcon}/></button>
            <div className='card-body'>
            <h3> Are you sure you want to delete {props.name} of id: {props.id} ? </h3>
            <div className='btns-section'>
            <button className='del-item-btn confirm' 
            style={{backgroundColor: "#00994d"}} 
            onClick={(e)=>confirmDelItem(e,props.id)}>confirm</button>
            <button className='del-item-btn cancel' 
            style={{backgroundColor: "#ff5c33"}}
            onClick={cancelDelItemPop}>cancel</button>
            </div>
            </div>
        </div>
    )
}
export default DelItemPop;