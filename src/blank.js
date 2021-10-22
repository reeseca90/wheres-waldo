import React, { useEffect } from "react";

const Blank = (props) => {
  const itemsToFind = [];

  function itemList() {
    props.getItemsToFind(itemsToFind);
  }
  
  // passes blank array to App when user clicks home button
  useEffect(() => {
    itemList();
  }, []);

  return (
    <div id="blank">
      Select an image above to begin
    </div>
  );
};

export default Blank;