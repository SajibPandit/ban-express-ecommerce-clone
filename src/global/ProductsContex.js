import React,{createContext,useState} from 'react'
import orange from '../assets/cat-4.jpg'
import milk from '../assets/cat-2.jpg'
import fruits from '../assets/cat-3.jpg'
import meat from '../assets/cat-5.jpg'
import chiken from '../assets/lp-3.jpg'
import burger from '../assets/feature-6.jpg'
import strawberry from '../assets/details-pic.jpg'

export const ProductsContext = createContext()

export const ProductsContextProvider = (props) => {
    const[products] = useState([
        {
            id:1,
            name:'Orange',
            price:300,
            image:orange,
            status: 'hot'
        },
        {
            id:2,
            name:'Milk',
            price:100,
            image:milk,
            status: 'new'
        },
        {
            id:3,
            name:'Fruits',
            price:700,
            image:fruits,
            status: 'hot'
        },
        {
            id:4,
            name:'Meat',
            price:500,
            image:meat,
            status: 'new'
        },
        {
            id:5,
            name:'Chiken',
            price:300,
            image:chiken,
            status: 'hot'
        },
        {
            id:6,
            name:'Burger',
            price:170,
            image:burger,
            status: 'hot'
        },
        {
            id:7,
            name:'Strawberry',
            price:270,
            image:strawberry,
            status: 'new'
        }
        ,
        {
            id:8,
            name:'Beaf',
            price:210,
            image:meat,
            status: 'hot'
        }
    ])
    return ( 
        <ProductsContext.Provider value={{products:[...products]}}>
            {props.children}
        </ProductsContext.Provider>
     );
}