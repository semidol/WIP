import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router';
import { store, persistor } from './store/store';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Chatpage from './Pages/Chatpage/Chatpage';
import PATHS from './paths';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './Pages/Home/Home';
import Loginpage from './Pages/Loginpage/Loginpage';
import PrivateRoute from './HOC/PrivateRoute';

function App() {
  const routes = [
    {path: PATHS.chat, element: <PrivateRoute forWhom='authUser'><Chatpage /></PrivateRoute>},
    {path: PATHS.login, element: <PrivateRoute forWhom='notAuthUser'><Loginpage /></PrivateRoute>},
    {path: PATHS.main, element: <Main />}
  ]

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Routes>
          {routes.map( (route, index) =>
            <Route key={index} path={route.path} element={route.element} />
          )}
        </Routes>
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
