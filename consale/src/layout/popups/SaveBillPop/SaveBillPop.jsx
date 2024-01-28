import './SaveBillPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import { useState, useEffect } from 'react';
import { BillProvider, useBill } from '../../../billContext';
import { ProgressBar } from 'react-bootstrap';
import { Table } from '@material-ui/core';
const getDate = () => {
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
  const [saved, setSaved] = useState(false);



  const [paid, setPaid] = useState(0);
  const [debt, setDebt] = useState(0);
  //useEffect(()=>setPaid(props.paid),[]);

  useEffect(() => setDebt(billTotal - paid - props.paid), [paid]);
  const handlePaid = (e) => {
    setPaid(e.target.value);


  };
  //useEffect(()=>console.log(newBill.paid),[paid,newBill])

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log('payments updates sent from pop ');
    //console.log(`paid: ${paid}, debt: ${debt}`);
    //updatePayments(paid,debt);
    confirmSaveBill(props.bid, billTotal, paid, debt, props.items);
  }

  return (

    <div className="save-bill-pop">
      <button className="cancel-save-bill-pop" onClick={cancelSaveBillPop}>
        <img className='cancel-icon' src={cancelIcon} />
      </button>
      <h3>

        Are you sure you want to add {props.cName} of Bid: {props.bid} ?{" "}
      </h3>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div className="current-space">

          <table>
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
              <td style={{ backgroundColor: "#b5584d" }}>{billTotal}</td>
            </tr>

          </table>

        </div>
        <div className="records-space">
          <h4>Operations history</h4>


          {props.records && props.records.length ?
            props.records.map((y) =>
            (y && y.date &&
              <div className="records">
                <table style={{ overflowY: "auto", alignItems: "center" }}>
                  <tr><h5>Added items</h5></tr>
                  {y && y.added_items && y.added_items.length ? <tr><th>name</th><th>qty</th><th>total</th></tr> : ` `}
                  {y && y.added_items && y.added_items.length ? y.added_items.map((z) => z.ibid && <tr><td>{z.name}</td><td>{z.req_qty}</td><td>{z.total}</td></tr>) : `----------`}
                  <tr><h5>Restored items</h5></tr>
                  {y && y.restored_items && y.restored_items.length ? <tr><th>name</th><th>qty</th><th>total</th></tr> : <tr></tr>}
                  {y && y.restored_items && y.restored_items.length ? y.restored_items.map((z) => z.ibid && <tr><td>{z.name}</td><td>{z.req_qty}</td><td>{z.total}</td></tr>) : `----------`}
                </table>

                <table>
                  <tr>

                  </tr>
                  <tr >
                    <th>History of op.</th><td>{y.date}</td>
                  </tr>
                  <tr><th>Debt</th><td>{y.debt}</td></tr>
                  <tr><th>Paid</th><td>{y.paid}</td></tr>
                  <tr><th>Total</th><td>{y.b_total}</td></tr>
                </table>

              </div>
            )) : <div>No old operations recorded</div>}
        </div>
      </div>
      <div>



        <div className="btns-section">


          <h4>Paid</h4>

          <span><input
            type="number"
            min={0}
            max={debt}
            value={paid}
            onChange={(e) => handlePaid(e)}
            style={{ height: "15px", border: "solid" }}
          /></span>
          <tr>
            <th>Total</th>
            <td>{billTotal}</td>
          </tr>
          <tr>
            <th>last paid </th><td> {props.paid}</td>
          </tr>
          <tr>
            <th>Debt</th>
            <td>{debt}</td>
          </tr>

          <button
            className="confirm-save"

            onClick={(e) => handleSaveClick(e)
            }
          >
            Confirm
          </button>

          <button
            className="cancel-save"


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