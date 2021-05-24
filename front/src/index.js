import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddlerware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reducer from './_reducers';
import 'bootstrap/dist/css/bootstrap.css'


//store 생성하기
const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
    <Provider
      store={createStoreWidthMiddleware(
        reducer,

        //개발자 도구를 사용하기 위한 설정
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
