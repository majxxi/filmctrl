import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import FilmList from './components/FilmList';
import FilmDetail from './components/FilmDetail';
import DrawerMenu from './components/DrawerMenu';
import FilmRanking from './components/FilmRanking';
import About from './components/About';

function App() {
  const [search, setSearch] = useState('');
  const [drawer, setDrawer] = useState(false);
  
  async function searchFor(term) {
    setSearch(term);
  };

  const handleDrawer = () => {
    setDrawer((prev) => !prev)
  }

  return (
    <div className="App">
      <NavBar searchFor={searchFor} handleDrawer={handleDrawer} />
      <BrowserRouter>
      <DrawerMenu handleDrawer={handleDrawer} drawer={drawer} />
        <Switch>
          <Route exact path="/">
            <FilmList search={search} />
          </Route>
          <Route exact path="/film/:filmId">
            <FilmDetail />
          </Route>
          <Route exact path="/ranking">
            <FilmRanking />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
