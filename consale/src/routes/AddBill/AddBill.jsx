import { v4 as uuidv4 } from 'uuid';
import stock from './data/stock.json';
import billsData from './data/oldBills.json'
import './AddBill.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import cancelIcon from '../../assets/cancel.svg';
import sortIcon from '../../assets/sort.svg';
import { useBill,BillContext,BillProvider } from '../../billContext';
import { useEffect, useState,useMemo } from 'react';
import ItemToBill from '../../layout/popups/ItemToBill/ItemToBill';
import BillCard from '../../layout/cards/BillCard/BillCard';
import BillPop from '../../layout/popups/BillPop/BillPop';
import addPlus from '../../assets/add-plus.svg';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ControllableStates from './ControllableStates'
import DataTable from 'react-data-table-component';
import FilterComponent from '../../layout/FilterComponent/FilterComponent';
import SaveBillPop from '../../layout/popups/SaveBillPop/SaveBillPop';
const getDate=()=>{
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

  
const AddBill=()=>{

useEffect(()=>console.log(stockData),[])
// Create new actual bill
const {newBill,setNewBill}=useBill();
useEffect(() => {
  !newBill.bid && setNewBill((prevBill) => ({
    ...prevBill,
    bid:`b-${Math.random().toString(36).substring(2, 7).slice(0, 5)}`,
    date: getDate(),
  }));
}, []);

/*const [newBill, setNewBill] = useState({
  bid: `b-${Math.random().toString(36).substring(2, 7).slice(0, 5)}`,
  c_name: "",
  c_phone: "",
  b_total: 0,
  discount: 0,
  items: [],
  paid:0,
  debt: 0,
  date: getDate(),
  records: [
    {
      date: getDate(),
      paid: 0,
      debt: 0,
      added_items: [],
      restored_items: [],
    },
  ],
});
*/
useEffect(()=>console.log('newBill changed'),[newBill])
//Left section >> Create bill section ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||---|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||---|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||---------------------------------------------||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||---|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||---|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
   //stock state
    const [stockData,setStockData]=useState([...stock]);
    useEffect(()=>console.log(`stock retrieved ${[...stockData]}`),[])
   //state of new added item object
    const [newAdded,setNewAdded]=useState({});
    //assure newAdded 
    useEffect(()=>console.log('newAdded activated'),[newAdded])
    //added items list to bill
    const [addedItems,setAddedItems]=useState([]);
    // assure addedItems on 1st render
    useEffect(()=>console.log('added items list ready to be filled||||||||||||||||||||||||||||||||')
    ,[addedItems])

   //add new item to bill  
    const handleNewItemPop = (e, id) => {
      e.preventDefault();
      //const itemsArr=stockData.map((x)=>x.JSON.stringify())
      const newItem = stockData.filter((x) => x.id == id)[0];
      setNewAdded({
        ...newItem,
        ibid: uuidv4(),
        req_qty: 0,
        total: newItem.req_qty * newItem.price_unit,
      });
  
      
      console.log(`new added =============================>${JSON.stringify(newItem)}`);
    };
    
    const handleOptionClick = (event, value) => {
      handleNewItemPop(event, value.id);
    };
    const getOptionSelected = (option, value) => {
                    
      return option.id === value.id; // Example comparing only the "id" property
    };



    const handleReqQty=(reqQty)=>{
        setNewAdded((prev)=>({...prev,req_qty:reqQty,total:reqQty*Number(newAdded.price_unit)}))
    }
    const cancelItemToBill =()=>{
      setNewAdded({})
    }
   
    /*
        useEffect
        (()=>newAdded&&newAdded.id?console.log(`new added ${JSON.stringify(newAdded)} `)
        :
        console.log('there is no newAdded'),[newAdded]);
    */

   //add selected newAdded item to bill
   const handleItemsListPush = (e, id) => {
    e.preventDefault();
  
    if (newAdded && newAdded.id === id) {
      setAddedItems((prev) => [...prev, newAdded]); // Add newAdded regardless of addedItems' length

    } else {
      console.log(`did not add ${JSON.stringify(newAdded)} to bill items list`);
    }
  
    setNewAdded({});
  };
 
   useEffect(()=>addedItems&&console.log(`added items to bill `)
   ,[addedItems])

//Right section >> Navigate old bills ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||-----------------------------------------------|||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
   const [bills,setBills]=useState([...billsData]);
   useEffect(()=>{console.log(`bills..> `)},[bills]);
   //handle click on card:
   const [oldBillPop,setOldBillPop]=useState({});

   const handleCardClick=(e,id)=>{
    e.preventDefault()
     const clicked=bills.filter((x)=>x.bid==id)[0];
     setOldBillPop({...clicked})
   };
   const cancelBillPop=()=>{
    setOldBillPop({})
   };
   const openBill=()=>{
     // setAddedItems(()=>[...oldBillPop.items]);
      setNewBill((prev)=>({...prev,
                          bid:oldBillPop.bid,
                          c_name:oldBillPop.c_name,
                          c_phone:oldBillPop.c_phone,
                          date:oldBillPop.date,
                          items:oldBillPop.items,
                          debt:oldBillPop.debt,
                          paid:oldBillPop.paid,
                          records:[...oldBillPop.records
                          ]
                        }))
      setOldBillPop({})
   }
   useEffect(() => {
    console.log('old bill pop triggered');
  }, [oldBillPop]);

  //filter old bills memo:
  //Search |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  useEffect(()=>console.log('filtering'),[filterText]);
  useEffect(()=>console.log('paginating'),[resetPaginationToggle]);

  const filteredItems = bills.filter(
      item => item.c_name && item.c_name.toLowerCase().includes(filterText.toLowerCase()),
  );
  const handleClear = () => {
    if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
        }
    };

    //arrange bills based on debt |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    const [arranged,setArranged]=useState(false);
    useEffect(()=>console.log('arranging?'),[arranged]);
    useEffect(()=>console.log(arranged),[arranged,bills]);
    
    
    const handleArrange=(e)=>{
      e.preventDefault();
      const sortedArr=bills.sort((p1,p2)=>p1.debt<p2.debt?1:p1.debt>p2.debt?-1:0);
      setArranged((prev)=>!prev);
      arranged? setBills([...sortedArr]):setBills([...bills]);
      }
    
  
/*|||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||.......................|||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||.......................|||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
const [confirmSave,setConfirmSave]=useState(false);
const confirmSaveBill = (e,bid,cName,cPhone,date,p,d) => {
        e.preventDefault();
        setNewBill((prev) => ({
          ...prev,
          bid:bid,
          c_name:cName,
          c_phone:cPhone,
          date:date,
          paid:p,
          debt:d,
          records:
            newBill.records["added_items"] && newBill.records["added_items"].length > 1
              ? [
                  ...newBill.records.slice(0, -1),
                  {
                    ...newBill.records[newBill.records.length - 1],
                    date:getDate(),
                    debt:d,
                    paid:p,
                    added_items:newAdded.length&&[...newAdded ],
                    restored_items: []
                  },
                ]
              : [
                  {
                    date: getDate(),
                    paid: newBill.paid,
                    debt: newBill.debt,
                    added_items: newAdded.length&&[...newAdded ],
                    restored_items: []
                  },
                ],
        }));
        
        setBills(()=>bills.filter((x)=>x.bid!=newBill.bid));
        confirmSave && setBills((prev) => [...prev, newBill]); //use api to write on local db;
        //check data is saved correctly in bills
        console.log(`####################### data of new bill: paid ${newBill.paid} - debt ${newBill.debt} - date ${newBill.date}`)
        setAddedItems([]);

        setNewBill(() => ({
          
            bid: `b-${Math.random().toString(36).substring(2, 7).slice(0, 5)}`,
            c_name: "",
            c_phone: "",
            b_total: 0,
            discount: 0,
            items: [],
            paid:0,
            debt: 0,
            date: getDate(),
            records: [
            ],
          
        }));
        
        console.log(`bills 1 ${bills.map((x) => x.bid)}`);
        setConfirmSave(false);

};
 
const cancelSaveBillPop = () => {
  setConfirmSave(false);
};

const updatePayments=(p,d)=>{
  setNewBill((prev)=>({
    ...prev,
    paid:p,
    debt:d
  }))
}



const handleAddBill = (e) => {
  setConfirmSave(true);
  setNewBill((prev)=>({...prev,items:[...newBill.items,...addedItems]}));
  
  
  
};


useEffect(() => console.log(`confirm save ?${confirmSave}`), [confirmSave]);
useEffect(()=>console.log(''),[confirmSave,newBill]);
useEffect(()=> console.log(`bills 1 ${bills.map((x)=>x.bid)}`),[bills]);
  //Final stage of confirm pop that substracts the actual db data|||||||||||||||||||||||||||||||||||||||||;
    return(
      <BillProvider>
        <div className="route-content add-bill">


        {
          newAdded&&newAdded.id?
          <div>
          <ItemToBill 
          name={newAdded.name} 
          unit={newAdded.unit} 
          priceUnit={newAdded.price_unit} 
          stockQty={newAdded.stock_quantity}
          id={newAdded.id}
          total={newAdded.total}
          cancelItemToBill={cancelItemToBill} 
          handleItemsListPush={handleItemsListPush}
          handleReqQty={handleReqQty}
          />
          </div>
          :
          <div></div>
        }


        {
          oldBillPop &&oldBillPop.bid?
          (<BillPop
            bid={oldBillPop.bid}
            cName={oldBillPop.c_name} 
            cPhone={oldBillPop.c_phone}
            bTotal={oldBillPop.b_total}
            discount={oldBillPop.discount}
            items={oldBillPop.items}
            date={oldBillPop.date}
            time={oldBillPop.time}
            paid={oldBillPop.paid}
            debt={oldBillPop.debt}
            cancelBillPop={cancelBillPop}
            openBill={openBill}

            
            />)
          :(<div></div>)
        }
        {confirmSave ? (
          <div style={{ zIndex: 100000 }}>
          <SaveBillPop
          bid={newBill.bid}
          cName={newBill.c_name}
          items={newBill.items}
          confirmSaveBill={confirmSaveBill}
          cancelSaveBillPop={cancelSaveBillPop}
          bTotal={newBill.b_total}
          records={newBill.records}
          debt={newBill.debt}
          paid={newBill.paid}
        />
          </div>
        ) : (
          <div></div>
        )}
           
            <h1>New Bill</h1>
            <div className='add-bill-sections'>
        {/*
         <SaveBillPop
              bid={newBill.bid}
              cName={newBill.c_name}
              items={newBill.items}
              confirmSaveBill={confirmSaveBill}
              cancelSaveBillPop={cancelSaveBillPop}
            />
         |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/}
   
        <div className="new-bill-section left-pane" >
                <div className="section-header">
                    <ControllableStates options={stockData} handleNewItemPop={handleNewItemPop}/>
                </div>

                <div className='bill-data-box'>
                <div style={{display:'flex',flexDirection:'row'}}>
                <h4>name</h4>
                {newBill&&newBill.records&&newBill.records.length>1?<h4>{': '}{newBill.c_name}</h4>:<input
                style={{maxHeight:'30px',margin:'5px',maxWidth:'120px'}}
                type='text' 
                onChange={(e)=>setNewBill((prev)=>({...prev,c_name:e.target.value}))}
                value={oldBillPop&&oldBillPop.bid?oldBillPop.c_name:newBill.c_name}/>}
                </div>

                <div style={{display:'flex',flexDirection:'row'}}>
                <h4>phone</h4>
                <input 
                  type='tel' 
                  value={oldBillPop&&oldBillPop.bid?oldBillPop.phone:newBill.c_phone}
                  onChange={(e)=>setNewBill((prev)=>({...prev,c_phone:e.target.value}))}
                  style={{maxHeight:'30px',margin:'5px',maxWidth:'120px'}}
                  />
                </div>

                <div style={{display:'flex',flexDirection:'row' , alignItems:'center'}}>
                <h4>Bid</h4><p style={{color:'blue', margin:'2px'}}>{oldBillPop&&oldBillPop.bid?oldBillPop.bid:newBill.bid}</p>
                </div>
                {
/*|||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||.......................|||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||.......................|||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
                }
                <button className='save-bill-btn' onClick={(e)=>handleAddBill(e)}><img className='save-add-plus' src={addPlus}/></button>
                </div>

                <div className='new-bill-space'>

                <div className='bill-items-table'>
                <table>
                <tr>
                  <td>Name</td>
                  <td>Required Quantity</td>
                  <td>Unit</td>
                  <td>Price/Unit</td>
                  <td>Total</td>
                </tr>
                {newBill.items?[...newBill.items].map((x)=>
                  (<tr>
                  <td  style={{backgroundColor:"red"}}>{x.name}</td>
                  <td>{x.req_qty}</td>
                  <td>{x.unit}</td>
                  <td>${x.price_unit}</td>
                  <td>${x.total}</td>
                  <td><button onClick={()=>setAddedItems((prev)=>prev.filter((y)=>y.ibid!=x.ibid))}>-</button></td>
                </tr>))
                  :(<tr></tr>)}
                {addedItems.length?addedItems.map((x)=>
                  (<tr>
                  <td>{x.name}</td>
                  <td>{x.req_qty}</td>
                  <td>{x.unit}</td>
                  <td>${x.price_unit}</td>
                  <td>${x.total}</td>
                  <td><button onClick={()=>setAddedItems((prev)=>prev.filter((y)=>y.ibid!=x.ibid))}>-</button></td>
                </tr>))
                  :(<tr></tr>)}

                </table>
                </div>

                </div>
        </div>





        

        <div className="right-pane old-bills-section">
                <div className='right-section-header'> 
                <div className='filter-bills'><FilterComponent  onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} /></div>
                <button className='arrange' onClick={(e)=>handleArrange(e)} ><img className='cancel-icon' src={sortIcon}/></button>
                </div>



                  <div className='old-bills-space'>
                  
                  <div style={{fontSize:8}}>
                  
                   {//bills&&bills.length>0 ?
                   filteredItems&&filteredItems.length>0 ?
                    //bills. map(
                      filteredItems.map(
                      (x)=>
                      <div onClick={(e)=>handleCardClick(e,x.bid)}>
                      <BillCard
                      bid={x.bid}
                      cName={x.c_name} 
                      bTotal={x.b_total}
                      date={x.date}
                      
                      debt={x.debt}
                      records={x.records}
                    />
                      </div>)
                      :
                    <div></div>
                 
                  }
                 
                    </div>
                  </div>
                </div>
            </div>
          </div>
        
     
                  

          </BillProvider>    
    )

};
export default AddBill
