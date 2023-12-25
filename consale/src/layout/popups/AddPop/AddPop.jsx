import './AddPop.css';
import cancelIcon from '../../../assets/cancel.svg'
const AddPop=({cancelAddPop})=>{
    return(
        <div className='add-pop'>
            <button className='cancel-add-pop' onClick={()=>cancelAddPop()}><img className='cancel-icon' src={cancelIcon}/></button>
            <h1> Add account </h1>
        </div>
    )
}
export default AddPop