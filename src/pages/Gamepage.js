import React from "react";
import './Gamepage.css'
import gameField from "../images/gameField.jpg";


const Gamepage = () => {
    return (
        // ALON - add your design here. I'll integrate it all together later.
        <div className="gamepage-container">

         <div className="sideList" style={{ border: "2px    solid #FFFFFF1C", borderRight: 0 }}>
         <h2>Now Online</h2>
         </div>


         <div className="mainRight" style={{ border: "2px solid #FFFFFF1C" }}>
                <div className="topBar">  
                <h2>Score:</h2>
                <h2>win:</h2>
                <h2>coins:</h2>

                <p className="userName">userName</p>
                <div className="userPic" ></div>
               </div>

             < div className="gameField"> 
              <img src={gameField} alt="gamePic" className="gamePic"/>
              </div>

         </div>


        </div>
    );
};

export default Gamepage;