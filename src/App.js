import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';
import blank from './blank';
import Hockey from './Hockey';

const App = () => {
  // used to not render popup menu when setting initial coordinates
  const firstRender = useRef(true);

  const [name, setName] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [items, setItems] = useState([]);

  const getName = (e) => {
    setName(e.target.value);
  }

  // this sets the coords for the popup menu and the coords for the clicked object on picture
  const coordCallback = (childData) => {
    setX(childData.x);
    setY(childData.y);
    setPageX(childData.pageX);
    setPageY(childData.pageY);
  }

  const displayMenu = () => {
    const popupMenu = document.getElementById('popupMenu');
    popupMenu.style.left = `${pageX}px`;
    popupMenu.style.top = `${pageY}px`;
    popupMenu.className = 'popupShow';
  }

  // this displays the popup menu when the coords from coordCallback are changed
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      displayMenu();
    }
  }, [x, y, pageX, pageY]);

  // ***** gets items to find from image file, but probably not needed ******
  const getItemsToFindCallback = (childData) => {
    setItems([...childData]);
  }
  useEffect(() => {
    console.log(items);
  }, [items]);

  const popupCallback = (childData) => {
    // logic to check if selection is correct
      // get coordinates of item from backend
      // check if in range

    // if found change found item to gray in list above image
    const clickedItem = document.querySelector(`span[id=${childData}]`);
    clickedItem.className = "found";

    // hide popup menu
    const popupMenu = document.getElementById('popupMenu');
    popupMenu.className = 'popupHide';

    // logic to see if game is over
  }

  return (
    <div className="App">

      <section id="appNav">
        <form>
          <label htmlFor="name">Enter your name: </label>
          <input name="name" type="text" onChange={getName} value={name} required/>
        </form>
      </section>

      <section id="imageArea">
        <BrowserRouter>
          <div id="mainContent">
            <div id="imageLinks">
              <Link to="/">Home</Link>
              <Link to="/hockey">Hockey</Link>
            </div>

            <Switch>
              <Route exact path="/" component={blank} />
              <Route exact path="/hockey">
                <Hockey coordCallback={coordCallback} getItemsToFind={getItemsToFindCallback} popupCallback={popupCallback} />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </section>

    </div>
  );
};

export default App;
