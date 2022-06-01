import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {
  Route,
  Routes,
  BrowserRouter,
  useParams
} from "react-router-dom";

function Recipe() {
const [details,setDetails] = useState({});
const [active, setActive] = useState("instructions");
let params = useParams();

const fetchDetails = async () => {
   
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
    

}


useEffect(() => {
    fetchDetails();
  }, [params.name])

  return (
    <DetailsWrapper>

      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
      </div>

      <Info>

        <Proba>
        <Button className={active=== "instructions" ? "active": ""} 
             onClick={ () => setActive('instructions')}> 
             Instructions
             </Button>
        <Button className={active=== "ingredients" ? "active": ""}
        onClick={ () =>  setActive('ingredients')}>
           Ingredients
           </Button>
           </Proba>

          {active === 'instructions' && (
            <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>

          )}

          {active === 'ingredients' && (
          <div>
             {console.log(details)}
             <ul>
                {details.extendedIngredients.map( (ingredients) => (

                  <li key={ingredients.id}>
                    {ingredients.original}
                  </li>

                )

                )}
             </ul>
        </div>

          )}

          
       



      </Info>

  
    </DetailsWrapper>
  )
}



 const DetailsWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display:flex;
  .active {
    background: black;
    color:white;
  }

  h2{
    margin-bottom: 2rem;

  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
    
  }

  ul{
    margin-top: 2rem;
  }
`;


const Button = styled.div`
  padding: 1rem 2rem;
  color:gray;
  background:white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  text-align:center;
  justify-content:center;
  display:block;
 
`;


const Info = styled.div`
margin-left: 10rem;
height: 20px;
text-align:center;
justify-content:center;

  
`;

const Proba = styled.div`
display:flex;
margin-left: 10rem;
height: 20px;
text-align:center;
justify-content:center;

  
`;




export default Recipe