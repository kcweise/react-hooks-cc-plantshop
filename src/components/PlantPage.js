import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
const[list, setList] = useState([]);
const[queryPlants, setQueryPlants] = useState("");
const url = 'http://localhost:6001/plants'


useEffect(()=> {
  fetch(url)
    .then (res => {
      if (!res.ok) {
        console.error("Error fetching data");
      }
      return res.json();       
    })
    .then (data => setList(data))
    .catch(error => console.error("Error fetching data:", error));   
}, []);

const handleAddPlant = (newPlant)=>{
  fetch(url, {
    method:'Post',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(newPlant),
  })
    .then(res=>res.json())
    .then(savedPlant => {
      setList([...list, savedPlant]);
    })
    .catch(error=> console.error('Error adding plant:', error));
};

const handleSearch = (query) =>{
    setQueryPlants(query);
};

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
      <PlantList list = {displayedList} />
    </main>
  );
  }

export default PlantPage;
