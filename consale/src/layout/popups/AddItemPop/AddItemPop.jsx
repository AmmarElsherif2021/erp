import './AddItemPop.css';
import cancelIcon from '../../../assets/cancel.svg'
import { useState } from 'react';
const AddItemPop=(props)=>{
    const {cancelAddItemPop,handleAddSubmit}=props;
    const [parameter, setParameter] = useState('');
    const [newAddedItem, setNewAddedItem] = useState({
      name: '',
      description: '',
      parameter: '',
      price_unit: 0,
      available:0
    });
  
    
  
    const handleInputChange = (event) => {
      setNewAddedItem({
        ...newAddedItem,
        [event.target.name]: event.target.value
      });
    };
  
    
  
    return (
      <div className='add-item-pop'>
        <button className='cancel-add-item-pop' onClick={()=>cancelAddItemPop()}><img className='cancel-icon' src={cancelIcon}/></button>
        <div className='pop-body'></div>
        <h1> Add account </h1>
        <div className='add-account-form'>
          <form onSubmit={handleAddSubmit}>
            <div><label className='form-label'>
              <input className='input' type="text" name="name"  placeholder='Set Name' onChange={handleInputChange}/>
            </label></div>
            <div><label className='form-label'>
              <input className='input' type="text" name="description" placeholder='Set description' onChange={handleInputChange}/>
            </label></div>
            <div className='form-label'>
              <label>Set parameter used</label>
              <label>
                Weight:
                <input className='input' type="radio" value="weight" name="parameter" onChange={handleInputChange} />
                {parameter === 'weight' && (
                  <div>
                    <label>
                      <input type="radio" value="kg" name="weight" /> kg
                    </label>
                    <label>
                      <input type="radio" value="g" name="weight" /> g
                    </label>
                  </div>
                )}
              </label> 
              <label>
                Length:
                <input className='input' type="radio" value="length" name="parameter" onChange={handleInputChange} />
                {parameter === 'length' && (
                  <div>
                    <label>
                      <input type="radio" value="m" name="length" /> m
                    </label>
                    <label>
                      <input type="radio" value="cm" name="length" /> cm
                    </label>
                    <label>
                      <input type="radio" value="mm" name="length" /> mm
                    </label>
                  </div>
                )}
              </label>
              <label>
                Units:
                <input className='input' type="radio" value="units" name="parameter" onChange={handleInputChange} />
              </label>
            </div>
            <div  className='form-label'><label>
              <input className='input' type="number" name="price_unit" placeholder='set price/unit' onChange={handleInputChange}/>
            </label></div>
            <div  className='form-label'><label>
              <input className='input' type="number" name="available" placeholder='set stock quantity' onChange={handleInputChange}/>
            </label></div>
            <div className='form-label'><input className='input' type="submit" value="Submit" /></div>
          </form>
        </div>
      </div>
    );
  }
export default AddItemPop