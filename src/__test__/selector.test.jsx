import { render ,screen} from "react-dom";
import Selector from "../components/list/selector";
import userEvent from "@testing-library/user-event";


describe("Selector bileşeni",()=>{
    const mockFn =jest.fn();


    afterEach(()=>{
       jest.clearAllMocks();
    });
       
    it("Cornet seçilince butonun arkaplanı değişir",()=>{
        render(<Selector selectedType="cornet" handleType={mockFn}/>);
        
        //cornet butonunda seçili elemanın classı vardır
        const cornetBtn =screen.getByRole("button", {name:/külahta/i});

        expect(cornetBtn).toHaveClass("bg-white");

        //cup butonunda seçili elemanın classı yoktur
        const cupBtn =screen.getByRole("button", {name:/bardakta/i});
        expect(cupBtn).not.toHaveClass("bg-white");
    });

        
    it("Cup seçilince butonun arkaplanı değişir",()=>{
        render(<Selector selectedType="cup" handleType={mockFn}/>);

        //cup butonunda seçili elemanın classı vardır
        const cupBtn =screen.getByRole("button", {name:/bardakta/i});

        expect(cupBtn).toHaveClass("bg-white");

        //cornet butonunda seçili elemanın clası yoktur
        const cornetBtn =screen.getByRole("button", {name:/külahta/i});

        expect(cornetBtn).not.toHaveClass("bg-white");
    });

    it("Bunlara tıklanınca fonksiyon doğru parametrelerle çalışır", async()=>{

        //useEvent kurulumu yap
         const user = userEvent.setup();

        render(<Selector selectedType="cup" handleType={mockFn}/>);
        //butonları al
        
       const cupBtn = screen.getByRole("button",{name:/bardakta/i});
       const cornetBtn = screen.getByRole("button",{name:/külahta/i});

       //bardakta butonuna tıkla
       await user.click(cupBtn);
       //fonksiyon cup parametresi ile çalıştımı
       expect(mockFn).toHaveBeenCalledWith("cup");

       //kornet butonuna tıkla
       await user.click(cornetBtn);

       //fonksiyon cornet parametresi ile çalıştı mı
       expect(mockFn).toBeCalledWith("cornet");
    });
});