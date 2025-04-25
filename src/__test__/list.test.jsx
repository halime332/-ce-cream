import { render, waitFor,screen } from "@testing-library/react";
import List from "../components/list";
import api from "../utils/api";
import { mockArray } from "../utils/constants";
import Card from "../components/list/card";




//api modülünü mockla
jest.mock("../utils/api");
//card.jsx bileşi içerisinde provider/router gibi bağımlılıklar
//kullandığımızdan ve bu bağımlılıkların list bileşenine etki etmesini istediğimizden
//card bileşenini mocklayalım
jest.mock("../components/list/card")

describe("List bileşeni testleri",()=>{
    //her testin öncesinde önceki testlerden mocklanmış api'a 
    //yapılan güncellemeleri temizler

  beforeEach(()=>{
    jest.clearAllMocks();
  });

    it("Veri çekilirken ekranda loader vardır" , async()=>{
        // bu test içerisinde api.get isteği atıldığındaolumlu cevap gitsin
        api.get.mockResolvedValueOnce({data:[]});

        //list bileşenini renderla
        render(<List/>);

        //ekranda loader vardır
        screen.getByTestId("list-loader");

        //belirli bir süre sonra ekrandan loader gider
        await waitFor(()=>{
            expect(screen.queryByTestId("list-loader")).toBeNull();

        });
    });

    it("apiden error cevabı gelirse ekrana hata mesajı gelir", async()=>{
        //bu test içerisinde api.get isteği atıldığında olumsuz cevap gitsin
        const errMsg = "bağlantı zaman aşımına uğradı";
        api.get.mockRejectedValueOnce(new Error(errMsg));
        //list bileşenini renderla
        render(<List/>);
        
        //apiden cevap gelince hata mesajını basar
        await waitFor(()=>screen.getByTestId("list-error"));
    });


    it("api den başarılı cevap gelirse ekrana cartlar gelir", async()=>{
        //card componentı çağrılınca ne retun etmeli 
        Card.mockImplementation(({item})=> <div>{item.name}</div>);

        //bu test içerisinde api.get isteği atıldığında olumlu cevap gitsin
        api.get.mockResolvedValueOnce({data:mockArray});
        //bileşeni renderla
        render(<List/>);

        //veri gelince her bir nesne için ekrana kart gelir
        await waitFor(()=>{
           mockArray.forEach((item)=>{
            screen.getByText(item.name);
           });
        });
    });
});

