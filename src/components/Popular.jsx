import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';

function Popular() {

  const[popular,setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, [])

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if(check) {
      setPopular(JSON.parse(check));
    }else{
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    const data = await api.json();
    localStorage.setItem("popular",JSON.stringify(data.recipes));
    console.log(data.recipes);
    setPopular(data.recipes);
      }
    
  }
  return (
    <Wrapper>
      <h3> Popular Picks</h3>
     
    <Splide
    options={{
      perPage: 4,
      arrows: false,
      paginate: false,
      drag: "free",
      gap: "5rem",
    }}>
    {popular.map(recipe => {
      
      return(
        <SplideSlide key={recipe.id}>
          <Card >
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

export const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

export const Card = styled.div`

  min-height: 25rem;
  border-radius: 2rem;
  overflow:hidden;
  position:relative;

  img{
    border-radius: 2rem;
    position:absolute;
    left:0px:
    width:100%;
    height:100%;
    object-fit:cover;
  }

  p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom: 0%;
    color:white;
    width:100%;
    transform: translate(-50%,0%);
    text-align:center;
    align-items:center;
    display:flex;
    font-size: 1rem;
    font-weight:600;
    height:40%;
    justify-content:center;


  }
`; 

export const Gradient = styled.div`
  z-index:3;
  position:absolute;
  width:100%;
  height:100%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;


export default Popular;