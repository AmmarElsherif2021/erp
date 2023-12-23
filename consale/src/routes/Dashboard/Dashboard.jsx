
/* Dashboard is ought to be a control panel of creating accounts for workers and managing authorities of each account:
-For each account: last closed,operations by day :[each operation is tangeled to bills excuted records (BID)].
-Each Account Card:
        -Wid: Worker id
        -w_name: worker name
        -short:short per shift
        -lastClosed:last closed
        -theme:random color for decoration


-For further development:Sales cummulative chart.
   
*/
import { Outlet } from "react-router-dom";
import './dashboard.css';

import AccCard from "../../layout/cards/AccCard/AccCard";

const Dashboard =()=>{
    return(
        <div className="route-content dashboard">
        <div>
        <h1>accounts</h1>
        <AccCard w_name={'Ammar'} short={10} lasClosed={'12:0'} />
        </div>
        </div>
    )
}
export default Dashboard