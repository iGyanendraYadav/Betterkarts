import React from "react";
import Link from "next/link";
import Head from 'next/head'
import Script from "next/script";
//import { useRef } from "react";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const initiatePayment = async () => {
    let Oid = Math.floor(Math.random() * Date.now());
    const data = { cart, subTotal, Oid, email : "email" };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnToken = await a.json();
    console.log(txnToken)
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": Oid,
        "token": txnToken,
        "tokenType": "TXN_TOKEN",
        "amount": subTotal,
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called.")
          console.log("eventName=>", eventName)
          console.log("data=>", data)
        }
      }

    }
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
          console.log("error=>", error);
        })
}
return (
  <div className='checkout container px-2 sm:px-0 sm:m-auto'>
    <Head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  />
    <h1 className="text-2xl font-bold text-center my-4 ">Checkout</h1>
    <h2 className='font-semibold text-xl'>1. Delivery Address</h2>
    <div className="mx-auto flex my-2">
      <div className='px-2 w-1/2'>
        <div className=" mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className='px-2 w-1/2'>
        <div className=" mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
    </div>
    <div className='px-2 w-full'>
      <div className=" mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
      </div>
    </div>
    <div className="mx-auto flex my-2">
      <div className='px-2 w-1/2'>
        <div className=" mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
          <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className='px-2 w-1/2'>
        <div className=" mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
    </div>
    <div className="mx-auto flex my-2">
      <div className='px-2 w-1/2'>
        <div className=" mb-4">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
          <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className='px-2 w-1/2'>
        <div className=" mb-4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
          <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
    </div>
    <h2 className='font-semibold text-xl'>2. Review Cart Items</h2>
    <div

      className="sideCart   bg-pink-100 p-4 m-2 "
    >


      <ol className="list-decimal">
        {Object.keys(cart).length == 0 && (
          <div className="mt-2 font-semibold">No Items in Cart</div>
        )}
        {Object.keys(cart).map((k) => {
          return (
            <li key={k}>
              <div className="item flex my-5 font-semibold">
                <div className=" font-semibold">{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
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
                  <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-pink-500" />
                </div>
              </div>
            </li>
          );
        })}

      </ol>
      <span className="font-bold">SubTotal : ₹{subTotal}</span>

    </div>
    <div className="mx-4">
      <Link href={"/checkout"} ><button onClick={initiatePayment} className="flex mt-5 text-white bg-pink-500 border-0 py-2 px-2 mx-2 focus:outline-none hover:bg-pink-600 rounded text-sm items-center justify-center content-center ">
        <BsFillBagCheckFill className="mx-2" />
        Pay ₹{subTotal}
      </button></Link>
    </div>
  </div>
)
}


export default Checkout