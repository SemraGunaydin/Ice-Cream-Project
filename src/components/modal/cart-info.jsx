import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const CartInfo = ({cart, close}) => {
	const dispatch =useDispatch();


	const subTotal = cart.reduce((total, item) => total + item.price*item.amount, 0);
	const shipping = subTotal >= 100 || subTotal === 0 ? 0 : 20;
	const total = subTotal + shipping;

	const handleClick =() =>{
		close();
		dispatch(clearCart());
		toast.success("Product Preparing...");
	}


  return (
	<div className="fs-5 py-5 text-lg">
		<p className="flex justify-between">
			<span className="text-gray-500 font-semibold">Product Value</span>
			<span className="text-gray-700 font-semibold">{subTotal}zł</span>
		</p>

		<p className="flex justify-between py-2">
			<span className="text-gray-500 font-semibold">Delivery Value</span>
			<span className="text-gray-700 font-semibold">{subTotal >= 100 ? "free" : `${shipping}zł`}</span>
		</p>

		<p className="flex justify-between">
			<span className="text-gray-500 font-semibold">Total Payment</span>
			<span className="text-gray-700 font-semibold text-2xl">{total}zł</span>
		</p>

		<button 
		onClick={handleClick}
		className="bg-red-500 mt-4 w-full p-2 rounded-md text-white hover:bg-red-600 transition disabled:bg-red-300">Order Now</button>
	</div>
  )
}

export default CartInfo