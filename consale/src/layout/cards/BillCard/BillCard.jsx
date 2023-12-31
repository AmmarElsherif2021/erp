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
import './BillCard.css';

import AnonPic from "../../../assets/anon.svg"
const BillCard=(props)=>{
    return(
    <div className='bill-card'>

        <div className='card-header'>
            <img className='card-img' src={AnonPic}/>
            <h1>{props.w_name}</h1>
        </div>

        <div className='card-p'>
            <h4>B-id: <span>{props.bid}</span> <br/>
             Customer Name: <span>{props.cName}</span>
             Phone: <span>{props.phone}</span>
             Date: <span>{props.date}</span>
             Time: <span>{props.time}</span>
            </h4>
        </div>
        <div>
         <h4>Items</h4>
          <table>
          <thead>
          <tr>
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
                <td>{x.required_quantity}</td>
                <td>{x.units}</td>
                <td>{x.price_unit}</td>
                <td>{x.unit}</td>
                <td>{x.total}</td>
                </tr>))}
        </tbody>
          </table>
        </div>

    </div>
    )
}
export default BillCard;