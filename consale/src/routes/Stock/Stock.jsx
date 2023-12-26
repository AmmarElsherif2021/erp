import './Stock.css';
const Stock =()=>{
    const data = [
        {
            id: 'Example ID',
            parameter: {
                name: 'Example Name',
                image: 'Example Image',
                description: 'Example Description',
                quantity_stock: 'Example Quantity Stock',
                price_unit: 'Example Price Unit'
            }
        },
        // Add more objects for more rows
        {
            id: 'Example ID',
            parameter: {
                name: 'Example Name',
                image: 'Example Image',
                description: 'Example Description',
                quantity_stock: 'Example Quantity Stock',
                price_unit: 'Example Price Unit'
            }
        },
        {
            id: 'Example ID',
            parameter: {
                name: 'Example Name',
                image: 'Example Image',
                description: 'Example Description',
                quantity_stock: 'Example Quantity Stock',
                price_unit: 'Example Price Unit'
            }
        },
        {
            id: 'Example ID',
            parameter: {
                name: 'Example Name',
                image: 'Example Image',
                description: 'Example Description',
                quantity_stock: 'Example Quantity Stock',
                price_unit: 'Example Price Unit'
            }
        }
    ];
    return(
    <div className="route-content stock">
    <h1>Stock</h1>
    <div className='stock-header'>
    <button className='add-stock'>Add</button>
    <input className='search-input' type="text" name="search" placeholder='search items'/>
    </div>
    <div className='stock-table'>
     
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Quantity Stock</th>
            <th>Price Unit</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.parameter.name}</td>
                <td>{item.parameter.image}</td>
                <td>{item.parameter.description}</td>
                <td>{item.parameter.quantity_stock}</td>
                <td>{item.parameter.price_unit}</td>
                <td>
                 <button className='table-btn' style={{backgroundColor: "#ff5c33"
                    }}>-</button>
                 <button className='table-btn' style={{backgroundColor: "#00994d"
                }}>edit</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

    </div>
    </div>
)}
export default Stock