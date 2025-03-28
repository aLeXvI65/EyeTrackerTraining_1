import { useState } from "react";

import slide1 from '../assets/slides/cell_1_slide_1.jpg';
import slide2 from '../assets/slides/nucleus_1_slide_1.jpg';
import slide3 from '../assets/slides/cytoskeleton_1_slide_1.jpg';

const intervals = {
  image: null,
  text: null,
};

const slides = [
  slide1,
  slide2,
  slide3
];

export default function ClickTracker() {
  const [clicks, setClicks] = useState({ button: 0, image: [0, 0, 0], text: [0, 0, 0], figure: 0 });
  const [hovers, setHovers] = useState({ button: 0, image: [0, 0, 0], text: [0, 0, 0], figure: [] });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [finishTest, setFinishTest] = useState(false);

  const handleClick = (element) => {
    if (element === "image") {
      const newImage = clicks.image;
      newImage[currentSlide]++;
      setClicks((prev) => ({ ...prev, image: newImage }));
    }
    if (element === "text") {
      const newText = clicks.text;
      newText[currentSlide]++;
      setClicks((prev) => ({ ...prev, text: newText }));
    }
  };

  const handleNextClick = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    else {
      setFinishTest(true);
    }
  }

  const handleHover = (element) => {
    if (element === "image") {
      intervals.image = setInterval(() => {
        const newImage = hovers.image;
        newImage[currentSlide]++;
        setHovers((prev) => ({ ...prev, image: newImage }));
      }, 100);
    }
    if (element === "text") {
      intervals.text = setInterval(() => {
        const newText = hovers.text;
        newText[currentSlide]++;
        setHovers((prev) => ({ ...prev, text: newText }));
      }, 100);
    }
  };

  const handleHoverOut = (element) => {
    clearInterval(intervals[element]);
  };

  return (
    <div className="" style={styles.container}>
      {!finishTest ?
        <div style={styles.subcontainer}>
          <img
            style={styles.image}
            src={slides[currentSlide]}
            alt="Imagen clickeable"
            className="cursor-pointer border-2 border-gray-300 rounded-lg"

          />
          <p style={styles.textCount}>Text count: {clicks.text[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.text[currentSlide]) * 0.1).toFixed(1)}</p>
          <p style={styles.imageCount}>Image count: {clicks.image[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.image[currentSlide]) * 0.1).toFixed(1)}</p>
        </div>
        :
        <div style={styles.results}>
          <h1>Your Results are:</h1>
          <h2>Slide 1</h2>
          <h4>Time seeing text: {(parseFloat(hovers.text[0]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp; Count: {clicks.text[0]}</h4>
          <h4>Time seeing image: {(parseFloat(hovers.image[0]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp; Count: {clicks.image[0]}</h4>
          <h2>Slide 2</h2>
          <h4>Time seeing text: {(parseFloat(hovers.text[1]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp; Count: {clicks.text[1]}</h4>
          <h4>Time seeing image: {(parseFloat(hovers.image[1]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp; Count: {clicks.image[1]}</h4>
          <h2>Slide 3</h2>
          <h4>Time seeing text: {(parseFloat(hovers.text[2]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp; Count: {clicks.text[2]}</h4>
          <h4>Time seeing image: {(parseFloat(hovers.image[2]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp; Count: {clicks.image[2]}</h4>
        </div>
      }

      {
        !finishTest &&
        <>
          <button
            style={styles.textTarget[currentSlide]}
            onClick={() => handleClick("text")}
            onMouseEnter={() => handleHover("text")}
            onMouseLeave={() => handleHoverOut("text")}
          ></button>
          <button
            style={styles.imageTarget[currentSlide]}
            onClick={() => handleClick("image")}
            onMouseEnter={() => handleHover("image")}
            onMouseLeave={() => handleHoverOut("image")}
          ></button>
          <button
            style={styles.nextButton}
            onClick={handleNextClick}
          >{currentSlide >= slides.length - 1 ? "See Results" : "Next"}</button>
        </>
      }

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    margin: "auto",
    textAlign: "center",
    maxHeight: "100vh",
  },
  subcontainer: {
    width: "100%",
    height: "100%",
  },
  imageSub: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "left"
  },
  textCount: {
    position: "absolute",
    left: "10vw",
    top: "0px",
    color: "#333",
  },
  imageCount: {
    position: "absolute",
    left: "53vw",
    top: "0px",
    color: "#333",
  },
  textTarget: [{
    position: "absolute",
    left: "10vw",
    top: "7.5vh",
    width: "41vw",
    height: "84vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "9vw",
    top: "7.5vh",
    width: "41.5vw",
    height: "84vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "7.5vw",
    top: "7.5vh",
    width: "41vw",
    height: "84vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  }],
  imageTarget: [{
    position: "absolute",
    left: "53.5vw",
    top: "8vh",
    width: "37.5vw",
    height: "84vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "55.5vw",
    top: "8vh",
    width: "36.5vw",
    height: "84vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "50vw",
    top: "21vh",
    width: "44vw",
    height: "55vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  }],
  nextButton: {
    position: "absolute",
    right: "1vw",
    bottom: "1vh",
  },
  results: {
    color: "#333",
  }
};