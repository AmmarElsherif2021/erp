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
import PrintPop from '../../layout/popups/printPop/printPop';

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
//const {newBill,setNewBill}=useBill();
const [newBill, setNewBill] = useState({
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
useEffect(() => {
  !newBill.bid && setNewBill((prevBill) => ({
    ...prevBill,
    bid:`b-${Math.random().toString(36).substring(2, 7).slice(0, 5)}`,
    date: getDate(),
  }));
}, []);


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
    const handleReqQty=(reqQty)=>{
        setNewAdded((prev)=>({...prev,req_qty:reqQty,total:reqQty*Number(newAdded.price_unit)}))
    };




    //restore item from bill:
    const [restored,setRestored]=useState([]);
   
    useEffect(()=>console.log(`item  restored------------------------------------------------------`),[restored])
    const deleteOldItem=(x,id)=>{
      newBill&&newBill.bid==id&&setNewBill((prev)=>({
        ...prev,
        items:[...prev.items.filter((y)=>y.ibid!=x.ibid)]
        
      }));
      newBill&&newBill.items&&setRestored((prev)=>([...prev,x]));
      console.log(`RESTORED: ${restored.map((y)=>JSON.stringify(y))}`)
    }



    const deleteNewItem=(x)=>{
      setAddedItems((prev)=>prev.filter((y)=>y.ibid!=x.ibid))
    }
    const cancelItemToBill =()=>{
      setNewAdded({})
    }
   
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
   //let billsData=[...billsDataArr];
   const [bills,setBills]=useState([]);
   useEffect(()=>setBills([...billsData]),[])
   useEffect(()=>{console.log(`bills..> `)},[bills]);
   //handle click on card:
   const [oldBillPop,setOldBillPop]=useState({});

   const handleCardClick=(e,id)=>{
    e.preventDefault()
     const clicked=bills&&bills.length?bills.filter((x)=>x.bid==id)[0]:{};
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
      setOldBillPop({});
      setRestored([]);
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


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||.............|||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||..............||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....|||||||...||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....|||||||...||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||..............||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||.............|||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||....||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
const [printPop,setPrintPop]=useState(false);
useEffect(()=>console.log('printpop triggered'),[printPop]);
const handleOpenPrint=(bid)=>{
  //End point --->retrieve from data
  //let printable=bills.filter((x)=>x.bid===bid)[0];
};
const handlePrint=()=>{
  printPop&&printableBill.items&&printableBill.items.length&&
  console.log(`Ready to print ${JSON.stringify(printableBill)}`);
  setBills((prev)=>(
    [...prev.filter((x)=>x.bid!=printableBill.bid),printableBill]));
  setPrintPop(false);
  
}
const handleCancelPrint=()=>{
  setBills((prev)=>(
    [...prev.filter((x)=>x.bid!=printableBill.bid),printableBill]));
  setPrintPop(false);
};

  
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
const [printableBill,setPrintableBill]=useState({});
useEffect(()=>setPrintableBill({bid:newBill.bid,c_name:newBill.c_name,c_phone:newBill.c_phone}),[]);
useEffect(()=>console.log(`bills updated..`),[bills])
const confirmSaveBill = (id,bTotal,p,d,items) => {
       let totalPaid=Number(Number(p)+Number(newBill.paid));
       setPrintableBill(()=>({
        
          bid:id,
          c_name:newBill.c_name,
          c_phone:newBill.c_phone,
          debt:d,
          paid:totalPaid,
          b_total:bTotal,
          discount:0,
          date:newBill.date,
          items:items,
          records:
          newBill&&newBill.records&&newBill.records.length
              ? [
                  ...newBill.records,
                  {
                    date:getDate(),
                    debt:d,
                    paid:totalPaid,
                    added_items:addedItems.length&&[...addedItems ],
                    restored_items: restored.length&&[...restored]
                  },
                ]
              : [ 
                  {
                    date: getDate(),
                    paid: totalPaid,
                    debt: d,
                    added_items: addedItems.length&&[...addedItems ],
                    restored_items: restored.length&&[...restored]
                  },
                ],
        }))
       
       
       
      
        console.log(`JSON NEW BILL ||||||||||||||||||||||||||||||||||||>>>> ${JSON.stringify(newBill)}`);
        //setNewBill((x)=>({...x,newBill}));

        
        
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
            records:[]
           
          
        }));
        setRestored([]);
        setConfirmSave(false);
        setPrintPop(true);
        //setBills((prev)=>(
        //[...prev.filter((x)=>x.bid!=id),printableBill]));
        setAddedItems([]);
        
        console.log(`bills 1 ${bills.map((x) => x.bid)}`);
        

};



 useEffect(()=>console.log(`update bill and bills`),[printableBill,bills])
  const cancelSaveBillPop = () => {
    setConfirmSave(false);
  };


const handleAddBill = (e) => {
  
  setConfirmSave(true);
  setNewBill((prev)=>({...prev,items:[...newBill.items,...addedItems]}));
 
};


useEffect(() => console.log(`confirm save ?${confirmSave}`), [confirmSave]);
//useEffect(()=>console.log(''),[confirmSave,bills]);
useEffect(()=> console.log(`bills 11111111111111111111111111 ${bills.map((x)=>x.bid)}`),[bills]);


  //Final stage of confirm pop that substracts the actual db data|||||||||||||||||||||||||||||||||||||||||;
    return(
      
        <div className="route-content add-bill">
        {
          printPop?(<div><PrintPop 
            cName={printableBill.c_name} 
            cPhone={printableBill.c_phone}
            bid={printableBill.bid} 
            paid={printableBill.paid} 
            debt={printableBill.debt} 
            date={printableBill.date}
            handleCancelPrint={handleCancelPrint}
            handlePrint={handlePrint}
            /></div>):(<div></div>)
        }

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
          key={newBill.bid}
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
                {newBill.items&&newBill.items.length?newBill.items.map((x)=>
                  (<tr key={x.ibid}>
                  <td  style={{backgroundColor:"red"}}>{x.name}</td>
                  <td>{x.req_qty}</td>
                  <td>{x.unit}</td>
                  <td>${x.price_unit}</td>
                  <td>${x.total}</td>
                  <td><button key={x.ibid} onClick={()=>deleteOldItem(x,newBill.bid)}>-</button></td>
                </tr>))
                  :(<tr></tr>)}
                {addedItems.length?addedItems.map((x)=>
                  (<tr key={x.ibid}>
                  <td>{x.name}</td>
                  <td>{x.req_qty}</td>
                  <td>{x.unit}</td>
                  <td>${x.price_unit}</td>
                  <td>${x.total}</td>
                  <td><button onClick={()=>deleteNewItem(x)}>-</button></td>
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
                      paid={x.paid}
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
        
     
                  

      
    )

};
export default AddBill
