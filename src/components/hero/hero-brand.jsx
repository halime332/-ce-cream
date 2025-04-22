import React from 'react';


const HeroBrand = () => {
  return (
    <div>
        <div className='max-w-[660px] flex flex-col gap-[25px]'>
            <h1 className='fs-1 font-semibold'>Karadutlu Dondurma</h1>

            <p className='text-white /75 font-medium fs-5'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Sed delectus provident magnam, modi voluptatem veritatis 
                omnis accusantium, sapiente temporibus ipsum quia nihil
                consectetur tenetur excepturi. Autem mollitia minus minima
                ratione.
            </p>

            <div className='flex gap-[40px]'>
                <button className='hero-btn'>Şipariş Et</button>
                <button className='hero-btn bg-white/15 border-0'>Rezervasyon</button>
            </div>
       </div>
    </div>
  )
};

export default HeroBrand;