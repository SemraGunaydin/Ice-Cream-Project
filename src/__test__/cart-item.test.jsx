import { render, screen } from "@testing-library/react";
import CartItem from "../components/modal/cart-item";
import AmountPicker from "../components/modal/amount-picker";

jest.mock("../components/modal/amount-picker", () => () => <h1>Picker</h1>);

const cupItem = {
  name: "Honey Almond",
  image: "/ice-1.png",
  price: 25,
  id: "263a",
  type: "cup",
  amount: 2,
};

const cornetItem = {
	 name: "Çikolata Fırtınası", 
	 image: "/ice-2.png", 
	 price: 20, 
	 id: "9a15", 
	 type: "cornet", 
	 amount: 3, };

it("item type 'cup' olduğunda doğru render ediliyor", () => {
  render(<CartItem item={cupItem} />);

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", cupItem.image);

  // Büyük harf dikkat!
  screen.getByText("Cup");

  // Para birimi dikkat!
  screen.getByText(`${cupItem.price * cupItem.amount}zł`);
});

it("item type 'cornet' oldugundan dogru render ediliyor", () => {
	render(<CartItem item={cornetItem} />);

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", cornetItem.image);

  // Büyük harf dikkat!
  screen.getByText("Cornet");

  // Para birimi dikkat!
  screen.getByText(`${cornetItem.price * cornetItem.amount}zł`);
	
});