import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
import {CartContext} from '../global/CartContex'

const Navbar = () => {
    const {qty} = useContext(CartContext)
    return ( 
        <nav>
            <ul className="left">
                <li><Link to="/">BanExpress</Link></li>
            </ul>
            <ul className="right">
                <li>
                    <Link to="/cart">
                        <span className="shoppingCart"><i className="fas fa-cart-plus"></i></span><span className="cartCount">{qty}</span>
                    </Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;