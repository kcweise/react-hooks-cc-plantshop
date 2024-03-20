import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
const[list, setList] = useState([]);
const[queryPlants, setQueryPlants] = useState("");
const url = 'http://localhost:6001/plants'

//useEffect to pull in Plant list object on render run only once
useEffect(()=> {
  fetch(url)
    .then (res => {
      if (!res.ok) {
        console.log("Error fetching data");
      }
      return res.json();       
    })
    .then (data => setList(data))
    .catch(error => console.log("Error fetching data:", error));   
}, []);

//Function lifting state from NewPlantForm, adding new plant to database, 
//syncing state with database and rendering
const handleAddPlant = (newPlant)=>{
  fetch(url, {
    method:'POST',
    headers: {
      'Content-Type':'Application/JSON',
    },
    body: JSON.stringify(newPlant),
  })
    .then(res=>res.json())
    .then(savedPlant => {
      setList([...list, savedPlant]);
    })
    .catch(error=> console.log('Error adding plant:', error));
};

//Function lifting state from PlantCard, deleting plant from database, 
//syncing state with database and rendering
const handleDeletePlant = (plantId) =>{
  const url = `http://localhost:6001/plants/${plantId}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res=>{
    if (!res.ok){
      console.error("Network response failed")
    }
    setList(currentList => currentList.filter(plant => plant.id !== plantId));
    return res.json();
  })
  .then(()=>{
    console.log(`Stock item ${plantId} deleted successfully`)
  })    
  .catch(error=> {
    console.error('Error deleting item', error);
  });
}

//Function lifting state from Search, syncing state. 
const handleSearch = (query) =>{
    setQueryPlants(query);
};
//When queryPlants is truthy only query included plants will render, 
//otherwise whole list will be rendered
const displayedList = queryPlants
    ? list.filter(listing =>
    listing.name.toLowerCase().includes(queryPlants.toLowerCase()))
    : list;

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant}/>
      <Search 
      handleSearch = {handleSearch} 
      queryPlants = {queryPlants}
      setQueryPlants = {setQueryPlants} />
      <PlantList list = {displayedList} handleDelete={handleDeletePlant} />
    </main>
  );
  }

export default PlantPage;
