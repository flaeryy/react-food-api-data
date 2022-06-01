import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Search() {

const [input,setInput] = useState("");
const navigate = useNavigate();

const submitHandler = (e) => {
    e.preventDefault();
    setInput("");

    navigate('/searched/' + input);
}
  return (
     <FormStyled onSubmit={submitHandler}>
         <FaSearch></FaSearch>
         <input 
           type="text" 
           onChange={(e) => setInput(e.target.value)}
           value={input}
         />
     </FormStyled>
  )
}

const FormStyled = styled.form`
 margin: 0rem 20rem;
 position:relative;


 input{
     border:none;
     background: linear-gradient(35deg, #494949,#313131);
     font-size: 1.5rem;
     padding: 1rem 3rem;
     border:none;
     border-radius: 1rem;
     outline:none;
     width: 100%;
     color:white;
 }

 svg{
     position: absolute;
     top:50%;
     left:0%;
     transform:translate(100%,-50%);
     color:white;
 }
`;

export default Search