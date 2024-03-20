import React, { useState } from "react";

function NewPlantForm({handleAddPlant}) {

const blankForm = {name:"", image:"", price:""}
const[form, setForm]= useState (blankForm)
 
/*handling change, destructured name and value from e.target, setting form state
with key value pairs, when price is the key the string value will be changed to a 
decimal number value*/
const handleChange = (e) =>{
  const {name, value} = e.target;
  setForm({...form, [name]:name === 'price'?parseFloat(value): value});
  }

//handles submitting form, invoking hoisting function handleAddPlant in PlantPage, and
//setting form state to original blank format
const handleSubmit = (e) =>{
  e.preventDefault();
  handleAddPlant(form);
  setForm(blankForm);
  console.log(`Submitting data: ${form}`)
};

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={form.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
  }

export default NewPlantForm;
