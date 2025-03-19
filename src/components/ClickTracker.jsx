import { useState } from "react";

const intervals = {
  button: null,
  image: null,
  text: null,
  figure: null
};

export default function ClickTracker() {
  const [clicks, setClicks] = useState({ button: 0, image: 0, text: 0, figure: 0 });
  const [hovers, setHovers] = useState({ button: 0, image: 0, text: 0, figure: 0 });

  const handleClick = (element) => {
    setClicks((prev) => ({ ...prev, [element]: prev[element] + 1 }));
  };

  const handleHover = (element) => {
    if (element === "button") {
      intervals.button = setInterval(() => {
        setHovers((prev) => ({ ...prev, [element]: prev[element] + 1 }));
      }, 100);
    }
    if (element === "image") {
      intervals.image = setInterval(() => {
        setHovers((prev) => ({ ...prev, [element]: prev[element] + 1 }));
      }, 100);
    }
    if (element === "text") {
      intervals.text = setInterval(() => {
        setHovers((prev) => ({ ...prev, [element]: prev[element] + 1 }));
      }, 100);
    }
    if (element === "figure") {
      intervals.figure = setInterval(() => {
        setHovers((prev) => ({ ...prev, [element]: prev[element] + 1 }));
      }, 100);
    }
  };

  const handleHoverOut = (element) => {
    clearInterval(intervals[element]);
  };

  return (
    <div className="" style={styles.container}>
      <div style={styles.subcontainer}>
        <button
          style={styles.button}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => handleClick("button")}
          onMouseEnter={() => handleHover("button")}
          onMouseLeave={() => handleHoverOut("button")}
        >
          See this button
        </button>
        <p>Button count: {clicks.button} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.button)*0.1).toFixed(1)}</p>
      </div>

      <div style={styles.subcontainer}>
        <img
          style={styles.image}
          src="https://d2zp5xs5cp8zlg.cloudfront.net/image-61785-800.jpg"
          alt="Imagen clickeable"
          className="cursor-pointer border-2 border-gray-300 rounded-lg"
          onClick={() => handleClick("image")}
          onMouseEnter={() => handleHover("image")}
          onMouseLeave={() => handleHoverOut("image")}
        />
        <p>Image count: {clicks.image} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.image)*0.1).toFixed(1)}</p>
      </div>

      <div style={styles.subcontainer}>
        <p
          style={styles.text}
          onClick={() => handleClick("text")}
          onMouseEnter={() => handleHover("text")}
          onMouseLeave={() => handleHoverOut("text")}
        >
          Did you know? A cat’s purr has healing properties! 🐱✨ Studies suggest that a cat’s purring,
          which ranges from 25 to 150 Hz, can promote bone healing, reduce stress, and even lower blood
          pressure in humans.
          <br /><br />
          Here are some more fun and curious facts about cats:
          <br /><br />
          Whisker Sensitivity: Cats' whiskers are highly sensitive and can detect tiny changes in their environment. They help cats measure gaps and spaces, and even detect nearby objects in the dark.
          <br /><br />
          A Cat's Nose is Unique: Just like human fingerprints, every cat’s nose print is unique. No two cats have the same pattern of ridges and bumps on their noses.
          <br /><br />
          Cats Can "Chatter": Cats often make a chattering or chirping sound when they spot birds or small prey. This may mimic the sound of bird calls, or it could be an expression of excitement or frustration
        </p>
        <p>Text count: {clicks.text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.text)*0.1).toFixed(1)}</p>
      </div>

      <div style={styles.subcontainer}>
        <svg
          style={styles.figure}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleClick("figure")}
          onMouseEnter={() => handleHover("figure")}
          onMouseLeave={() => handleHoverOut("figure")}
          >
          <polygon
            points="100,20 170,60 170,140 100,180 30,140 30,60"
            fill="lightblue"
            stroke="black"
            stroke-width="3"
          />
        </svg>
        <p>Figure Count: {clicks.figure} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.figure)*0.1).toFixed(1)}</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    width: "100%",
    height: "25%",
    margin: "auto",
    textAlign: "center",
    maxHeight: "100vh",
  },
  subcontainer: {
    margin: "10%",
    width: "70%",
    height: "70%",
  },
  imageSub: {
    margin: "10%",
    width: "35%",
    height: "35%",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "left"
  },
  figure: {
    width: "100%",
    height: "100%"
  }
};