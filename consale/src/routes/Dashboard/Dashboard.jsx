
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

import './Dashboard.css';
import axios from 'axios'
import AccCard from "../../layout/cards/AccCard/AccCard";
import { useEffect, useState } from "react";
import data from './data/accounts.json';
import AddBtn from '../../layout/AddBtn/AddBtn';
const Dashboard = () => {
  

//accounts state carries accounts.json records
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        setAccounts([...data])
    }, []);
    useEffect(() => {console.log(`-------- >  ${accounts} <-----------`)
    }, [accounts]);

  //add account ------------------------------------------------------

    //generate Id
    function generateRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
  const addAcc=(name,password,confirmPassword)=>{
    setAccounts((prev)=>[...prev,
        {
            wid:generateRandomId(),
            w_name:name,
            password:password,
            
//To be continued..
// write on json file
//continue addBtn

        }
    ])
  }

  return (
      <div className="route-content dashboard">
      <h1>Accounts</h1>
          <div className="accounts">
              
              {Array.isArray(accounts)  ? accounts.map((account) => (
                  <AccCard 
                      key={account.wid}
                      w_name={account.w_name} 
                      short={account.short} 
                      lastClosed={account.last_closed} 
                      style={{backgroundColor: account.theme}}
                  />
              )) : <div>No accounts found</div>}
              <div><AddBtn/></div>
          </div>

          <div></div>
      </div>
  )
}
export default Dashboard;
