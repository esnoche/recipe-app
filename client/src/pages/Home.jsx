import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipe = async ()=>{
      try{
        const load = await axios.get("http://localhost:3001/recipes");
        setRecipes(load.data);
        console.log(load.data);
      }catch(error){
        console.error(error);
      }
    }
    fetchRecipe();
  },[])
  return (
    <div>Home</div>
  )
}
