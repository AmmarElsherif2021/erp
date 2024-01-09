import './SaveBillPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import { useState,useEffect } from 'react';
const SaveBillPop = (props) => {
    const billTotal = props.items.reduce((acc, obj) => acc + obj.total, 0);
    const { cancelSaveBillPop, confirmSaveBill } = props;
    const [debt, setDebt] = useState(billTotal);
    const [paid, setPaid] = useState(0);
    
  
    useEffect(() => console.log(`debt ${debt}`), [debt]);
    useEffect(() => console.log(`paid ${paid}`), [paid]);
   
    useEffect(() => setDebt(()=>billTotal-paid), [paid,debt]);
  
    //handle input change:
    const handlePaid = (e) => {
      e.preventDefault();
      setPaid(e.target.value);
      billTotal >= paid && setDebt(billTotal - paid);
    };
  
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
              <input
                type="number"
                min={0}
                max={billTotal}
                value={paid}
                onChange={(e) => handlePaid(e)}
              />
            </tr>
            <tr>
              <td>Debt</td>
              <td>{debt}</td>
            </tr>
          </table>
  
          <div className="btns-section">
            <button
              className="confirm-save-bill-pop"
              onClick={(e) => confirmSaveBill(e)}
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