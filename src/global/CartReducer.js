import izitoast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'
export const CartReducer = (state,action) =>{
    const {shoppingCart,totalPrice,qty} = state
    let product,index,updatedPrice,updatedQty;
    console.log(shoppingCart)
    switch(action.type){
        case 'ADD_TO_CART':
            const check = shoppingCart.find(product =>product.id === action.id)
            if(check){
                izitoast.error({
                    title: 'Failed',
                    message: 'Item Already Exists in The Cart!'
                });
                return state
            }else{
                product = action.product
                product['qty'] = 1
                updatedQty = qty + 1
                updatedPrice = totalPrice + product.price
                izitoast.success({
                    title: 'Ok',
                    message: `${product.name} Successfully Added to The Cart!`
                });
                return{
                    shoppingCart:[product,...shoppingCart],totalPrice:updatedPrice,qty:updatedQty
                } 
            }

        case 'INC':
            product = action.cart
            product.qty = product.qty + 1
            updatedPrice = totalPrice + product.price
            updatedQty = qty + 1
            index = shoppingCart.findIndex(cart => cart.id === action.id)
            shoppingCart[index] = product
            return{
                shoppingCart:[...shoppingCart],totalPrice:updatedPrice,qty:updatedQty
            }

        case'DEC':
            product = action.cart
            if(product.qty>1){
                product.qty = product.qty - 1
                updatedPrice = totalPrice - product.price
                updatedQty = qty - 1
                index = shoppingCart.findIndex(cart => cart.id === action.id)
                shoppingCart[index] = product
                return{
                    shoppingCart:[...shoppingCart],totalPrice:updatedPrice,qty:updatedQty
                }
            }else{
                return state
            }

        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.id !== action.id)
                product = action.cart
                updatedQty = qty - product.qty
                updatedPrice = totalPrice - product.price * product.qty
                izitoast.success({
                    title: 'Ok',
                    message: `${product.name} Successfully Deleted From The Cart!`
                });
                return{
                    shoppingCart:[...filtered],totalPrice:updatedPrice,qty:updatedQty
                }
        case 'EMPTY':
            return{
                shoppingCart:[],totalPrice:0,qty:0
            }

        default: return state
    }
}