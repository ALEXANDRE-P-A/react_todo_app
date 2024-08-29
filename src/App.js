import './App.css';

import { ListTitle } from './components/ListTitle.js';
import { Container } from './components/Container.js';
import { Menu } from './components/Menu.js';
import { SlideWindow } from './components/SlideWindow.js';

import { Provider } from 'react-redux';
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { ModalProvider } from './context/ModalContext.js';
import { CurrentListProvider } from './context/CurrentListContext.js';
import { SingleTodoProvider } from './context/SingleTodoContext.js';

const App = _ => {

  return (
    <div className="App oswald-mainfont">
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <ModalProvider>
            <CurrentListProvider>
              <SingleTodoProvider>
                <ListTitle />
                <Container />
                <Menu />
                <SlideWindow />
              </SingleTodoProvider>
            </CurrentListProvider>
          </ModalProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;