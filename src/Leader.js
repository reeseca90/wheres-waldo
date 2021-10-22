import React, { useState, useEffect } from "react";
import { doc, getDoc, getFirestore} from "firebase/firestore";
import { initializeApp } from 'firebase/app';

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

const Leader = () => {
  const [leaders, setLeaders] = useState([]);

  async function getData() {
    const docRef = doc(db, 'hockey', 'leaderboard');
    const docSnap = await getDoc(docRef);
    setLeaders(docSnap.data().leaders);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ul id="leaderBoard">Leaderboard:
        {leaders
          .sort((a, b) => {
            return a.time - b.time;
          })
          .map((element) => {
            return <li id={element.name} key={element.time} className="leaderLI">{element.name}, {element.time/1000} seconds</li>
          })
        }
      </ul>
    </div>
  );
}

export default Leader;

