import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App'
import IntermediaryList from './components/intermediary-list/intermediary-list'
import ProductList from './components/product-list/product-list'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="intermediaries" element={<IntermediaryList />} />
          <Route path="products" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
