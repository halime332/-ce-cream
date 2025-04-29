import React from 'react';
import Hero from '../../components/hero';
import List from '../../components/list';
import CartButton from '../../components/buttons/cart-button';
import TrendButton from '../../components/buttons/trend-button';


const Home = () => {
  return (
    <div>
     <Hero/>
     
           
     <CartButton/>
     <TrendButton/>
    
      <List/>
    </div>
  );
};

export default Home;