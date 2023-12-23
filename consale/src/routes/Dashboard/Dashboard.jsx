
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

import './dashboard.css';
import axios from 'axios'
import AccCard from "../../layout/cards/AccCard/AccCard";
import { useEffect, useState } from "react";

const Dashboard =()=>{
    const [accounts,setAccounts]=useState([])
      //fetch accounts
   
    const fetchAccounts = async () => {
        try {
          const response = await fetch("consale/src/data/accounts.json");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setAccounts(data);
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(()=>{fetchAccounts()},[]);
    return(
        <div className="route-content dashboard">
        <div>
        <h1>Accounts</h1>
        {accounts? accounts.map((account) => (
            <AccCard 
              w_name={account.w_name} 
              short={account.short} 
              lastClosed={account.lastClosed} 
              style={{backgroundColor: account.theme}}
            />
          )) : <div></div>}
          
        </div>
        </div>
    )
}
export default Dashboard