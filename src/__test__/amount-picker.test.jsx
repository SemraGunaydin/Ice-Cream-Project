import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux"
import AmountPicker from "../components/modal/amount-picker";
import userEvent from "@testing-library/user-event";
import { addToCart, deleteFromCart } from "../redux/cartSlice";
import CartItem from "../components/modal/cart-item";


// useDispatch mock
jest.mock("react-redux", () => ({
	useDispatch:jest.fn(),
}));

const cartItem = {
  name: "Honey Almond",
  image: "/ice-1.png",
  price: 25,
  id: "263a",
  type: "cup",
  amount: 2,
};

describe("AmountPicker", () => {
	const mockDispatch = jest.fn();

	beforeEach(() => {
		useDispatch.mockReturnValue(mockDispatch);
	});

	afterEach(() => {
		jest.clearAllMocks();
	})


it("Bilesenleri item.amount degerini dogru sekilde render eder", () => {
	render(<AmountPicker item={cartItem}/>);
	screen.getByText(cartItem.amount);
});


it("- butonuna tiklaninca deleteFromCart aksiyonu calisir", async () => {
	const user = userEvent.setup();

	render(<AmountPicker item={cartItem}/>);

	const btn = screen.getByRole("button", {name: "-"});

	await user.click(btn);

	expect(mockDispatch).toHaveBeenCalledWith(deleteFromCart(cartItem));
});


it("+ butonuna tiklaninca addToCart aksiyonu calisir", async() => {
	const user = userEvent.setup();

	render(<AmountPicker item={cartItem}/>);

	const btn = screen.getByRole("button", {name: "+"});

	await user.click(btn);

	expect(mockDispatch).toHaveBeenCalledWith(addToCart({item: cartItem, selectedType:cartItem.type}));
});
});