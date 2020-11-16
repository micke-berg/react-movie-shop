import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import HomeScreen from "./components/screens/HomeScreen";
import AdminScreen from "./components/screens/AdminScreen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/admin' component={AdminScreen} />
      <Route path='/' component={HomeScreen} exact />
    </BrowserRouter>
  );
};

export default App;
