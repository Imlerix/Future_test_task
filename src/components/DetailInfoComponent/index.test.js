import renderer from 'react-test-renderer'
import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../../store';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import EnzymeToJson from 'enzyme-to-json';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DetailInfoComponentClever, {DetailInfoComponent} from './index';
import * as TableActions from '../../store/actions/TableActions';
import {DialogComponent} from "../DialogComponent";

Enzyme.configure({ adapter: new Adapter() });

const selectedRow = {
    id: 1,
    firstName: 'Ivan',
    lastName: 'Ivanov',
    description: 'Desc',
    phone: '+79991234567',
    address: {
        streetAddress: 'arbatskaya 100',
        city: 'Moskow',
        state: 'Moskow obl',
        zip: '123',
    },
}

const initialState = {
    table: {
        selectedRow
    }
}

let container = null;
const mockStore = initStore();
mockStore.dispatch(TableActions.selectRow(selectedRow));

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

it("renders correctly", () => {
    act(() => {
        render(
            <Provider store={mockStore}>
                <DetailInfoComponentClever />
            </Provider>
            ,container
        );
    });

    const textContent =
        `Выбран пользователь: ${selectedRow.firstName} ${selectedRow.lastName}`+
        `Описание: ${selectedRow.description}`+
        `Адрес проживания: ${selectedRow.address.streetAddress}`+
        `Город: ${selectedRow.address.city}`+
        `Провинция/штат: ${selectedRow.address.state}`+
        `Индекс: ${selectedRow.address.zip}`+
        `Скрыть детальную информацию`;

    // expect(EnzymeToJson(subject)).toMatchSnapshot();
    expect(container.textContent).toBe(textContent);
});

it("SNAPSHOT renders correctly", () => {
    const subject = shallow(
            <DetailInfoComponent table={{selectedUserRow: selectedRow}}/>
            ,container
    );
    expect(EnzymeToJson(subject)).toMatchSnapshot();
});
