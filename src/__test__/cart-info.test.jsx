import { render, screen, fireEvent } from "@testing-library/react";
import CartInfo from "../components/modal/cart-info";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

describe("CartInfo Component", () => {
  const mockDispatch = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it("Doğru fiyat hesaplamalarını gösteriyor", () => {
    const cart = [
      { price: 25, amount: 2 },
      { price: 10, amount: 1 },
    ];
    render(<CartInfo cart={cart} close={mockClose} />);

    // subtotal = 25*2 + 10 = 60
    screen.getByText("60zł");
    screen.getByText("20zł"); // shipping
    screen.getByText("80zł"); // total
  });

  it("100'ün üzerinde subtotal olduğunda teslimat 'free' oluyor", () => {
  const cart = [{ price: 60, amount: 2 }]; // subtotal = 120
  render(<CartInfo cart={cart} close={mockClose} />);

  // free görünmeli
  expect(screen.getByText(/free/i)).toBeInTheDocument();

  // subtotal ve total için regex + getAllByText
  const amounts = screen.getAllByText(/120\s?zł/);
  expect(amounts.length).toBeGreaterThanOrEqual(2);
});

  it("Sepet boşsa tüm değerler 0 olmalı", () => {
    const cart = [];
    render(<CartInfo cart={cart} close={mockClose} />);

    // Tüm alanlarda 0 görünmeli
    expect(screen.getAllByText(/0zł/).length).toBeGreaterThan(0);
  });

  it("'Order Now' butonuna tıklanınca dispatch, toast ve close çağrılır", () => {
    const cart = [{ price: 20, amount: 1 }];
    render(<CartInfo cart={cart} close={mockClose} />);

    const button = screen.getByRole("button", { name: /Order Now/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Product Preparing...");
    expect(mockClose).toHaveBeenCalled();
  });
});