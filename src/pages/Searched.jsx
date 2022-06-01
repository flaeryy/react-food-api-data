import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {
  Route,
  Routes,
  BrowserRouter,
  useParams,
  Link
} from "react-router-dom";


function Searched() {
  const [searchRecipes,setSearchRecipes] = useState([]);
  let params = useParams();


  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);

    const recipes = await data.json();
    setSearchRecipes(recipes.results);
  }


  useEffect(() => {
    getSearched(params.search);
  },[params.search])

  return (
    <Grid>

{searchRecipes.map((item) => {
        return(
          <Link to={'/recipe/' + item.id}>
          <Card key={item.id}> 
            <img src={item.image} alt = {item.title} />
            <h4> {item.title}</h4>
          </Card>
          </Link>
        )
      })}


    </Grid>
  )
}



const Grid = styled.div`
grid-gap: 3rem;
display: grid;
grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));

`;

const Card = styled.div`

img {
  width: 100%;
  border-radius: 5rem;
}

a {
  text-decoration: none;
}

h4{
  text-align: center;
  padding:1rem;
}

`;


export default Searched;