import './AddBill.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import ItemToBill from '../../layout/cards/ItemToBill/ItemToBill';
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


const AddBill=()=>{


    //state of new added item list 
    const [newAdded,setNewAdded]=useState({});


    //new Item popup
    const handleNewItemPop=(e,id)=>{
      e.preventDefault();
      const newItem =stockData.filter((x)=>x.id==id)[0]
      setNewAdded({
        ...newItem,
        required_units:0,
        total:newItem.required_units*newItem.price_unit
      })
    }
    const cancelItemToBill =()=>{
      setNewAdded({})
    }
   
    useEffect
    (()=>newAdded&&newAdded.id?console.log(`new added ${{...newAdded}} `)
    :
    console.log('none retrieved'),[newAdded]);
   

   
  
    return(
        <div className="route-content add-bill">
            <h1>Add new bill here</h1>

            <div className='add-bill-sections'>
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
                       <h2>... new added items</h2>
                    </div>
                </div>

                <div className='old-bills-section'>
                  <div className='section-header'> 
                      
                  </div>



                    <div className='old-bills-space'>
                    <h2> .. old bills here</h2>
                    <p style={{fontSize:8}}>{newAdded&&newAdded.id?JSON.stringify(newAdded):''}</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
};
export default AddBill