import React from "react";
import PlantCard from "./PlantCard";

function PlantList({list}) {
  
  return (
    <ul className="cards">
      {list.map((plant)=>(
      <PlantCard
      key = {plant.id}
      id = {plant.id}
      name ={plant.name}
      image = {plant.image}
      price = {plant.price}/>
      ))}
      
    </ul>
  );
}

export default PlantList;
