import './AddBill.css';
const AddBill=()=>{
    return(
        <div className="route-content add-bill">
        <h1>Add new bill here</h1>
        <div className='add-bill-sections'>
        <div className='new-bill-section'>
            <input className='search-input' type="text" name="search" placeholder='search items'/>
            <div className='new-bill-space'>
            <h2>... new added items</h2>
            </div>
        </div>
        <div className='old-bills-section'>
            <input className='search-input' type="text" name="search" placeholder='search items'/>
            <div className='old-bills-space'>
             <h2> .. old bills here</h2>
            </div>
        </div>
        </div>
        </div>
        
    )
};
export default AddBill