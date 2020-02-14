import renderer from 'react-test-renderer'
import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../../store';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import EnzymeToJson from 'enzyme-to-json';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DialogComponent } from './index';

Enzyme.configure({ adapter: new Adapter() });

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

it("SNAPSHOT renders correctly", () => {
    const subject = shallow(
        <DialogComponent open={true}
                         onClose={() => {}}/>
    );
    expect(EnzymeToJson(subject)).toMatchSnapshot();
});
