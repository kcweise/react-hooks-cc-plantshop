import React, {useState} from "react";

//price is renamed to initialPrice
function PlantCard({ id, name, image, price: initialPrice }) {
 const[stock, setStock] = useState(true);
 const[isEditingPrice, setIsEditingPrice]= useState(false);
 const[price, setPrice] = useState(initialPrice);

 const toggleStock = () => setStock(!stock)

 //sets input values to be displayed
 const handlePriceChange = (e) => {
  setPrice(e.target.value);
 }

 //toggles the price display to an input field
 const handlePriceClick=()=>{
  setIsEditingPrice(true);
 }
//Upon clicking out of the input field sets price and POSTs to database
 const handlePriceBlur=()=> {
  setIsEditingPrice(false);
  updatePrice(id, price);
 }

const updatePrice =(plantId, newPrice) => {
  const url = `http://localhost:6001/plants/${plantId}`;

  fetch(url,{
    method:'PATCH',
    headers: {'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price: newPrice,
    }),
  })
  .then(res => {
    if(!res.ok) {
      console.log("Error with Fetch")
    }
    return res.json();
  })
  .then(updatedPlant => {
    console.log("Price update was successful", updatedPlant);
  })
  .catch (error =>{
    console.log('Error updating price', error);
  });
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
    </li>
  );
}

export default PlantCard;
