import './SaveBillPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import { useState,useEffect } from 'react';
import { BillProvider, useBill } from '../../../billContext';
import { ProgressBar } from 'react-bootstrap';
const getDate=()=>{
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}



const SaveBillPop = (props) => {
  //const {newBill,setNewBill}=useBill();
    const billTotal = props.items.reduce((acc, obj) => acc + obj.total, 0);
    const { cancelSaveBillPop, confirmSaveBill } = props;

 
        const [paid, setPaid] = useState(0);
        const [debt, setDebt] = useState(0);
        //useEffect(()=>setPaid(props.paid),[]);
        
        useEffect(()=>setDebt(billTotal-paid-props.paid),[paid]);
        const handlePaid = (e) => {
        setPaid(e.target.value);
         
        
    };
    //useEffect(()=>console.log(newBill.paid),[paid,newBill])
    
    const handleSaveClick=(e)=>
    {     e.preventDefault();
          console.log('payments updates sent from pop ');
          //console.log(`paid: ${paid}, debt: ${debt}`);
          //updatePayments(paid,debt);
          confirmSaveBill(props.bid,billTotal,paid,debt,props.items);
      }
    
    return (
 
      <div className="save-bill-pop">
      <button className="cancel-save-bill-pop" onClick={cancelSaveBillPop}>
        <img className="cancel-icon" src={cancelIcon} />
      </button>
      <div>
        <h3>
       
          Are you sure you want to add {props.cName} of Bid: {props.bid} ?{" "}
        </h3>
        <table style={{ overflowY: "auto", border: "solid 2px" }}>
          <tr>
            <td>
              <h4>Name</h4>
            </td>
            <td>
              <h4>Required Quantity</h4>
            </td>
            <td>
              <h4>Unit</h4>
            </td>
            <td>
              <h4>Price/Unit</h4>
            </td>
            <td>
              <h4>Total</h4>
            </td>
          </tr>
          {props.items.map((x) => (
            <tr>
              <td>{x.name}</td>
              <td>{x.req_qty}</td>
              <td>{x.unit}</td>
              <td>${x.price_unit}</td>
              <td>${x.total}</td>
            </tr>
          ))}

          <tr>
            <td>Bill Total</td>
            <td>{billTotal}</td>
          </tr>
          <tr>
            <td>Paid</td>
           
          </tr>
          <p>last paid : {props.paid}</p>
          <input
          type="number"
          min={0}
          max={debt}
          value={paid}
          onChange={(e) => handlePaid(e)}
        /> 
          <tr>
            <td>Debt</td>
            <td>{debt}</td>
          </tr>
        </table>
          <h4>Bill operations history JSON-------- -----
        <br/>--bid: {props.bid}----------total: {billTotal}------------------paid:{paid}-----------debt: {debt} </h4>
        
        
         {props.records&&props.records.length&&props.records.map((y)=>(y&&y.date&&
        <table style={{ overflowY: "auto", border: "solid 2px" , alignItems:"center" }}>
        <tr>
          <th>History of op.</th><th>Debt</th><th>Paid</th>
        </tr>
        <tr>
          <td>{y.date}</td><td>{y.debt}</td><td>{y.paid}</td>
        </tr>
        <tr>Added items</tr>
        
        {y&&y.added_items&&y.added_items.length?<tr><th>name</th><th>qty</th><th>total</th></tr>:` `}
        {y&&y.added_items&&y.added_items.length?y.added_items.map((z)=>z.ibid&&<tr><td>{z.name}</td><td>{z.req_qty}</td><td>{z.total}</td></tr>):`----------`}
        <tr>Restored items</tr>
        {y&&y.restord_items&&y.restord_items.length&&<tr><th>name</th><th>qty</th><th>total</th></tr>}
        {y&&y.restord_items&&y.restord_items.length?y.restored_items.map((z)=>z.ibid&&<tr><td>{z.name}</td><td>{z.req_qty}</td><td>{z.total}</td></tr>):`----------`}
        </table>
         ))}
        

        <div className="btns-section">
          <button
            className="confirm-save-bill-pop"
            onClick={(e) =>  handleSaveClick(e)
            }
          >
            Confirm
          </button>
          <button
            className="cancel-save-bill-pop"
            onClick={() => cancelSaveBillPop()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
            
    );
  };
  export default SaveBillPop