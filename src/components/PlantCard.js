import React, {useState} from "react";

//price is renamed to initialPrice
function PlantCard({ id, name, image, price: initialPrice, handleDelete }) {
 const[stock, setStock] = useState(true);
 const[isEditingPrice, setIsEditingPrice]= useState(false);
 const[price, setPrice] = useState(initialPrice);

 //Sets state for toggling InStock/Outofstock
 const toggleStock = () => setStock(!stock)

 //pulls user input value to set price state for render
 const handlePriceChange = (e) => {
  setPrice(e.target.value);
 }

 //toggles the price display to an input field
 const handlePriceClick=()=>{
  setIsEditingPrice(true);
 }

/*Upon clicking out of the input field sets isEditingPrice to false to 
toggle off input field and invokes updatePrice 
price to PATCH to database*/
 const handlePriceBlur=()=> {
  setIsEditingPrice(false);
  updatePrice(id, price);
 }

//Uses new price and PATCH to database to persist
const updatePrice =(plantId, newPrice) => {
  const url = `http://localhost:6001/plants/${plantId}`;
  fetch(url,{
    method:'PATCH',
    headers: {'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price:parseFloat(newPrice),
    }),
  })
  .then(res => {
    if(!res.ok) {
      console.error("Error with Fetch")
    }
    return res.json();
  })
  .then(updatedPlant => {
    console.log("Price update was successful", updatedPlant);
  })
  .catch (error =>{
    console.error('Error updating price', error);
  });
};
//function to pass specific PlantId and invoke the hoisting function handleDelete
const deleteStock=(plantId)=>{
  handleDelete(plantId)
};
  
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p onClick = {handlePriceClick}>Price: {isEditingPrice?(
        <input 
        type="number"
        value = {price}
        onChange={handlePriceChange}
        onBlur={handlePriceBlur}
        autoFocus/>):(price)}
      </p>
      {stock ? (
        <button className="primary" onClick={toggleStock}>In Stock</button>
      ) : (
        <button onClick={toggleStock}>Out of Stock</button>
      )}
      <button onClick={()=>deleteStock(id)}>Delete</button>
    </li>
  );
}

export default PlantCard;
