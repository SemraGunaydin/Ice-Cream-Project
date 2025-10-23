const Selector = ({selectedType, handleType}) => {
  return (
	<div>
		<p>Order Type</p>
		<div className="flex mt-3 gap-5 ">
			<button onClick={() => handleType("cornet")}
          className={`select-btn ${selectedType === "cornet" && "bg-white text-black"}`}>In a cornet</button>

			<button  onClick={() => handleType("cup")}
          className={`select-btn ${selectedType === "cup" && "bg-white text-black"}`}>In a cup</button>
		</div>
	</div>
  )
}

export default Selector;