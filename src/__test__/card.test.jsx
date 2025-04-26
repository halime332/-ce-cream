import  { fireEvent, render ,screen}  from"@testing-library/react";
import Card from "../components/list/card";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";



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
        useDispatch.mockReturnValue(dispatchMock);
       
    });
    
    //her test sonrası bütün mockları sıfırla
    afterEach(()=>{
        jest.clearAllMocks();
    });

    it("item detaylarını doğru bir şekilde renderlar", () => {
        render(<Card item={mockItem}/>);
        
        screen.getByRole("heading", {name:"Bal Badem"});
        screen.getByText("₺25/top");
        expect(screen.getByRole("img")).toHaveAttribute("src", "/ice-1.png");
    });


    it("Tipin seçili olma durumuna göre sepete ekle butonunungörünürlüğü değişir",()=>{
        //card bileşenini renderla
        render(<Card item={mockItem}/>)

        //sepete ekle butonunu al
        const cartBtn = screen.getByRole("button", {name:/sepete/i});

        //sepete ekle butonu görünmezdir
        expect(cartBtn).toHaveClass("invisible");

        //külahta butonunu al
        const typeBtn = screen.getByRole("button", {name:/külahta/i});

        //külahta butonuna tıkla
        fireEvent.click(typeBtn);

        //sepete ekle butonu gözükür
        expect(cartBtn).not.toHaveClass("invisible");

    
       //külahta butonuna tıkla
       fireEvent.click(typeBtn);

       //sepete ekle butonu görünmezdir
       expect(cartBtn).toHaveClass("invisible");

    });


    it("Sepette ekle butonuna tıklanınca reducera haber verir",()=>{
          //bileşeni renderla
        render(<Card item={mockItem}/>);

        //bardakta seçeneğini seç
        const typeBtn =screen.getByRole("button",{name:/bardakta/i});
        fireEvent.click(typeBtn);

        //sepete ekle butonuna tıkla
        const cartBtn =screen.getByRole("button",{name:/sepete/i});
        fireEvent.click(cartBtn);
        
        //dispatch metodu doğru parametreler ile çalıştı mı
        expect(dispatchMock).toHaveBeenCalledWith(addToCart({item:mockItem, selectedType:"cup"}));

    });
        
});