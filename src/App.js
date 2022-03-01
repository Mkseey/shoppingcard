import './App.css';
import { useState } from 'react';

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  tableCel:{
    backgroundColor:"blue",
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function ShoppingCardList(props) {
  const initDetails = {
    id: null,
    productName: "",
    productPrice: "",
    productQuantity: "",
    productTotal: "",
    productAction: ""
  };

  const [userState, setUserState] = useState(initDetails);

  const handleUserChange = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userState.productName || !userState.productPrice || !userState.productQuantity) return;
    props.addProduct(userState);
    setUserState(initDetails);
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>Product name:</label>
      <br />
      <input style={style.form.inputs} className="productName" name="productName" type="text" value={userState.productName} onChange={handleUserChange} />
      <br />
      <label>Product Price:</label>
      <br />
      <input style={style.form.inputs} className="productPrice" name="productPrice" type="text" value={userState.productPrice} onChange={handleUserChange} />
      <br />
      <label>Product quantity:</label>
      <br />
      <input style={style.form.inputs} className="productQuantity" name="productQuantity" type="text" value={userState.productQuantity} onChange={handleUserChange} />
      <br />

      <input style={style.form.submitBtn} className="submitButton" type="submit" value="Add New" />
    </form>
  );
}

function ProductTable(props) {
  const sortedProducts = props.products.sort((a, b) => a.productName.localeCompare(b.productPrice));
  //console.log("sortedContacts", sortedContacts)
 
  

  const display =
  sortedProducts.length > 0 ? (
    sortedProducts.map((productinf, index) => (
        <tr key={index}>
          <td style={style.tableCell}>{productinf.productName}</td>
          <td style={style.tableCell}>{productinf.productPrice}</td>
          <td style={style.tableCell}>{productinf.productQuantity}</td>
          <td style={style.tableCell}>{productinf.productPrice * productinf.productQuantity}</td>
          <td style={style.tableCell}>
            <button onClick={props.deleteItem()} >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3}>&nbsp;</td>
      </tr>
    );
  
  return (
    <table style={style.table} className="productTable">
      <thead>
        <tr>
          <th style={style.tableCel}>Product</th>
          <th style={style.tableCel}>Price</th>
          <th style={style.tableCel}>Quantity</th>
          <th style={style.tableCel}>Total</th>
          <th style={style.tableCel}>Action</th>
        </tr>
      </thead>
      <tbody>{display}</tbody>
    </table>
  );
}

function App() {

  const [products, setProducts] = useState([]);

  const addproduct = (product) => {
    product.id = products.length + 1;
    console.log("users.length", products.length);
    setProducts([...products, product]);
  };

  const deleteItem = (props) => {
    console.log("delete props.is", props)
    //  setProducts((preValue) => {
    //     return preValue.filter((val, index) => {
    //       return id !== index;
    //     });
    //   });
  }


  return (
    <section>
      <ShoppingCardList addProduct={addproduct}/>
      <ProductTable products={products} deleteItem={deleteItem} />
    </section>
  );
}


export default App;
