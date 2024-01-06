/* Bill atts:
    - Bid
 	- c_name (optional)
  	- c_phone
   	- b_total
	- discount
 	- items
  	- date
   	- time
*/ 
import './BillPop.css';

import AnonPic from "../../../assets/anon.svg";
import cancelIcon from '../../../assets/cancel.svg';

const BillPop=(props)=>{
    const {cancelBillPop,openBill}=props;
    return(
    <div className='oldbill-pop'>
    <button className='cancel-bill-pop' onClick={cancelBillPop}><img className='cancel-icon' src={cancelIcon}/></button>

        <div className='pop-header'>
            <img className='pop-img' src={AnonPic}/>
            <h1>old bill</h1>
        </div>

        <div className='pop-p'>
            <h4>B-id: <span>{props.bid}</span> <br/>
             Customer Name: <span>{props.cName}</span>
             Phone: <span>{props.phone}</span>
             Date: <span>{props.date}</span>
             Time: <span>{props.time}</span>
            </h4>
        </div>
        <div>
      
          <table>
          <thead >
          <tr >
            <th>Name</th>
            <th>Required Quantity</th>
            <th>Units</th>
            <th>Price/Unit</th>
            <th>Unit</th>
            <th>Total</th>
          
            
          </tr>
        </thead>
        <tbody>
            {props.items.map(
                (x)=>(<tr>
                <td>{x.name}</td>
                <td>{x.req_qty}</td>
                <td>{x.unit}</td>
                <td>{x.price_unit}</td>
                <td>{x.total}</td>
               
                </tr>))}
            <tr>  
            <td>Total: {props.total}</td>
            <td>Debt: {props.debt}</td>
            <td></td>
            <td></td>
            <td><button className='open-bill-btn' onClick={openBill}>Open Bill</button></td>
            </tr>
        </tbody>
          </table>
        </div>

    </div>
    )
}
export default BillPop;