import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
const [cart, setCart] = useState({})
const [subTotal, setSubTotal] = useState(0)
const [user, setUser] = useState({value : null})
const [key, setKey] = useState()
const [progress, setProgress] = useState(0)
const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
 
    try {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
     
    } catch (error) {
      console.error(error);
      localStorage.clear;
    }
    const token = localStorage.getItem('token')
    if(token){
      setUser({value : token})
      setKey(Math.random())
    }
    
  }, [router.query])

  const logout = ()=>{
    localStorage.removeItem("token")
    setUser({value: null})
    setKey(Math.random())
    router.push("/")
  }
  
  const saveCart = (myCart)=>{
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart)
    for(let i=0; i<keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }
  const addToCart = (itemCode, qty, price, name, size, variant) =>{
    let newcart = cart;
    if(itemCode in cart){
      newcart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newcart[itemCode] = { qty:1, price, name, size, variant }
    }
    setCart(newcart)
    saveCart(newcart)
  }
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }

  const buyNow = (itemCode, qty, price, name, size, variant)=>{
    let newcart = {itemCode : { qty:1, price, name, size, variant }}
    setCart(newcart)
    saveCart(newcart)
    router.push('/checkout');
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) =>{
    let newcart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
      newcart[itemCode].qty = cart[itemCode].qty - qty
    }
  if(newcart[itemCode]["qty"] <= 0){
    delete newcart[itemCode]
  }
    setCart(newcart)
    saveCart(newcart)
  }
  return <>
          <LoadingBar
            color='#ec4899'
            progress={progress}
            waitingTime={500}
            onLoaderFinished={() => setProgress(0)} />
          { key && <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/> }
          <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
          <Footer/>
        </>
}

export default MyApp
