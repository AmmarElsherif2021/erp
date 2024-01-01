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

import AnonPic from "../../../assets/anon.svg"
const BillPop=(props)=>{
    return(
    <div className='bill-pop'>

        <div className='pop-header'>
            <img className='pop-img' src={AnonPic}/>
            <h1>New Bill</h1>
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
                <td>{x.req_qty}</td>
                <td>{x.unit}</td>
                <td>{x.price_unit}</td>
                <td>{x.total}</td>
               
                </tr>))}
            <tr>Total: {props.total} <s/> Debt: {props.debt}</tr>
        </tbody>
          </table>
        </div>

    </div>
    )
}
export default BillPop;