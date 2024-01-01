import './AddBill.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import ItemToBill from '../../layout/popups/ItemToBill/ItemToBill';
import BillCard from '../../layout/cards/BillCard/BillCard';
const stockData = [
  
    {
            id: '101',
            parameter: 'unit',
            name: 'item1',
            image: '',
            discription: 'it is a discription of the item1',
            quantity_stock: 100,
            price_unit: 20,
            unit:'unit',
            
        
    },

    {
        id: '102',
        parameter: 'length',
        unit: 'm',
        name: 'item2',
        image: '',
        discription: 'it is a discription of the item2',
        quantity_stock: 20,
        price_unit: 293,
        available:200
    
         },
        {
            id: '103',
            parameter: 'weight',
            unit: 'kg',
            name: 'Example Name',
            image: '',
            discription: 'it is a discription of the item3',
            quantity_stock: 60,
            price_unit: 620,
            available:200
        
        },
        
];

const billsData=[
  {
    bid:'b101',
 	  c_name:'ammar elsherif',
  	c_phone:'01009780911',
   	b_total:0,
	  discount:0,
 	  items:[
      {
        ibid:'0001',
        name:'nails',
        req_qty:5,
        unit:'kg',
        price_unit:5,
        total:25
      },
      {
        ibid:'0002',
        name:'grinding paper',
        req_qty:10,
        unit:'m',
        price_unit:5,
        total:50
      },
      {
        ibid:'0003',
        name:'grin paper',
        req_qty:15,
        unit:'cm',
        price_unit:50,
        total:750
      }
    ],
    debt:0,
    date:'01/01/2024',
   	time:'00:00 pm',
  },
  {
    bid:'b102',
 	  c_name:'amr',
  	c_phone:'01000000911',
   	b_total:222,
	  discount:0,
 	  items:[
      {
        ibid:'0001',
        name:'nails',
        req_qty:5,
        unit:'kg',
        price_unit:5,
        total:25
      },
      {
        ibid:'0002',
        name:'grinding paper',
        req_qty:10,
        unit:'m',
        price_unit:5,
        total:50
      },
      {
        ibid:'0003',
        name:'grin paper',
        req_qty:15,
        unit:'cm',
        price_unit:50,
        total:750
      }
    ],
    debt:0,
    date:'01/01/2024',
   	time:'00:00 pm',
  },
  {
    bid:'b101',
 	  c_name:'ammar elsherif',
  	c_phone:'01009780911',
   	b_total:0,
	  discount:0,
 	  items:[
      {
        ibid:'0001',
        name:'nails',
        req_qty:5,
        unit:'kg',
        price_unit:5,
        total:25
      },
      {
        ibid:'0002',
        name:'grinding paper',
        req_qty:10,
        unit:'m',
        price_unit:5,
        total:50
      },
      {
        ibid:'0003',
        name:'grin paper',
        req_qty:15,
        unit:'cm',
        price_unit:50,
        total:750
      }
    ],
    debt:0,
    date:'01/01/2024',
   	time:'00:00 pm',
  }
]
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||-|||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||---||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||-|-|-|||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||--|-|--||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||--||-||--|||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||-||||-||||-||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||-|||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||-|||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||-|||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||-|||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||-|||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||





const AddBill=()=>{

//Left section >> Create bill section ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    //state of new added item object
    const [newAdded,setNewAdded]=useState({});
    //added items list to bill
    const [addedItems,setAddedItems]=useState([]);

     
  //new Item popup
    const handleNewItemPop=(e,id)=>{
      e.preventDefault();
      const newItem =stockData.filter((x)=>x.id==id)[0]
      setNewAdded({
        ...newItem,
        required_units:0,
        total:newItem.req_qty*newItem.price_unit
      })
    }
    const cancelItemToBill =()=>{
      setNewAdded({})
    }
   
    useEffect
    (()=>newAdded&&newAdded.id?console.log(`new added ${{...newAdded}} `)
    :
    console.log('none retrieved'),[newAdded]);
   //add selected newAdded item to bill
   const handleItemsListPush=(e,id)=>{
    //set addedItemsList -->is rq_quantity > stock qty? push newAdded
    //set newAdded to {} then wait for <<confirm>> in itemToBill
    //       to complete the entire substraction from the entire stock
   }

//Right section >> Navigate old bills ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
   const [bills,setBills]=useState([...billsData]);
   useEffect(()=>console.log(`bills..> ${bills.map((x)=>JSON.stringify(x))}`),[])
   
    return(
        <div className="route-content add-bill">
            <h1>Add new bill here</h1>

            <div className='add-bill-sections'>
{/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/}
                <div className='new-bill-section'>
                    {
                      newAdded&&newAdded.id?<div><ItemToBill name={newAdded.name} unit={newAdded.unit} 
                      priceUnit={newAdded.price_unit} requiredUnits={newAdded.required_units} 
                      total={newAdded.total} cancelItemToBill={cancelItemToBill}/></div>
                      :
                      <div></div>
                    }
                    <div className='section-header'> 
                        <Autocomplete
                        options={stockData}
                        getOptionLabel={(option) => option.name}
                        value={newAdded}
                        onChange={(event, newAdded) => {
                       
                          handleNewItemPop(event,newAdded.id)
                          
                        }}
                        renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                      />
                    </div>


                    <div className='new-bill-space'>
                      <></>
                    </div>
                </div>
{/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/}



                <div className='old-bills-section'>
                  <div className='section-header'> 
                  <Autocomplete
                  options={stockData}
                  getOptionLabel={(option) => option.name}
                  value={newAdded}
                  onChange={(event, newAdded) => {
                 
                    handleNewItemPop(event,newAdded.id)
                    
                  }}
                  renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                />
                  </div>



                    <div className='old-bills-space'>
                    <div style={{fontSize:8}}>{bills&&bills.length>0?
                      bills.map(
                        (x)=><BillCard
                        bid={x.bid}
                        cName={x.c_name} 
                        bTotal={x.b_total}
                        date={x.date}
                        time={x.time}
                        debt={x.debt}
                      />):<div></div>}
                      </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};
export default AddBill
/*
<BillCard
                        bid={x.bid}
                        cName={x.c_name} 
                        cPhone={x.c_phone}
                        bTotal={x.b_total}
                        discount={x.discount}
                        items={x.items}
                        date={x.date}
                        time={x.time}
                      />
*/