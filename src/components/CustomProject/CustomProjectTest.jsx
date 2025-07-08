import { useContext, useEffect, useRef, useState } from "react";

import slide1 from '../../assets/slides/tuti_fruti/1.jpg';
import slide2 from '../../assets/slides/tuti_fruti/4.jpg';
import slide3 from '../../assets/slides/tuti_fruti/5.jpg';
import slide4 from '../../assets/slides/tuti_fruti/6.jpg';
import slide5 from '../../assets/slides/tuti_fruti/7.jpg';
import slide6 from '../../assets/slides/tuti_fruti/8.jpg';
import slide7 from '../../assets/slides/tuti_fruti/9.jpg';
import slide8 from '../../assets/slides/tuti_fruti/10.jpg';
import slide9 from '../../assets/slides/tuti_fruti/11.jpg';
import slide10 from '../../assets/slides/tuti_fruti/12.jpg';

import audio1 from '../../assets/audios/slides/tuti_fruti/audio 1.mp3';
import audio2 from '../../assets/audios/slides/tuti_fruti/audio 4.mp3';
import audio3 from '../../assets/audios/slides/tuti_fruti/audio 5.mp3';
import audio4 from '../../assets/audios/slides/tuti_fruti/audio 6.mp3';
import audio5 from '../../assets/audios/slides/tuti_fruti/audio 7.mp3';
import audio6 from '../../assets/audios/slides/tuti_fruti/audio 8.mp3';
import audio7 from '../../assets/audios/slides/tuti_fruti/audio 9.mp3';
import audio8 from '../../assets/audios/slides/tuti_fruti/audio 10.mp3';
import audio9 from '../../assets/audios/slides/tuti_fruti/audio 11.mp3';
import audio10 from '../../assets/audios/slides/tuti_fruti/audio 12.mp3';

import { TargetData as TARGET_DATA_1 } from '../../utils/TargetData1';
import { TargetData as TARGET_DATA_2 } from '../../utils/TargetData2';
import { TargetData as TARGET_DATA_3 } from '../../utils/TargetData3';

import { UserContext } from "../../context/UserContext";

const intervals = {
    target1: null,
    target2: null,
    target3: null,
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
];

const numSlides = 10;

export default function CustomProjectTest({ trainingId, enableSeeInfo = false }) {
    const { userId, setUserId } = useContext(UserContext);

    const [clicks, setClicks] = useState({
        button: 0,
        target1: new Array(numSlides).fill(0),
        target2: new Array(numSlides).fill(0),
        target3: new Array(numSlides).fill(0),
        figure: 0
    });
    const [hovers, setHovers] = useState({
        button: 0,
        target1: new Array(numSlides).fill(0),
        target2: new Array(numSlides).fill(0),
        target3: new Array(numSlides).fill(0),
        figure: []
    });
    const [currentSlide, setCurrentSlide] = useState(2);
    const [finishTest, setFinishTest] = useState(false);
    const [seeInfo, setSeeInfo] = useState(enableSeeInfo);
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
        startTest();
    }, []);

    const handleClick = (element) => {
        if (element === "target1") {
            const newTarget = clicks.target1;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target1: newTarget }));
        }
        if (element === "target2") {
            const newTarget = clicks.target2;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target2: newTarget }));
        }
        if (element === "target3") {
            const newTarget = clicks.target3;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target3: newTarget }));
        }
    };

    const handleNextClick = () => {
        audios.forEach(x => { if (x && x.current !== null && x.current !== undefined) x.current.pause(); });

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
        if (element === "target1") {
            intervals.target1 = setInterval(() => {
                const newTargetValue = hovers.target1;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target1: newTargetValue }));
            }, 100);
        }
        if (element === "target2") {
            intervals.target2 = setInterval(() => {
                const newTargetValue = hovers.target2;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target2: newTargetValue }));
            }, 100);
        }
        if (element === "target3") {
            intervals.target3 = setInterval(() => {
                const newTargetValue = hovers.target3;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target3: newTargetValue }));
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

            {
                !finishTest &&
                <div style={styles.subcontainer}>
                    <button style={styles.seeInfo} onClick={handleSeeInfoClick}>{seeInfo ? "Hide Info" : "See Info"}</button>
                    <span style={styles.slidesInfo}>{currentSlide + 1} / {numSlides}</span>
                    <img
                        style={styles.image}
                        src={slides[currentSlide]}
                        alt="Imagen clickeable"
                        className="cursor-pointer border-2 border-gray-300 rounded-lg"

                    />
                    {seeInfo && 
                    <p style={styles.textCount}>
                        Target1: {(parseFloat(hovers.target1[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        Target2: {(parseFloat(hovers.target2[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Target3: {(parseFloat(hovers.target3[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>}
                    {/* {seeInfo && <p style={styles.imageCount}>Image count: {clicks.image[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.image[currentSlide]) * 0.1).toFixed(1)}</p>} */}
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
                        style={Object.assign({}, styles.target1[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target1")}
                        onMouseEnter={() => handleHover("target1")}
                        onMouseLeave={() => handleHoverOut("target1")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target2[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target2")}
                        onMouseEnter={() => handleHover("target2")}
                        onMouseLeave={() => handleHoverOut("target2")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target3[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target3")}
                        onMouseEnter={() => handleHover("target3")}
                        onMouseLeave={() => handleHoverOut("target3")}
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
    slidesInfo: {
        position: "absolute",
        top: "5px",
        right: "5px",
        width: "90px",
        height: "30px",
        fontSize: "18px",
        color: "#111",
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
    target1: TARGET_DATA_1,
    target2: TARGET_DATA_2,
    target3: TARGET_DATA_3,


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