import { useContext, useEffect, useRef, useState } from "react";

import slide1 from '../assets/slides/1_cell/cell.jpg';
import slide2 from '../assets/slides/2_nucleus/nucleus_1.jpg';
import slide3 from '../assets/slides/2_nucleus/nucleus_2.jpg';
import slide4 from '../assets/slides/3_cytoskeleton/cytoskeleton.jpg';
import slide5 from '../assets/slides/4_membrane/membrane.jpg';
import slide6 from '../assets/slides/6_endoplasmic/endoplasmit_reticulum.jpg';
import slide7 from '../assets/slides/7_mitochondria/mitochondria.jpg';
import slide8 from '../assets/slides/8_energy/energy_production.jpg';
import slide9 from '../assets/slides/9_dynamics/dynamics_cell_growth.jpg';
import slide10 from '../assets/slides/10_nose/nose_pharynx.jpg';
import slide11 from '../assets/slides/11_larynx/larynx_epiglotis.jpg';
import slide12 from '../assets/slides/12_trachea/trachea_bronchi.jpg';
import slide13 from '../assets/slides/13_bronchioles/bronchioles_alveoli.jpg';
import slide14 from '../assets/slides/14_lungs/lungs_pleural_membrane.jpg';
import slide15 from '../assets/slides/15_myocardial/myocardial_contraction.jpg';
import slide16 from '../assets/slides/15_myocardial/myocardial_contraction_2.jpg';
import slide17 from '../assets/slides/17_ion_distribution/ion_distribution.jpg';
import slide18 from '../assets/slides/17_ion_distribution/ion_distribution_2.jpg';
import slide19 from '../assets/slides/19_systemic/systemic_pulmonary_circulation.jpg';
import slide20 from '../assets/slides/20_various/various_types_bone.jpg';

import audio1 from '../assets/audios/slides/1_cell.mp3';
import audio2 from '../assets/audios/slides/2_nucleus_1.mp3';
import audio3 from '../assets/audios/slides/3_nucleus_2.mp3';
import audio4 from '../assets/audios/slides/4_cytoskeleton.mp3';
import audio5 from '../assets/audios/slides/5_membraine.mp3';
import audio6 from '../assets/audios/slides/6_endoplasmic_reticulum.mp3';
import audio7 from '../assets/audios/slides/7_mitochondria.mp3';
import audio8 from '../assets/audios/slides/8_energy_production.mp3';
import audio9 from '../assets/audios/slides/9_dynamic_cell_growth.mp3';
import audio10 from '../assets/audios/slides/10_nose_pharynx.mp3';
import audio11 from '../assets/audios/slides/11_larynx_epiglotis.mp3';
import audio12 from '../assets/audios/slides/12_trachea_bronchi.mp3';
import audio13 from '../assets/audios/slides/13_bronchioles_alveolly.mp3';
import audio14 from '../assets/audios/slides/14_lungs_pleural.mp3';
import audio15 from '../assets/audios/slides/15_myocardial_contraction.mp3';
import audio16 from '../assets/audios/slides/16_myocardial_contraction_2.mp3';
import audio17 from '../assets/audios/slides/17_ion_distribution.mp3';
import audio18 from '../assets/audios/slides/18_ion_distribution_2.mp3';
import audio19 from '../assets/audios/slides/19_systemic_pulmonary.mp3';
import audio20 from '../assets/audios/slides/20_various_bones.mp3.mp3';

import { UserContext } from "../context/UserContext";

const intervals = {
  image: null,
  text: null,
};

const slides = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
  slide15,
  slide16,
  slide17,
  slide18,
  slide19,
  slide20,
];

const audios = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]

const numSlides = 20;
const trainingId = 10;

export default function NormalTest() {
  const { userId, setUserId } = useContext(UserContext);

  const [clicks, setClicks] = useState({ button: 0, image: new Array(numSlides).fill(0), text: new Array(numSlides).fill(0), figure: 0 });
  const [hovers, setHovers] = useState({ button: 0, image: new Array(numSlides).fill(0), text: new Array(numSlides).fill(0), figure: [] });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [finishTest, setFinishTest] = useState(false);
  const [seeInfo, setSeeInfo] = useState(false);
  const [sendReportSuccess, setSendReportSuccess] = useState(false);

  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);
  const audioRef4 = useRef(null);
  const audioRef5 = useRef(null);
  const audioRef6 = useRef(null);
  const audioRef7 = useRef(null);
  const audioRef8 = useRef(null);
  const audioRef9 = useRef(null);
  const audioRef10 = useRef(null);
  const audioRef11 = useRef(null);
  const audioRef12 = useRef(null);
  const audioRef13 = useRef(null);
  const audioRef14 = useRef(null);
  const audioRef15 = useRef(null);
  const audioRef16 = useRef(null);
  const audioRef17 = useRef(null);
  const audioRef18 = useRef(null);
  const audioRef19 = useRef(null);
  const audioRef20 = useRef(null);


  useEffect(() => {
    audios[0] = audioRef1;
    audios[1] = audioRef2;
    audios[2] = audioRef3;
    audios[3] = audioRef4;
    audios[4] = audioRef5;
    audios[5] = audioRef6;
    audios[6] = audioRef7;
    audios[7] = audioRef8;
    audios[8] = audioRef9;
    audios[9] = audioRef10;
    audios[10] = audioRef11;
    audios[11] = audioRef12;
    audios[12] = audioRef13;
    audios[13] = audioRef14;
    audios[14] = audioRef15;
    audios[15] = audioRef16;
    audios[16] = audioRef17;
    audios[17] = audioRef18;
    audios[18] = audioRef19;
    audios[19] = audioRef20;
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
      <audio ref={audioRef4} src={audio4} />
      <audio ref={audioRef5} src={audio5} />
      <audio ref={audioRef6} src={audio6} />
      <audio ref={audioRef7} src={audio7} />
      <audio ref={audioRef8} src={audio8} />
      <audio ref={audioRef9} src={audio9} />
      <audio ref={audioRef10} src={audio10} />
      <audio ref={audioRef11} src={audio11} />
      <audio ref={audioRef12} src={audio12} />
      <audio ref={audioRef13} src={audio13} />
      <audio ref={audioRef14} src={audio14} />
      <audio ref={audioRef15} src={audio15} />
      <audio ref={audioRef16} src={audio16} />
      <audio ref={audioRef17} src={audio17} />
      <audio ref={audioRef18} src={audio18} />
      <audio ref={audioRef19} src={audio19} />
      <audio ref={audioRef20} src={audio20} />
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
    top: "18vh",
    width: "38vw",
    height: "73vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "10vw",
    top: "28vh",
    width: "40vw",
    height: "51vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "10vw",
    top: "24vh",
    width: "41vw",
    height: "68vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "7vw",
    top: "19vh",
    width: "40vw",
    height: "76vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "9vw",
    top: "14vh",
    width: "37vw",
    height: "78vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "10vw",
    top: "15vh",
    width: "40vw",
    height: "78vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "8vw",
    top: "14vh",
    width: "40vw",
    height: "78vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "6.5vw",
    top: "24vh",
    width: "34.5vw",
    height: "62vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "6vw",
    top: "14vh",
    width: "39vw",
    height: "79vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "6vw",
    top: "17vh",
    width: "37.3vw",
    height: "79vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "6vw",
    top: "15.5vh",
    width: "38.5vw",
    height: "79vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "8vw",
    top: "13vh",
    width: "42vw",
    height: "81vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "8vw",
    top: "15vh",
    width: "38.5vw",
    height: "79vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "8vw",
    top: "12vh",
    width: "39vw",
    height: "79vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "11.5vw",
    top: "17.5vh",
    width: "39vw",
    height: "73vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "8vw",
    top: "11.5vh",
    width: "37vw",
    height: "79vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "9vw",
    top: "12.5vh",
    width: "34vw",
    height: "80vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "9.5vw",
    top: "16.5vh",
    width: "40vw",
    height: "75vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "11vw",
    top: "16.5vh",
    width: "40vw",
    height: "73vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "9vw",
    top: "8.5vh",
    width: "46vw",
    height: "85vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  }],
  // Image Target


  imageTarget: [{
    position: "absolute",
    left: "49vw",
    top: "16vh",
    width: "41vw",
    height: "77vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "52.5vw",
    top: "18vh",
    width: "38vw",
    height: "75vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "52vw",
    top: "18vh",
    width: "37vw",
    height: "72vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "48vw",
    top: "20vh",
    width: "45vw",
    height: "72vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "46vw",
    top: "27vh",
    width: "48vw",
    height: "50vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "52vw",
    top: "11vh",
    width: "39vw",
    height: "81vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "49vw",
    top: "18.5vh",
    width: "42.5vw",
    height: "75vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "45vw",
    top: "17vh",
    width: "47.5vw",
    height: "75vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "45.5vw",
    top: "24vh",
    width: "43.5vw",
    height: "55vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "43.5vw",
    top: "6vh",
    width: "46.5vw",
    height: "88vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "48vw",
    top: "5vh",
    width: "39vw",
    height: "92vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "50vw",
    top: "3vh",
    width: "42vw",
    height: "90vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "48vw",
    top: "2vh",
    width: "40.5vw",
    height: "92vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "47.5vw",
    top: "6.5vh",
    width: "43.5vw",
    height: "90vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "56vw",
    top: "17vh",
    width: "33.5vw",
    height: "72vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "45.1vw",
    top: "24vh",
    width: "47.5vw",
    height: "50vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "43vw",
    top: "21vh",
    width: "49vw",
    height: "52vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "50vw",
    top: "9vh",
    width: "38.5vw",
    height: "84vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "57vw",
    top: "8.5vh",
    width: "34vw",
    height: "80vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  {
    position: "absolute",
    left: "57vw",
    top: "3.5vh",
    width: "33vw",
    height: "92vh",
    backgroundColor: "rgba(0,0,0,0.5)"
  }],
  // End targets


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