import './printPop.css';
import cancelIcon from '../../../assets/cancel.svg';
import AnonPic from '../../../assets/print.svg';

const PrintPop = (props) => {
    const { handleCancelPrint, handlePrint } = props;
    return (
        <div className='print-pop'>
            <button className='cancel-print-pop' onClick={handleCancelPrint}><img className='cancel-icon' src={cancelIcon} /></button>
            <div className='print-card-header'>
                <img className='print-pop-img' src={AnonPic} />
                <div className='print-info'>
                    <h4>Are you sure that you want to print bill: </h4>

                    <div className="print-table">
                        <table>
                            <tr><th>Bid</th>  <th>Date</th><th>Customer Name</th> <th>Phone</th></tr>
                            <tr><td>{props.bid}</td> <td>{props.date}</td><td>{props.cName}</td>  <td>{props.cPhone}</td></tr>


                            <tr><th>Paid</th> <th>Debt</th></tr>
                            <tr><td>{props.paid}</td> <td>{props.debt}</td></tr>
                        </table>
                    </div>
                </div>
            </div>

            <div className='print-table'>

                <div><button className='confirm-print-btn' onClick={handlePrint}>Print</button></div>
            </div>

        </div>
    )
}
export default PrintPop;