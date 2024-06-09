import { useState } from "react";
import "./Fruits.css"
export default function Fruits({img,id,name,rating,price,quantity,isEmpty,handleBuy}) {
  function handleClick(){
    handleBuy(id)
  } 
  let classFriutcart=isEmpty?"fruit-card isempty":"fruit-card";
  let bgColor=isEmpty?"rgb(60, 60, 60)":"green";

  return (<>
    <div className={classFriutcart}>
      <img src={img} alt="img not found" className={isEmpty?"emp":""}></img>
      <div className="fc" id="fc1">
        <h1>{name}</h1>
        <h3 style={{color:"white",backgroundColor:bgColor,borderRadius:"15px",padding:"0.4rem"}} >{rating}</h3>
      </div>
      <div className="fc" id="fc2">
        <h3>Price : {price}/Kg</h3>
        <h3> {isEmpty?"Out of Stock":"Qnt(Kg) :"+quantity}</h3>
      </div>
      <button onClick={handleClick} disabled={isEmpty?true:false} className={isEmpty?"":"h"}>Buy</button>
    </div>
    </>
  );
}
