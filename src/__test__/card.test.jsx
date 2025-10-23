import { render,screen, waitFor } from "@testing-library/react";
import Card from "../components/card";
import { useDispatch } from "react-redux";
import {mockData} from "../utils/constants";
import userEvent from "@testing-library/user-event";
import { addToCart } from "../redux/cartSlice";

jest.mock("react-redux", () => ({
	useDispatch: jest.fn(),
}));

describe("Card Testleri", () => {
	//useDispatch'in dondurdugu dispatch methodunu mockla
	const dispatchMock = jest.fn();

	// useDispatch her cagrildiginda sahte dispatch methodunu return etsin
	beforeEach(() => {
		useDispatch.mockReturnValue(dispatchMock);
	});

	// her testten sonra mock'u resetle
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("item propuna gore veriler ekrana basiliyor mu", () => {
	render(<Card item={mockData[0]}/>);

	// baslik ve fiyat ekrana geliyor mu
	screen.getByText(mockData[0].name);
	screen.getByText(`zł${mockData[0].price} / scoop`);

	// resmin kaynagi dogru mu
	const img = screen.getByAltText(mockData[0].name);
	expect(img).toHaveAttribute("src", mockData[0].image);
  });

	it("tipin secili olma durumuna gore buton gorunurlugu degisir", async () => {
	//userEvent kurulumu
	const user = userEvent.setup();

	//card bilesenini renderla
	render(<Card item={mockData[0]}/>);

	// sepete ekle butonunu ekrandan al
	const basketBtn = screen.getByRole("button", {name: /add to basket/i});

	// sepete ekle butonu gorunmezdir
	expect(basketBtn).toHaveClass("invisible");

	//kulahta butonunu al
	const cornetBtn = screen.getByRole("button", {name: /in a cornet/i});

	// kulahta butonuna tikla 
	await user.click(cornetBtn);

	// sepete ekle butonu gorunurdur
	expect(basketBtn).not.toHaveClass("invisible");

	// kulahta butonuna tikla 
	await user.click(cornetBtn);

	// sepete ekle butonu gorunmezdir
	expect(basketBtn).toHaveClass("invisible");
	});
  		

	it("sepete ekle butonuna tiklaninca aksiyon dispatch edilir", async () => {
		// userEventi kur
    const user = userEvent.setup();

	//card bilesenini renderla
	render(<Card item={mockData[0]}/>);

	// kuahta butonunu al ve tikla
	const cornetBtn = screen.getByRole("button", {name: /cornet/i});
	await user.click(cornetBtn);

	// sepete ekle butonunu al ve tikla
	const basketBtn = screen.getByRole("button", {name: /basket/i});
	await user.click(basketBtn);

	//dispatch'in cagrildigini dogrula
	expect(dispatchMock).toHaveBeenCalledTimes(1);

	// dogru aksiyon ve payload ile cagrildigini dogrula
	expect(dispatchMock).toHaveBeenCalledWith(
		addToCart({
			item:mockData[0],
			selectedType:"cornet",
		})
	);
	});
});