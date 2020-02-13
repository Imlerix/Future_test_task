import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';

import { Provider } from 'react-redux';
import { initStore } from './store';

import FormComponent from './components/FormComponent';
import TableComponent from "./components/TableComponent";
import Container from "@material-ui/core/Container";
import DetailInfoComponent from "./components/DetailInfoComponent";
import SwitcherDataSize from "./components/SwitcherDataSize";

const store = initStore();

function App() {
  return (
      <Provider store={store}>
        <Container maxWidth="md"
                   className={styles.App}>
                   <div className={styles.App_functionalPanel}>
                       <FormComponent />
                       <SwitcherDataSize />
                   </div>
                   <TableComponent />
                   <DetailInfoComponent />
        </Container>
      </Provider>
  );
}

export default App;
