import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {ProductsContextProvider} from './global/ProductsContex'
import {CartContextProvider} from './global/CartContex'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

function App() {

  return (
    <div className="App">
      <ProductsContextProvider>
        <CartContextProvider>
          <Router>
          <Navbar/>
            <Switch>
              <Route path="/" exact component={Products} />
              <Route path="/cart" component={Cart} />
              <Route component={NotFound}/>
            </Switch>
            
          </Router>
          {/* <Footer/> */}
        </CartContextProvider>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
