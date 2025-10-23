import { render, screen, waitFor } from "@testing-library/react";
import List from "../components/list";
import api from "../utils/api";
import Card from "../components/card";
import { mockData } from "../utils/constants";




//api modulunu mockla
jest.mock("../utils/api");

//card bilesnini mockla
// suan basit bir title bassa da ilerde daha complex bir component olunca ve bundan dolayi list testlerini degistirmek istemiyorum
jest.mock("../components/card")

describe("List bileseni testleri", () => {
	// her testten sonra mock ayarlarini sifirla
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("api'den cevap gelmediyse ekrana Loader basilir", async () => {
		// bu testte api istegi atilinca bu cevap donsun
		api.get.mockResolvedValue({data: [] });

		//bileseni rebderle
		render(<List/>);

		// ekranda loader vardir
		screen.getByTestId("loader");

		//belirli bir surenin ardindan ekrandan loader gider
		await waitFor(() => {
			expect(screen.queryByTestId("loader")).toBeNull();
		});
 	});

	it("api'den hata cevabi gelirse ekrana Error basilir", async () =>{
		api.get.mockRejectedValue(new Error("hata oldu"));

		render(<List/>);

		await waitFor(() => screen.getByTestId("error"));
	});

	it("api'den basarili cevap gelince ekrana Card'lar basilir", async () => {
		// card'larin yerine basilacak icerigi belirle
		Card.mockImplementation(({item}) => <div>{item.name}</div>);

		// api istegi at
		api.get.mockResolvedValue({data : mockData });

		render(<List/>);

		// belirli bir surenin ardindan api.get'den donen dizideki her bir veri icin ekrana bir tane kart basilir
		await waitFor(() => {
			mockData.forEach((item) => {
				screen.getByText(item.name);
			});
		});
	});
})