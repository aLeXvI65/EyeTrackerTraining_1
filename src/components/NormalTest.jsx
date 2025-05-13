import { useContext, useEffect, useRef, useState } from "react";

import slide1 from '../assets/slides/cell_1_slide_1.jpg';
import slide2 from '../assets/slides/nucleus_1_slide_1.jpg';
import slide3 from '../assets/slides/cytoskeleton_1_slide_1.jpg';

import audio1 from '../assets/audios/slides/cell/cell_full.mp3';
import audio2 from '../assets/audios/slides/nucleus/nucleus_full.mp3';
import audio3 from '../assets/audios/slides/cytoskeleton/cytoskeleton_full.mp3';
import { UserContext } from "../context/UserContext";

const intervals = {
  image: null,
  text: null,
};

const slides = [
  slide1,
  slide2,
  slide3
];

const audios = [
  null,
  null,
  null
]

const numSlides = 3;
const trainingId = 10;

export default function NormalTest() {
  const { userId, setUserId } = useContext(UserContext);

  const [clicks, setClicks] = useState({ button: 0, image: [0, 0, 0], text: [0, 0, 0], figure: 0 });
  const [hovers, setHovers] = useState({ button: 0, image: [0, 0, 0], text: [0, 0, 0], figure: [] });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [finishTest, setFinishTest] = useState(false);
  const [seeInfo, setSeeInfo] = useState(false);
  const [sendReportSuccess, setSendReportSuccess] = useState(false);

  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);


  useEffect(() => {
    audios[0] = audioRef1;
    audios[1] = audioRef2;
    audios[2] = audioRef3;
    startTest();
  }, []);

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
    audios.forEach(x => x.current.pause());

    if (currentSlide < slides.length - 1) {
      setTimeout(() => {
        audios[currentSlide + 1].current.play().catch(error => console.log("Reproducción bloqueada:", error));
      }, 1000);

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

  const startTest = () => {

    setTimeout(() => {
      audioRef1.current.play();
    }, 1000);

    // audios[0].play().catch(error => console.log("Reproducción bloqueada:", error));
  }

  const handleRestartClick = () => {
    window.location.reload();
  }

  const handleSeeInfoClick = () => {
    setSeeInfo(!seeInfo);
  }


  const handleSendResultsClick = () => {

    const date = new Date();
    const reportPercentage = "0.00";

    console.log("Sending data...");
    console.log("UserId: " + userId);
    console.log("TrainingId: " + trainingId);
    console.log("Date: " + date);
    console.log("ReportPerc: " + reportPercentage);

    const formData = new FormData();
    formData.append("user", parseInt(userId));
    formData.append("training", trainingId);
    formData.append("date", date);
    formData.append("reportPercentage", reportPercentage);

    for (let i = 0; i < hovers.text.length; i++) {
      formData.append("data" + i, "[" + hovers.text[i] + "," + hovers.image[i] + "," + 0 + "," + 0 + "]");
      formData.append("data2_" + i, "[0-" + (hovers.text[i] * .1) + ",0-" + (hovers.image[i] * 0.1) + ",0-" + (0) + ",0-" + (0) + "]");
      formData.append("data3_" + i, "" + (i + 1));
      formData.append("data4_" + i, "" + 0);
      formData.append("data5_" + i, null);
      formData.append("percentage_" + i, "" + 50);
    }
    console.log(JSON.stringify(formData));

    fetch('https://eyetrackingtraining.com/corporate/appInsertTraining.php', {
      method: 'POST',
      body: formData, // enviamos como JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server response error ' + JSON.stringify(response));
        }
        return response.text(); // si el PHP hace un echo simple
        // o usar .json() si devuelve JSON
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
        setSendReportSuccess(true);
      })
      .catch(error => {
        console.error('Error en la petición:', error);
      });
  }

  return (
    <div className="" style={styles.container}>
      <audio ref={audioRef1} src={audio1} />
      <audio ref={audioRef2} src={audio2} />
      <audio ref={audioRef3} src={audio3} />
      {
        !finishTest &&
        <div style={styles.subcontainer}>
          <button style={styles.seeInfo} onClick={handleSeeInfoClick}>{seeInfo ? "Hide Info" : "See Info"}</button>
          <img
            style={styles.image}
            src={slides[currentSlide]}
            alt="Imagen clickeable"
            className="cursor-pointer border-2 border-gray-300 rounded-lg"

          />
          {seeInfo && <p style={styles.textCount}>Text count: {clicks.text[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.text[currentSlide]) * 0.1).toFixed(1)}</p>}
          {seeInfo && <p style={styles.imageCount}>Image count: {clicks.image[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.image[currentSlide]) * 0.1).toFixed(1)}</p>}
        </div>
      }
      {
        finishTest && !sendReportSuccess &&
        <div style={styles.results}>
          <h1>Your Results are:</h1>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1em" }}>
            <thead>
              <th style={styles.tableTH}>Slide</th>
              <th style={styles.tableTH}>Time Seeing text</th>
              <th style={styles.tableTH}>Time Seeing image</th>
            </thead>
            <tbody>
              {
                hovers.text.length > 0 && hovers.text.map((item, index) =>
                  <tr key={index}>
                    <td style={styles.tableTD}>{index + 1}</td>
                    <td style={styles.tableTD}>{(parseFloat(hovers.text[index]) * 0.1).toFixed(1)}</td>
                    <td style={styles.tableTD}>{(parseFloat(hovers.image[index]) * 0.1).toFixed(1)}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <button onClick={handleSendResultsClick}>Send Results</button>
          {/* <button onClick={handleRestartClick}>Restart</button> */}
        </div>
      }
      {
        sendReportSuccess &&
        <div style={styles.results}>
          <h1>Report sent succesfully:</h1>

          <button onClick={handleRestartClick}>Restart Experiment</button>
        </div>
      }

      {
        !finishTest &&
        <>
          <button
            style={Object.assign({}, styles.textTarget[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
            onClick={() => handleClick("text")}
            onMouseEnter={() => handleHover("text")}
            onMouseLeave={() => handleHoverOut("text")}
          ></button>
          <button
            style={Object.assign({}, styles.imageTarget[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
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
  showTarget: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  hideTarget: {
    backgroundColor: "rgba(0,0,0,0)"
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
  },
  startContainer: {
    color: "#333"
  },
  seeInfo: {
    position: "absolute",
    top: "5px",
    left: "5px",
    width: "90px",
    height: "30px",
    fontSize: "12px"
  }
};