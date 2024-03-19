import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
const[list, setList] = useState([])
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


  return (
    <main>
      <NewPlantForm />
      <Search />
      <PlantList list = {list} />
    </main>
  );
}

export default PlantPage;
