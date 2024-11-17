import React, { useContext, useState } from 'react'
import CartProduct from "../../../components/menu/"
function OrderPage() {
    const [loaingOrder, setLoadingOrder] = useState(true)
    const[order,setOrder] = useState();
    const {clearCart} = useContext(CartContext);
  return (
    <section className='max-w-2xl mx-auto mt-8'>
        <div className='text-center'>
        <div className='mt-4 mb-8'>
<p>Thanks for your order</p>
<p>We will call you when order will be on the way</p>
        </div>
        </div>
{}

    </section>
  )
}

export default OrderPage