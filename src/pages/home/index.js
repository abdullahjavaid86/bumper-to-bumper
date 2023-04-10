import React, { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="home">
      <h1>Select Image</h1>
    <input type="text" placeholder="Search for trucks"></input>
      <div className="flex-container">
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 1</h3>
          <p>Card description goes here</p>
        </div>
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 2</h3>
          <p>Card description goes here</p>
        </div>
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 3</h3>
          <p>Card description goes here</p>
        </div>
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 4</h3>
          <p>Card description goes here</p>
        </div>
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 4</h3>
          <p>Card description goes here</p>
        </div>
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 4</h3>
          <p>Card description goes here</p>
        </div>
        <div className="cardSelection">
          <img src="./sampleTruck.png" />
          <h3>Card Title 4</h3>
          <p>Card description goes here</p>
        </div>
      </div>
    </div>
  );
}
