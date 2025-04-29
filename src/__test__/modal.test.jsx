//TDD
//Önce Test Sonra Bileşen

import { render ,screen} from "@testing-library/react";
import Modal from "../components/modal"

describe("Modal Component", ()=>{
    const closeMock=jest.fn();

    it("isOpen propuna göre modal ekrana basılır",()=>{
        //bileşeni renderla
       const {rerender} = render(<Modal isOpen={false} close={closeMock}/>);

        //modal ekranda yoktur
        expect(screen.queryByTestId("modal")).toBeNull();

        //isOpen true gönderip tekrar renderlayalım
        rerender(<Modal isOpen={true} close={closeMock}/>);
        //modal ekranda vardır
        screen.getByTestId("modal");
    });
});