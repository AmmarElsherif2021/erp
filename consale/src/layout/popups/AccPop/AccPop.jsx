import './AccPop.css';
import cancelIcon from '../../../assets/cancel.svg'
const AccPop=({cancelAccPop})=>{
    return(
        <div className='acc-pop'>
            <button className='cancel-acc-pop' onClick={()=>cancelAccPop()}><img className='cancel-icon' src={cancelIcon}/></button>
            <h1> Add account </h1>
        </div>
    )
}
export default AccPop