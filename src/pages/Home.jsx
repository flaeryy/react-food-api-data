import React, { useEffect, useState } from 'react';
import Popular from '../components/Popular'
import Veggie from '../components/Veggie'

function Home() {
  useEffect( () => {
    console.log('home');
  })
  return (
    <div>
        <Veggie />
        <Popular />
      
    </div>
  )
}

export default Home;