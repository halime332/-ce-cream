//TDD
//Önce Test Sonra Bileşen

import { render ,screen} from "@testing-library/react";
import Modal from "../components/modal";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";
import CartInfo from "../components/modal/cart-info";
import CartItem from "../components/modal/cart-item";



//renderlarda hata vermemesi için useSelectorü mocklayacağız ve
//test içerisinde useSelector çağrılınca ne retun etmesi gerektiğini b.

jest.mock("react-redux",()=>({
    useSelector:jest.fn(),
}));

//cartInfo ve cartItem componentleri modal içerisinde kullanıldığı için
//ve useDispatch içerdiği için test hata veriyor şuan modal componentını
//ettiğim için bu componentleri modaldan soyutlamamız yani mocklamamız gerekiyor

jest.mock("../components/modal/cart-info" ,()=>()=>(
    <h1>Cart Info</h1>
));
jest.mock("../components/modal/cart-item",()=>()=>(
    <h1> Item</h1>
));


describe("Modal Component", ()=>{
    const closeMock=jest.fn();

    it("isOpen propuna göre modal ekrana basılır",()=>{
        //useSelector çağrıldığında sahte useSelector un store olarak ne döndürmesi gerektiğinis öylicez
        useSelector.mockReturnValue({cart:[]});
        //bileşeni renderla
       const {rerender} = render(<Modal isOpen={false} close={closeMock}/>);

        //modal ekranda yoktur
        expect(screen.queryByTestId("modal")).toBeNull();

        //isOpen true gönderip tekrar renderlayalım
        rerender(<Modal isOpen={true} close={closeMock}/>);
        //modal ekranda vardır
        screen.getByTestId("modal");
    });
    it("x butonuna tıklanınca close fonksiyonu çalışır", async()=>{
        //useSelector çağrıldığında sahte useSelector u store olarak ne döndürmesi gerektiğini söylecez
        useSelector.mockReturnValue({cart:[]});

        //useEvent kurulumu
        const user =userEvent.setup();
        //bileşeni renderla
        render(<Modal isOpen={true} close={closeMock}/>);

        // x butonunu al
        const closeBtn = screen.getByTestId("close");

        //butonuna tıkla
        await user.click(closeBtn);

        //closeMock fonksiyonu çalıştı mı
        expect(closeMock).toHaveBeenCalled();
    });

    it("Sepetin doluluk durumuna göre ekrana uyarı basılır",()=>{
        // use çağrılınca sepet dizisi boş return edilmeli
        useSelector.mockReturnValue({cart:[]});

        //bileşeni renderla
        const {rerender} =render(<Modal isOpen={true} close={closeMock}/>)

        //ekranda uyarı mesajı vardır
        screen.getByText(/henüz/i);

        // use çağrılınca sepet dizisi boş return edilmeli
        useSelector.mockReturnValue({cart:["selam"]});

        //bileşeni tekrar renderla (sepette dolu)
        rerender(<Modal isOpen={true} close={closeMock}/>)

        //ekrand auyarı mesajı yoktur
        expect(screen.queryByText(/henüz/i)).toBeNull();
    });
    it("sepet dolu ise her bir eleman için ekrana cart item basılır",()=>{
        //useSelector çağrılınca dolu dizi döndür
        const cartItems= [
            {id:1,name:"Ürün 1"},
             {id:2,name:"Ürün 2"},
        ];

        useSelector.mockReturnValue({cart:cartItems});

        //bileşeni renderla
        render(<Modal isOpen={true} close={closeMock}/>)

        //ekrandaki bütün  item componentlerini al
        const items =screen.getAllByRole("heading",{name:"Item"} );

        //items dizisinin uzunluğu 2 dir
        expect(items.length).toBe(2);

    });
});