import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Blank from './blank';
import Hockey from './Hockey';
import Leader from './Leader';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDd927D5eN1SDSpGBjk1RBY0_9Jra4G1QI",
  authDomain: "wheres-waldo-4c7b9.firebaseapp.com",
  projectId: "wheres-waldo-4c7b9",
  storageBucket: "wheres-waldo-4c7b9.appspot.com",
  messagingSenderId: "373337422993",
  appId: "1:373337422993:web:fa89b0ad66b018f7689330"
};

const waldo = initializeApp(firebaseConfig);
const db = getFirestore(waldo);

const App = () => {
  // used to not render popup menu when setting initial coordinates
  const firstRender = useRef(true);
  const canWinGame = useRef(false);

  const [name, setName] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [items, setItems] = useState([]);
  const [itemsFound, setItemsFound] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);

  const getName = (e) => {
    setName(e.target.value);
  }

  const startTimeCallback = (childData) => {
    setStartTime(childData);
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

  // get items array from child for checking win conditions
  const getItemsToFindCallback = (childData) => {
    setItems([...childData]);
  }
  // set items found to 0 every time items array is changed
  useEffect(() => {
    setItemsFound(0);
    const gameOverArea = document.getElementById('gameOverArea');
    gameOverArea.className = 'popupHide';
  }, [items]);

  // game win logic
  useEffect(() => {
    if (canWinGame.current === false) {
      canWinGame.current = true;
      return;
    } else {
      if (itemsFound === items.length && items.length !== 0) {
        const gameOverArea = document.getElementById('gameOverArea');
        gameOverArea.className = 'popupShow';
        setTime(Date.now() - startTime);
      }
    }
  }, [itemsFound, items.length])

  const submitScore = (e) => {
    e.preventDefault();
    const scoreRef = doc(db, 'hockey', 'leaderboard');
    updateDoc(scoreRef, { leaders: arrayUnion({name: `${name}`, time: `${time}`})});
    const gameOverArea = document.getElementById('gameOverArea');
    gameOverArea.className = 'popupHide';
  }

  const popupCallback = async (childData) => {
    // get coordinates of item from backend
    const docRef = doc(db, 'hockey', childData);
    const docSnap = await getDoc(docRef);

    // check if in range
    const checkRange = async () => {
      if (x >= docSnap.data().X[0] && x <= docSnap.data().X[1] && y >= docSnap.data().Y[0] && y <= docSnap.data().Y[1]) {
        // gray out item in list
        const clickedItem = document.querySelector(`span[id=${childData}]`);
        clickedItem.className = "found";
        setItemsFound(itemsFound + 1);
      }
    }

    await checkRange();

    // hide popup menu
    const popupMenu = document.getElementById('popupMenu');
    popupMenu.className = 'popupHide';
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
              <Link to="/leader">Leaderboard</Link>
              <Link to="/hockey">Hockey Image</Link>
            </div>

            <Switch>
              <Route exact path="/">
                <Blank getItemsToFind={getItemsToFindCallback} />
              </Route>
              <Route exact path="/leader" component={Leader} />
              <Route exact path="/hockey">
                <Hockey coordCallback={coordCallback} startTimeCallback={startTimeCallback} getItemsToFind={getItemsToFindCallback} popupCallback={popupCallback} />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </section>

      <section id="gameOverArea" className="popupHide">
        <p>You Win!</p>
        <button onClick={submitScore}>Submit your time</button>
      </section>
    </div>
  );
};

export default App;
