import renderer from 'react-test-renderer'
import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SearchComponent from './index';

describe('>>>SearchComponent --- Snapshot',()=>{
    it('+++capturing Snapshot of SearchComponent', () => {
        const renderedValue =  renderer.create(
            <SearchComponent disabled={false}
                             value={''}
                             listener={() => {}}/>
        ).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });
});

////
let container = null;
beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders correct text in input", () => {
    act(() => {
        render(
            <SearchComponent disabled={true}
                             value="Ввод в инпут"
                             listener={() => {}}/>
            ,container);
    });
    expect(container.querySelector('input').value).toBe("Ввод в инпут");
});
