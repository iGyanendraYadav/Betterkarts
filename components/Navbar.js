import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)


  {
    /* 
const toggleCart = ()=>{
  if (ref.current.classList.contains("translate-x-full")){
    ref.current.classList.remove("translate-x-full")
    ref.current.classList.add("translate-x-0")
  }
  else if (!ref.current.classList.contains("translate-x-full")){
    ref.current.classList.remove("translate-x-0")
    ref.current.classList.add("translate-x-full")
  }
}
*/
  }

  {
    /* Adding className="hidden" if "translate-x-full" is not in classList */
  }

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.remove("hidden");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
      ref.current.classList.add("hidden");
    }
  };

  const ref = useRef();
  return (
    <div className=" py-3 shadow-md flex flex-col md:flex-row justify-between items-center md:justify-start sticky top-0 z-10 bg-white text-black">
      <div className="logo mr-auto  md:mx-5 z-10">
        <Link href={"/"}>
          <a>
            <Image
              src="/better new 400x100.png"
              alt=""
              width={200}
              height={50}
            />
          </a>
        </Link>
      </div>
      <div className="nav z-20">
        <ul className="flex items-center space-x-5 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <a>
              <li className=" hover:text-pink-600">T-shirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li className=" hover:text-pink-600">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li className=" hover:text-pink-600">Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li className=" hover:text-pink-600">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div
        
        className="cart cursor-pointer items-center absolute right-0 top-4 mx-5 flex z-30"
      >  
      <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
      { dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 top-6 px-5 w-32 shadow-lg border rounded-md bg-white">
        <ul>
          <Link href={"/myaccount"}><a><li className="py-1 text-sm font-bold hover:text-pink-700">My Account</li></a></Link>
          <Link href={"/orders"}><a><li className="py-1 text-sm font-bold hover:text-pink-700">Orders</li></a></Link>
          <li onClick={logout} className="py-1 text-sm font-bold hover:text-pink-700">Logout</li>
        </ul>
      </div>}
      { user.value && <MdAccountCircle  className="text-xl md:text-3xl hover:text-pink-600"/>}
      </span>
      { !user.value && <Link href={'/login'}><a>
        <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2" type="submit">Login</button>
        </a></Link> }
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-3xl hover:text-pink-600" />
      </div>


      <div
        ref={ref}
        className={`sideCart  w-72 absolute  top-0 right-0 rounded-xl shadow-pink-300 p-10 bg-pink-100 z-40 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <h2 className="text-xl font-bold text-cenkter ">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="mt-2 font-semibold">No Items in Cart</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5 font-semibold">
                  <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant )}} className="cursor-pointer text-pink-500" />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">SubTotal : ₹{subTotal}</div>
        <div className="flex flex-row">
          <Link href={'/checkout'}><button className="flex mt-5 text-white bg-pink-500 border-0 py-2 px-2 mx-2 focus:outline-none hover:bg-pink-600 rounded text-sm items-center justify-center content-center ">
            <BsFillBagCheckFill className="mx-2" />
            Checkout
          </button></Link>
          <button
            onClick={clearCart}
            className="flex mt-5 text-white bg-pink-500 border-0 px-8 mx-2 focus:outline-none hover:bg-pink-600 rounded text-sm justify-center "
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
