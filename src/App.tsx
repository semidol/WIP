import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router';
import { store } from './store';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Chat from './Pages/Chat/Chat';
import Login from './Pages/Login/Login';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/chat" element={<Chat />}/>
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;
