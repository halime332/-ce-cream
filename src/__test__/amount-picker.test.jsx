import { screen,render } from "@testing-library/react";
import AmountPicker from "../components/modal/amount-picker";
import  {mockItem}  from "../utils/constants";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import { addToCart, deleteFromCart } from "../redux/cartSlice";

//useDispatch mockla
jest.mock("react-redux",()=>({
    useDispatch:jest.fn(),
}));

describe("Amount Picker",()=>{
    //sahte bir dispatch metodu oluştur
    const dispatchMock=jest.fn()
    //useDispatch çağrıldığında sahte dispatchi döndürmesini istiycem
    beforeEach(()=>{
        useDispatch.mockReturnValue(dispatchMock);

        //her testten önce mocku sıfırla
        dispatchMock.mockClear();
    });
    test("miktar değeri gelen propa göre ekrana basılır",()=>{
        render(<AmountPicker item={mockItem}/>);
        screen.getByText("1");
    });

    test("- butonuna tıklanınca doğruu aksiyon tetiklenir",async()=>{
        const user = userEvent.setup();
        render(<AmountPicker item={mockItem}/>);
        const btn =screen.getByRole("button",{name:"-"});
        await user.click(btn)
        expect(dispatchMock).toHaveBeenCalledWith(deleteFromCart(mockItem));
    });


    test("+ butonuna tıklanınca doğru aksiyon tetiklenir",async()=>{
        const user = userEvent.setup();

        render(<AmountPicker item={mockItem}/>);

        const btn =screen.getByRole("button",{name:"+"});

        await user.click(btn);
        
        expect(dispatchMock).toHaveBeenCalledWith(
            addToCart({item:mockItem,selectedType:mockItem.type}));
    });
})