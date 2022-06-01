import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Gradient,Wrapper,Card } from './Popular';
import {Link} from 'react-router-dom';

function Veggie() {
  const[veggie,setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, [])

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
   // if(check) {
    //  setVeggie(JSON.parse(check));
    //}else{
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
    const data = await api.json();
    localStorage.setItem("veggie",JSON.stringify(data.recipes));
    console.log(data.recipes);
    setVeggie(data.recipes);
    // }
    
  }
  return (
    <Wrapper>
      <h3> Out Vegetarian Picks</h3>
    <Splide
    options={{
      perPage: 4,
      arrows: false,
      paginate: false,
      drag: "free",
      gap: "5rem",
    }}>
    {veggie.map(recipe => {
      
      return(
        <SplideSlide key={recipe.id}>
          <Card>
          <Link to={'/recipe/' + recipe.id}>
            <Gradient />
            <p> {recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
            </Link>
          </Card>
        </SplideSlide>
      )
    })}
     </Splide>
    </Wrapper>
  )
}


export default Veggie;