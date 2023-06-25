import React,{useContext} from 'react';
import {CartContext} from '../global/CartContex'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import izitoast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Cart = (props) => {
    const {shoppingCart,totalPrice,qty,dispatch} = useContext(CartContext)
    const handleToken = async(token)=>{
        const product = {name:'All Products',price:totalPrice}
        const response = await axios.post('http://localhost:8000/checkout',{
            product,token
        })
        console.log(response)
        const {status} = response.data
        console.log(status)
        if(status === 'success'){
            dispatch({type:'EMPTY'})
            props.history.push('/')
            izitoast.success({
                title: 'Success',
                message: 'You Have Paid Successfully!',
                position:'bottomRight'
            });
            // toast.success(
            //     'You Have Paid Successfully!',{position:toast.POSITION.BOTTOM_RIGHT}
            // )
        }
    }
    return ( 
        <div className="cart-container">
            <div className="cart-details" style={{marginTop:'100px'}}>
                {shoppingCart.length > 0 ?
                    shoppingCart.map(cart => (
                        <div className="cart" key={cart.id}>
                            <span className="cart-image">
                                <img src={cart.image} alt="not found"/>
                            </span>
                                <span className="cart-product-name">{cart.name}</span>
                                <span className="cart-product-price">${cart.price}</span>
                                <span onClick={()=>dispatch({type:'INC',id:cart.id,cart})} className="inc">
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span className="product-qty">
                                    {cart.qty}
                                </span>
                                <span onClick={()=>dispatch({type:'DEC',id:cart.id,cart})} className="dec">
                                    <i className="fas fa-minus"></i>
                                </span>
                                <span className="product-total-price">${cart.price*cart.qty}.00</span>
                                <span onClick={()=>dispatch({type:'DELETE',id:cart.id,cart})} className='delete-product'><i className="fas fa-trash-alt"></i></span>
                        </div>
                    ))
                 :<h1 style={{textAlign:'center'}}>Sorry.Your Cart is Currently Empty!</h1>}
            </div>
            {shoppingCart.length > 0 ? 
            <div className="cart-summary">
                <div className="summery">
                    <h3>Cart Summary</h3>
                    <div className="total-items">
                        <div className="items">
                            Total Items
                        </div>
                        <div className="items-count">
                            {qty}
                        </div>
                    </div>
                    <div className="total-price-section">
                        <div className="just-title">Total Price</div>
                        <div className="item-price">${totalPrice}.00</div>
                    </div>
                    <div className="stripe-section">
                        <StripeCheckout 
                            stripeKey="pk_test_51IInAvADndIDpsFDflrdyx912U2fammYk9dNQANDtp1GviPsKtrYL0KrnTRRsZ0Fm7IMj5pTaOJqFAG0ftEnA0jH00D4gFOIag"
                            token = {handleToken}
                            billingAddress
                            shippingAddress
                            ammount = {totalPrice*100}
                            name="All Products"
                        >

                        </StripeCheckout>
                    </div>
                </div>
            </div>:''} 
        </div>
     );
}

export default Cart;