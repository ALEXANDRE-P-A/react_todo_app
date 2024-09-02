import './App.css';

import { AlertMsg } from './components/AlertMsg.js';
import { BackTitle } from './components/BackTitle.js';
import { ListTitle } from './components/ListTitle.js';
import { Container } from './components/Container.js';
import { Menu } from './components/Menu.js';
import { SlideWindow } from './components/SlideWindow.js';

import { Provider } from 'react-redux';
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { AlertProvider } from './context/AlertContext.js';
import { ModalProvider } from './context/ModalContext.js';
import { CurrentListProvider } from './context/CurrentListContext.js';
import { SingleTodoProvider } from './context/SingleTodoContext.js';
import { FilterTodoProvider } from './context/FilterTodoContext.js';

const App = _ => {

  return (
    <div className="App oswald-mainfont">
      <AlertProvider>
        <AlertMsg />
        <BackTitle />
        <Provider store={ store }>
          <PersistGate loading={ null } persistor={ persistor }>
            <ModalProvider>
              <CurrentListProvider>
                <SingleTodoProvider>
                  <FilterTodoProvider>
                    <ListTitle />
                    <Container />
                    <Menu />
                    <SlideWindow />
                  </FilterTodoProvider>
                </SingleTodoProvider>
              </CurrentListProvider>
            </ModalProvider>
          </PersistGate>
        </Provider>               
      </AlertProvider>
    </div>
  );
}

export default App;