import CartItem from "../components/modal/cart-item";
import CartInfo from "../components/modal/cart-info";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import userEvent from "@testing-library/user-event";
import {mockCartData} from "../utils/constants";



// useSelector mock
jest.mock("react-redux", () => ({
	useSelector:jest.fn(),
}))

// cartInfo ve cartItem component'ları modal içerisinde kullanıldığı ve useDispatch/useNavigate içerbilceği için mockla
jest.mock("../components/modal/cart-item", () => ({item}) => <h1>{item.name}</h1>);


jest.mock("../components/modal/cart-info", () => () => <h1>Cart Item</h1>);

describe("Modal Component", () => {
	const closeMock = jest.fn();

it("isOpen propuna gore modal ekrana basilir", () => {
	//useSelector cagirilnca bunu return etsin
	useSelector.mockReturnValue({cart: []});

	// bilesen renderla(isOpen: false)
	const {rerender,queryByTestId,getByTestId} = render (<Modal isOpen={false} close={closeMock}/>);

	//modal ekranda yoktur
	expect(queryByTestId("modal")).toBeNull();

	// bileseni tekrar renderla(isOpen:true)
	rerender(<Modal isOpen={true} close={closeMock}/>);

	// modal ekranda vardir
	getByTestId("modal");
});


it("x butonuna tiklaninca close fonksiyonu calisir", async () => {
	// useEvent ti kur
	const user = userEvent.setup();

	//useSelector cagirilnca bunu return etsin
	useSelector.mockReturnValue({cart: []});

	// bilesen renderla
	render (<Modal isOpen={true} close={closeMock}/>);

	// x butonunu sec
	const closeBtn = screen.getByTestId("close");

	// x butonunu sec
	await user.click(closeBtn);

	// close fonksiyonu calisti mi
	expect(closeMock).toHaveBeenCalledTimes(1);

});


it("sepet doluluk durumuna gore ekrana uyari basilir", () => {
	//useSelector cagirilnca bunu return etsin
	useSelector.mockReturnValue({cart: [] });

	// bilesen renderla
	const {rerender} = render (<Modal isOpen={true} close={closeMock}/>);

	// ekranda uyari mesaji vardir
	screen.getByText(/product/i);

	// siradaki rerender da useSelecto cagrilnca dolu dizi return etsin
	useSelector.mockReturnValue({cart: mockCartData});

	// bileseni renderla
	rerender(<Modal isOpen={true} close={closeMock}/>);

	//ekranda uyari mesaji yoktur
	expect(screen.queryByText(/product/)).toBeNull();
});


it("sepet dolu ise her bir eleman icin ekrana kart basilir", () => {
	//useSelector cagirilnca bunu return etsin
	
	useSelector.mockReturnValue({cart: mockCartData});

	// bilesen renderla
	render (<Modal isOpen={true} close={closeMock}/>);

	// spetteki her bir veri icin ekranda kart var mi
	mockCartData.forEach((item) => screen.getByText(item.name));


});

});