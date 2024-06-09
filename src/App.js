import { useState } from "react"
import "./App.css"
import Fruits from "./Fruits"
import fruits from "./data.js"

export default function App(){
  const [tempname,setName]= useState('')
  const [tempquantity,setQuantity]= useState('');
  const [tempdata,setData]=useState(fruits)
  const [tempid,setID]=useState(0)
  const [prev,setPrev]=useState(0)
  const [prd,setPrd]=useState({
    img:"",
    name:"",
    price:"",
    rating:"4*",
    isEmpty:false,
    quantityInKg:""
  })

function handleBuy(id){
  const prd = tempdata.find(p=>p.id===id)
  setPrev(prd.quantityInKg)
  setID(prd.id)
  setName(prd.name)
}
function handleChange(e){
  setQuantity(e.target.value)
}
function handleSubmit(e){
  e.preventDefault();
  if(tempname===''){
    alert("please choose fruit by clicking on Buy button of perticular fruit ")
    setName('')
    setQuantity('')
    return;
  }
  if(isNaN(tempquantity)){
  alert("Your entered quantity is not a number");
  }
  else if(tempquantity>prev){
    alert("Your order is not placed because that much quantity is not avalable");
  }
  else if(Number(prev-tempquantity)===0){
    setData(tempdata.map(p=>p.id===tempid?{...p,quantityInKg:Number(prev-tempquantity),isEmpty:true}:p))
    alert(`your order placed for ${tempquantity}kg of ${tempname}`)
    console.log(tempdata)
  }
  else{
    setData(tempdata.map(p=>p.id===tempid?{...p,quantityInKg:Number(prev-tempquantity)}:p))
    alert(`your order placed for ${tempquantity}kg of ${tempname}`)
  }
setName('')
setQuantity('')
setID(0)
setPrev(0)
}

function handleAddChange(e){
  setPrd({...prd,
    [e.target.title]:e.target.value
  })
}
function handleAdd(){
  if(isNaN(prd.price) || isNaN(prd.quantityInKg))
    {
      alert("type value differ")
      }
      const added=tempdata.find(p=>p.name===prd.name);
      if(added){
      const qnt=added.quantityInKg;
        setData(tempdata.map(p=>p.name===prd.name?{...p,price:prd.price,quantityInKg:Number(qnt)+Number(prd.quantityInKg),isEmpty:false}:p))
      }
    else {
      const adddata=[...tempdata]
      adddata.push({...prd,id:tempdata.length+1})
      setData(adddata)
    }
    setPrd({
      img:"",
      name:"",
      price:"",
      rating:"4*",
      isEmpty:false,
      quantityInKg:""
    })
}
return (
<div className="App">
  <div className="Navbar">
    <img src="/images/fruits.jpg" alt="img not found" style={{width:"3.5rem",height:"3.5rem"}}></img>
    <ul>
      <li> Home </li>
      <li> About </li>
      <li> FruitStudy</li>
      <li> Healthy Tips</li>
    </ul>
  </div>
  <form style={{display:"flex",padding:"2rem",gap:"1rem",fontSize:"1.5rem",alignItems:"center"}} onSubmit={(e)=>handleSubmit(e)} className="AddFruit">
    <label style={{fontWeight:"bold"}}>Name</label>
    <input type="text" onChange={handleChange} title="name" value={tempname} placeholder="name" style={{height:"2rem",fontSize:"1.2rem"}} disabled></input>
    <label>quantity</label>
    <input type="text" onChange={handleChange} value={tempquantity} title="quantity" placeholder="quantity(kg)" style={{height:"2rem",fontSize:"1.2rem"}}></input>
    <button className="app-btn">Buy Quantity</button>
  </form>
   <div  className="Fruits">
    {tempdata.map((f)=>(
       <Fruits img={f.img}
        id={f.id}
        name={f.name}
        rating={f.rating}
        price={f.price}
        quantity={f.quantityInKg}
        isEmpty={f.isEmpty}
        handleBuy={handleBuy}
       ></Fruits>
    ))}
  
   </div>
<div className="AddFruit">
  <label style={{paddingLeft:"42rem",fontSize:"2rem",marginTop:"2rem"}}>Enter detail</label>
  <form className="Addfrom">
    <div>
  <label className="add">Imageurl : </label>
  <input className="add" value={prd.img} title="img" onChange={handleAddChange}></input>
      </div>    
    <div>
  <label className="add">name     : </label>
  <input className="add" value={prd.name} title="name" onChange={handleAddChange}></input>
      
      </div>    
    <div>
      
  <label className="add">Price : </label>
  <input className="add" value={prd.price} title="price" onChange={handleAddChange}></input>
      </div>    
    <div>
  <label className="add">Quantity : </label>
  <input className="add" value={prd.quantityInKg} title="quantityInKg" onChange={handleAddChange}></input>
      
      </div>    
  </form>
 <div style={{margin:"auto",textAlign:"center"}}>
<button style={{padding:"1rem",marginBottom:"1rem",fontSize:"1.2rem",borderRadius:"10px",width:"fit-content"}} className="app-btn" onClick={handleAdd}>
Add Fruits
</button>
  </div>
</div>
</div>

)

}