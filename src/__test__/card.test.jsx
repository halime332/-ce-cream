import  { render ,screen}  from"@testing-library/react";
import Card from "../components/list/card";
import { useDispatch } from "react-redux";


//useDispachi mockla
jest.mock("react-redux", ()=>({
    useDispatch:jest.fn(),
}));

describe("Card bileşeni testleri", ()=>{
    //useDispatch in döndürdüğü dispatch metodunu mockluyorum
    const dispatchMock =jest.fn();

    const mockItem={
        name: "Bal Badem",
        image: "/ice-1.png",
        price: 25,
        id: "cb8a",
    };


    //her test öncesinde sahte useDispatch çağrılınca sahte dispatch return edilsin diyoruz
    beforeEach(()=>{
        useDispatch.mockReturnValueOnce(dispatchMock);
        dispatchMock.mockClear();
    });
    


    it("item detaylarını doğru bir şekilde renderlar", () => {
        render(<Card item={mockItem}/>);
        
        screen.getByRole("heading", {name:"Bal Badem"});
        screen.getByText("₺25 / top");
        expect(screen.getByRole("img")).toHaveAttribute("src", "/ice-1.png");
    });


    it("Tipinseçili olma durumuna göre sepete ekle butonunungörünürlüğü değişir",()=>{});


    it("Sepette ekle butonuna tıklanınca reduceera haber verir",()=>{});
        
});