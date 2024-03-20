import React from "react";
import PlantCard from "./PlantCard";

function PlantList({list, handleDelete}) {
  
  //.map renders list of plants
  return (
    <ul className="cards">
      {list.map((plant)=>(
      <PlantCard
      key = {plant.id}
      id = {plant.id}
      name ={plant.name}
      image = {plant.image}
      price = {plant.price}
      handleDelete = {handleDelete}
      />
      ))}
      
    </ul>
  );
}

export default PlantList;
