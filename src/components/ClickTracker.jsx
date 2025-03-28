import { useState } from "react";

const intervals = {
  image: null,
  text: null,
};

export default function ClickTracker() {
  const [clicks, setClicks] = useState({ button: 0, image: 0, text: 0, figure: 0 });
  const [hovers, setHovers] = useState({ button: 0, image: 0, text: 0, figure: 0 });

  const handleClick = (element) => {
    setClicks((prev) => ({ ...prev, [element]: prev[element] + 1 }));
  };

  const handleHover = (element) => {
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
  };

  const handleHoverOut = (element) => {
    clearInterval(intervals[element]);
  };

  return (
    <div className="" style={styles.container}>
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
        <p>Image count: {clicks.image} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.image) * 0.1).toFixed(1)}</p>
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