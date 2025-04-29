import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder } from '../../redux/cartSlice';

const CartInfo = ({cart,close}) => {
  const subTotal =cart.reduce((acc,item)=> acc + item.price*item.amount,0);

  const shipping= subTotal > 0 ? 20 : 0 ;
  const total=subTotal +shipping;
  
  const dispatch=useDispatch();

  //butona tıklanınca
  const handleClick= ()=>{
    // reducer a haber  gönderdim 
    dispatch(createOrder());
     //bildirim gönder
    toast.success("Ürünler hazırlanıyor...");
     //modal ı kapat
    close();
  };

  return (
    <div className='fs-5 py-5 text-lg'>
      <p className='flex justify-between'>
        <span className='text-gray-500 font-semibold'>Ara Toplam</span>
        <span className='font-semibold text-gray-700'>{subTotal}</span>
      </p>
      <p className='flex justify-between py-2'>
        <span className='text-gray-500 font-semibold'>Kargo</span>
        <span className='font-semibold text-gray-700'>{shipping}</span>
      </p>
      <p className='flex justify-between '>
        <span className='text-gray-500 font-semibold'>Toplam</span>
        <span className='font-semibold text-gray-700 text-2xl'>{total}</span>
      </p>
      <button disabled={subTotal===0} onClick={handleClick} className='bg-red-500 mt-4 w-full p-2 rounded-md 
      text-white hover:bg-red-600 transition'>Sipariş Ver</button>
    </div>
  )
};

export default CartInfo;
