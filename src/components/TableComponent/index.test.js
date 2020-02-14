import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux';
import { initStore } from '../../store';
import { act } from "react-dom/test-utils";
import TableComponent from './index';

let container = null;
const mockStore = initStore();
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

it("renders table head 'Имя'", () => {
    act(() => {
        render(
            <Provider store={mockStore}><TableComponent /></Provider>
            ,container
        );
    });
    expect(container).toBeInTheDocument("Имя");
});
