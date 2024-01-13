import './SaveBillPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import { useState,useEffect } from 'react';
import { BillProvider, useBill } from '../../../routes/AddBill/billContext';
const SaveBillPop = (props) => {
  const {newBill,setNewBill}=useBill();
    const billTotal = props.items.reduce((acc, obj) => acc + obj.total, 0);
    const {updatePayments, cancelSaveBillPop, confirmSaveBill } = props;
    const [debt, setDebt] = useState(billTotal);
    const [paid, setPaid] = useState(0);
    
    useEffect(()=>{
      newBill.items.reduce((acc,curr)=>acc+curr.total,0)
      setNewBill((prev)=>({...prev,b_total:billTotal}))},[])
    const handlePaid = (e) => {

      setPaid(e.target.value);
    };
    const updateDebt = () => {
      setDebt(()=>newBill.b_total - paid);
      setNewBill((prev) => ({
        ...prev,
        debt: debt,
        paid:paid
      }));
    };

    useEffect(() => {
      
      updateDebt();

    }, [paid]);
    
    const handleSaveClick=(e)=>
      {
          console.log('payments updates sent from pop ');
          console.log(`paid: ${paid}, debt: ${debt}`);
          updatePayments(paid,debt);
          confirmSaveBill(e);
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
            <td>{newBill.b_total}</td>
          </tr>
          <tr>
            <td>Paid</td>
            <input
              type="number"
              min={0}
              max={newBill.b_total}
              value={paid}
              onChange={(e) => handlePaid(e)}
            />
          </tr>
          <tr>
            <td>Debt</td>
            <td>{debt}</td>
          </tr>
        </table>
        <h4>Bill operations history --{JSON.stringify(newBill)}------total: {newBill.b_total}------------------debt:{newBill.debt}-----------paid: {newBill.paid} </h4>
        
         {props.records&&props.records.map((y)=>(y&&
        <table style={{ overflowY: "auto", border: "solid 2px" , alignItems:"center" }}>
        <tr>
          <th>History of op.</th><th>Debt</th><th>Paid</th>
        </tr>
        <tr>
          <td>{y.date}</td><td>{y.debt}</td><td>{y.paid}</td>
        </tr>
        <tr>Added items</tr>
        
        <tr><th>name</th><th>qty</th><th>total</th></tr>
        {y.added_items.map((z)=>z.ibid&&<tr><td>{z.name}</td><td>{z.req_qty}</td><td>{z.total}</td></tr>)}
        <tr>Restored items</tr>
        <tr><th>name</th><th>qty</th><th>total</th></tr>
        {y&&y.restored_items.map((z)=>z.ibid&&<tr><td>{z.name}</td><td>{z.req_qty}</td><td>{z.total}</td></tr>)}
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