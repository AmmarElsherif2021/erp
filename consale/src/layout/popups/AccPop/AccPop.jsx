import './AccPop.css';
import AnonPic from "../../../assets/anon.svg"
import cancelIcon from '../../../assets/cancel.svg'
const AccPop = (props) => {
    const { cancelAccPop } = props;

    return(
        <div className='acc-pop'>
            <button className='cancel-acc-pop' onClick={cancelAccPop}><img className='cancel-icon' src={cancelIcon}/></button>
            <div className='card-header'>
            <img className='card-img' src={AnonPic}/>
            <h1>{props.w_name}</h1>
        </div>

        <div className='card-p'>
            <h4>Short: <span>{props.short}</span> <br/> Last closed: <span>{props.lastClosed}</span> </h4>
        </div>
        </div>
    )
}
export default AccPop