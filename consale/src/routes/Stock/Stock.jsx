import { useState,useEffect } from 'react';
import './Stock.css';
import ItemPop from '../../layout/popups/ItemPop/ItemPop';
import DelItemPop from '../../layout/popups/DelItemPop/DelItemPop';
import AddItemPop from '../../layout/popups/AddItemPop/AddItemPop';

//searhbar imports
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search,SearchBar } from 'react-bootstrap-table2-toolkit';

const MyTableComponent = (props) => {
    return (
      <div>
        <h3>Input something at below input field:</h3>
        <SearchBar {...props.searchProps} />
        <hr />
        <BootstrapTable {...props.baseProps} />
      </div>
    );
  };
  

/*
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
/* */
/* 
    Stock table page ought to allow user to add, set parameters and infos, edit, delete items:
    States:
            [stockData,setStockData] ---> state handles stock data
                -func: -confirmDelItem(e,iid) 
                       -handleAddSubmit(newAdded)
                       
            [itemPop,setItemPop]  --->Edit Item data
                -func: -handleItemEdit(e,iid)
                       -cancelItemPop()
            [delItemPop,setDelItemPop] ---> Delete item pop
                -func: -handleItemDel(e,iid)
                       -cancelDelItemPop()
                        confirmDelItem(e,iid)

*/
const Stock =()=>{
   
    //stock data ---------------------------------------------
    const [stockData,setStockData] = useState([
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
        // Add more objects for more rows
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
            ]);


//Edit an item popup ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        const [itemPop,setItemPop]=useState({});
        const handleItemEdit=(e,iid)=>{
            e.preventDefault();
            const items= stockData.filter((x)=>x.id==iid)
            setItemPop({...items[0]})
        };

        useEffect(()=> console.log(`ItemPop ----->${itemPop}`),[itemPop]);
        // cancel item pop:
        const cancelItemPop=()=>{
            setItemPop({})
            console.log(`ItemPop ----->${{...itemPop}}`)
        };


        
//Delete Item |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        const [delItemPop,setDelItemPop]=useState({});
        const handleItemDel=(e,iid)=>{
            e.preventDefault();
            const items= stockData.filter((x)=>x.id==iid)
            setDelItemPop({...items[0]})
        };
        // delete item pop:
        const cancelDelItemPop=()=>{
            setDelItemPop({})
            console.log(`ItemPop ----->${{...delItemPop}}`)
        };
        const confirmDelItem=(e,iid)=>{
            e.preventDefault();
            const newStock=stockData.filter((x)=>x.id!=iid);
            setStockData([...newStock]);
            setDelItemPop({});
        }
        useEffect(()=>console.log([...stockData]),[delItemPop])
        useEffect(()=>console.log([...stockData]),[stockData])

    
 // Add item pop:|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        const [addedItemPop,setAddedItemPop]=useState({});
        const cancelAddItemPop=()=>{
            setAddedItemPop({})
            console.log(`AddedItemPop ----->${{...addedItemPop}}`)
        };
        //generate Id
        function generateRandomId() {
            return  Math.random().toString(36).substring(2, 15);
        }
        const handleAddItemClick=(e)=>{
            e.preventDefault();
            const newId=generateRandomId();
            setAddedItemPop({
                id: newId.toString(),
                parameter: '',
                name: '',
                image: '',
                discription: '',
                quantity_stock: 0,
                price_unit: 0,
                unit:'',
                available:0
            })
        }

        //confirm add submit
        const handleAddSubmit =(newAdded)=> {
             // Destructure the id out of newAdded
            const { id, ...restOfNewAdded } = newAdded;
            // Update addedItemPop state
            setAddedItemPop(prev => ({
                id: prev.id,
                ...restOfNewAdded
            }));
        
            // Add new item to stockData
            setStockData(prev => [...prev, newAdded]);
        
            // Reset addedItemPop state
            setAddedItemPop({});
        };
        
        useEffect(()=>console.log(`added -- >   ${{...addedItemPop}}`),[addedItemPop]);
        useEffect(()=>console.log([...stockData]),[stockData]);
    
//Search |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        // Search functionality
        const [searchTerm, setSearchTerm] = useState('');

        // No need for a separate filteredData state, as react-bootstrap-table-next handles filtering internally

        const handleSearchChange = (value) => {
            setSearchTerm(value);
        };

        useEffect(()=>console.log('search term'),[searchTerm])
        //useEffect(() => console.log('search term'), [searchTerm, filteredData]);

//table grid|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'unit', headerName: 'Unit', width: 130 },
  { field: 'quantity_stock', headerName: 'Quantity Stock', width: 130 },
  { field: 'price_unit', headerName: 'Price Unit', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <div>
        <Button variant="contained" color="primary" onClick={(e) => handleItemEdit(e, params.row.id)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={(e) => handleItemDel(e, params.row.id)}>
          -
        </Button>
      </div>
    ),
  },
]
//||||||||||||||||||||||||||||||||||||||||||||##||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||##||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||##||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||##||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||#|||##||||#||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||##||##||##||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||#|##|#||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||##||||||||||||||||||||||||||||||||||||||||||||||

    return(
    
    
   

   


    <div className="route-content stock"> 
    {itemPop && itemPop.id?
        <ItemPop cancelItemPop={cancelItemPop} id={itemPop.id} 
        img={itemPop.image} name={itemPop.name} discription={itemPop.discription} unit={itemPop.unit} 
        priceUnit={itemPop.price_unit} available={itemPop.available}/>
        :
        <div></div>
        }
        
        
        {
            delItemPop&& delItemPop.id?<DelItemPop confirmDelItem={confirmDelItem} 
            cancelDelItemPop={cancelDelItemPop} name={delItemPop.name} id={delItemPop.id}/>:<div></div>
        }
        
        
        {
            addedItemPop && addedItemPop.id?
            <AddItemPop 
            handleAddSubmit={handleAddSubmit} 
            cancelAddItemPop={cancelAddItemPop} 
            generateRandomId={generateRandomId}
            />:<div></div>
        }
        <h1>Stock</h1>
    
        <ToolkitProvider keyField="id" data={stockData} columns={columns} search>
        <MyTableComponent
        {...props}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        />
        </ToolkitProvider>
      </div>
    
)}
export default Stock










