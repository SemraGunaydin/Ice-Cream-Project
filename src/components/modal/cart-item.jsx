import AmountPicker from "./amount-picker"

const CartItem = ({item}) => {

  console.log(item);
  
  return (
	<div className="flex justify-between items-center border-b py-5">
    <div className="flex items-center gap-1">
      <img src={item.image} className="w-[80px] md:w-[100px]" />

      <div>
        <h1 className="font-semibold text-lg md:text-xl">{item.name}</h1>
        <p>{item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "Unknown"}</p>
      </div>  
    </div>

    <div className="flex items-center gap-3">
      <AmountPicker item={item}/>

      <p className="text-lg md:text-xl text-end min-w-[70px] font-semibold text-gray-500">{item.price * item.amount}zł</p>
    </div>
  </div>
  )
}

export default CartItem;