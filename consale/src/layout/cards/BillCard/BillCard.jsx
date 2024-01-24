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

import AnonPic from "../../../assets/bill-icon.svg"
const BillCard = (props) => {
    return (
        <div className='bill-card'>

            <div className='card-header'>
                <img className='card-img' src={AnonPic} />
                <h1>{props.cName}{' '}<small>BID: {props.bid}</small></h1>

            </div>



            <div className='card-p'>
                <h2>
                    <span>{props.date}</span>
                </h2>
            </div>
            <div className='card-p'>
                <h2>
                    <span>Total: {props.bTotal}</span>
                </h2>
                <h2>
                    <span>Debt: {props.debt}</span>
                </h2>
                <h2>
                    <span>Paid: {props.paid}</span>
                </h2>
            </div>




        </div>
    )
}
export default BillCard;