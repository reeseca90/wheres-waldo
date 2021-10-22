import React, { useEffect } from "react";
import hockeyImg from './hockey.jpg';

const Hockey = (props) => {
  const itemsToFind = ['helmet', 'gloves', 'puck', 'skates'];

  function itemList() {
    props.getItemsToFind(itemsToFind);
  }

  const getCoords = (e) => {  
    props.coordCallback({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, pageX: e.pageX, pageY:e.pageY});
  }

  const popupItemClick = (e) => {
    props.popupCallback(e.target.id);
  }

  useEffect(() => {
    props.startTimeCallback(Date.now());
    itemList();
  }, []);

  return (
    <div className="App">
      <span className="whatToFind">Items to find:</span>
      <div className="whatToFind">
        <span id="helmet" className="notFound">Helmet</span>
        <span id="gloves" className="notFound">Gloves</span>
        <span id="puck" className="notFound">Puck</span>
        <span id="skates" className="notFound">Skates</span>
      </div>
      <img src={hockeyImg} alt="hockey equipment" onClick={getCoords} />

      <div id="popupMenu" className="popupHide">
          <ul>
            {itemsToFind.map((item) => {
              return <li id={item} onClick={popupItemClick}>{item}</li>
            })}
          </ul>
        </div>
    </div>
  );
};

export default Hockey;