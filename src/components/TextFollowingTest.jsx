import { useContext, useEffect, useRef, useState } from "react";

import slide1_1 from '../assets/slides/TextFollow/cell_1_slide_1_1.jpg';
import slide1_2 from '../assets/slides/TextFollow/cell_1_slide_1_2.jpg';
import slide2_1 from '../assets/slides/TextFollow/nucleus_1_slide_1_1.jpg';
import slide2_2 from '../assets/slides/TextFollow/nucleus_1_slide_1_2.jpg';
import slide3_1 from '../assets/slides/TextFollow/cytoskeleton_1_slide_1_1.jpg';
import slide3_2 from '../assets/slides/TextFollow/cytoskeleton_1_slide_1_2.jpg';

//import mask from '../assets/images/transparent_background.png';

import audio1 from '../assets/audios/slides/cell/cell_trim_1.wav';
import audio2 from '../assets/audios/slides/cell/cell_trim_2.wav';
import audio3 from '../assets/audios/slides/nucleus/nucleus_trim_1.mp3';
import audio4 from '../assets/audios/slides/nucleus/nucleus_trim_2.mp3';
import audio5 from '../assets/audios/slides/cytoskeleton/cytoskeleton_trim_1.mp3';
import audio6 from '../assets/audios/slides/cytoskeleton/cytoskeleton_trim_2.mp3';
import { UserContext } from "../context/UserContext";

const isDebug = false;

const intervals = {
    image: null,
    text: null,
};

const highLigtedIntervals = {
    image: null,
    text: null,
}

// const readingTimeOut = {
//     timeout: null
// };

const slides = [
    slide1_1,
    slide1_2,
    slide2_1,
    slide2_2,
    slide3_1,
    slide3_2
];

const audios = [
    null,
    null,
    null,
    null,
    null,
    null,
];

const readingData = [
    [
        { maskTop: 0, height: "19vh", imgTop: 5, imgLeft: 5, imgWidth: "15vh", imgHeight: "15vh", time: 8.5 }, // 8.5
        { maskTop: 19, height: "22vh", imgTop: 15, imgLeft: 15, imgWidth: "15vh", imgHeight: "15vh", time: 10.0 },
        { maskTop: 41, height: "43vh", imgTop: 25, imgLeft: 25, imgWidth: "15vh", imgHeight: "15vh", time: 30.0 },
    ],
    [
        { maskTop: 0, height: "28.5vh", imgTop: 5, imgLeft: 5, imgWidth: "15vh", imgHeight: "15vh", time: 10.5 }, // 10.5
        { maskTop: 29, height: "55vh", imgTop: 15, imgLeft: 15, imgWidth: "15vh", imgHeight: "15vh", time: 10.0 },
    ],
    [
        { maskTop: 0, height: "44vh", imgTop: 5, imgLeft: 5, imgWidth: "15vh", imgHeight: "15vh", time: 24.5 }, // 24.5
        { maskTop: 44, height: "41vh", imgTop: 15, imgLeft: 15, imgWidth: "15vh", imgHeight: "15vh", time: 10.0 },
    ],
    [
        { maskTop: 0, height: "52vh", imgTop: 5, imgLeft: 5, imgWidth: "15vh", imgHeight: "15vh", time: 23 }, // 23
        { maskTop: 52, height: "33vh", imgTop: 15, imgLeft: 15, imgWidth: "15vh", imgHeight: "15vh", time: 10.0 },
    ],
    [
        { maskTop: 0, height: "34vh", imgTop: 5, imgLeft: 5, imgWidth: "15vh", imgHeight: "15vh", time: 12 }, // 12
        { maskTop: 35, height: "49vh", imgTop: 15, imgLeft: 15, imgWidth: "15vh", imgHeight: "15vh", time: 10.0 },
    ],
    [
        { maskTop: 0, height: "42vh", imgTop: 5, imgLeft: 5, imgWidth: "15vh", imgHeight: "15vh", time: 30.5 }, // 30.5
        { maskTop: 42, height: "42vh", imgTop: 15, imgLeft: 15, imgWidth: "15vh", imgHeight: "15vh", time: 10.0 },
    ],
];

const offsets = [
    {
        textLeft: 0,
        textTop: 7.5,
        imgLeft: 111.5,
        imgTop: 8
    },
    {
        textLeft: 0,
        textTop: 8.5,
        imgLeft: 112,
        imgTop: 9
    },
    {
        textLeft: 0,
        textTop: 7.5,
        imgLeft: 116,
        imgTop: 7.5
    },
    {
        textLeft: 0,
        textTop: 7.5,
        imgLeft: 115.5,
        imgTop: 8
    },
    {
        textLeft: 0,
        textTop: 7.5,
        imgLeft: 104.5,
        imgTop: 20.5
    },
    {
        textLeft: 0,
        textTop: 7.5,
        imgLeft: 104.5,
        imgTop: 21
    }
];

const numSlides = 6;
const trainingId = 11;

export default function TextFollowingTest() {
    const { userId, setUserId } = useContext(UserContext);

    const [clicks, setClicks] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: 0 });
    const [hovers, setHovers] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: [] });
    const [highligtedClicks, setHighlightedClicks] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: 0 });
    const [highLightedHovers, setHighlightedHovers] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: [] });
    const [step, setStep] = useState(0);
    const [sendReportSuccess, setSendReportSuccess] = useState(false);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [finishTest, setFinishTest] = useState(false);
    const [seeInfo, setSeeInfo] = useState(false);
    const [readingTimeOut, setReadingTimeOut] = useState(null);
    const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);
    const audioRef3 = useRef(null);
    const audioRef4 = useRef(null);
    const audioRef5 = useRef(null);
    const audioRef6 = useRef(null);


    useEffect(() => {
        audios[0] = audioRef1;
        audios[1] = audioRef2;
        audios[2] = audioRef3;
        audios[3] = audioRef4;
        audios[4] = audioRef5;
        audios[5] = audioRef6;
        startTest();
    }, []);

    useEffect(() => {
        console.log("step: " + step);

        if (step > 0) {
            setNextButtonEnabled(true);
        }
        else {
            setNextButtonEnabled(false);
        }

        let reading = setTimeout(() => {
            //console.log("change step");
            if (step < readingData[currentSlide].length - 1) {
                setStep(step + 1);
            }
        }, readingData[currentSlide][step].time * 1000);


        return () => {
            console.log("Clearing timeout: " + reading);
            clearTimeout(reading);
        };
    }, [step]);

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
        if (element === "text_highligted") {
            const newText = highligtedClicks.text;
            newText[currentSlide]++;
            setHighlightedClicks((prev) => ({ ...prev, text: newText }));
        }
        if (element === "image_highligted") {
            const newText = highligtedClicks.image;
            newText[currentSlide]++;
            setHighlightedClicks((prev) => ({ ...prev, image: newText }));
        }
    };

    const handleNextClick = () => {
        audios.forEach(x => x?.current.pause());
        // clearTimeout(readingTimeOut);
        // setReadingTimeOut(null);

        if (currentSlide < slides.length - 1) {
            setTimeout(() => {
                audios[currentSlide + 1].current.play().catch(error => console.log("Reproducción bloqueada:", error));
            }, 1000);

            setCurrentSlide(currentSlide + 1);
            console.log("reseting step");
            setStep(0);
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
        if (element === "text_highligted") {
            highLigtedIntervals.text = setInterval(() => {
                const newText = highLightedHovers.text;
                newText[currentSlide]++;
                setHighlightedHovers((prev) => ({ ...prev, text: newText }));
            }, 100);
        }
        if (element === "image_highligted") {
            highLigtedIntervals.image = setInterval(() => {
                const newText = highLightedHovers.image;
                newText[currentSlide]++;
                setHighlightedHovers((prev) => ({ ...prev, image: newText }));
            }, 100);
        }
    };

    const handleHoverOut = (element) => {
        clearInterval(intervals[element]);
        if (element === "text_highligted") {
            clearInterval(highLigtedIntervals["text"]);
        }
        if (element === "image_highligted") {
            clearInterval(highLigtedIntervals["image"]);
        }
    };

    const startTest = () => {

        setTimeout(() => {
            audioRef1.current.play();
            //readText(readingData[currentSlide][step].time);
        }, 1000);


    }


    const handleRestartClick = () => {
        window.location.reload();
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
            formData.append("data" + i, "[" + hovers.text[i] + "," + hovers.image[i] + "," + highLightedHovers.text[i] + "," + highLightedHovers.image[i] + "]");
            formData.append("data2_" + i, "[0-" + (hovers.text[i] * .1) + ",0-" + (hovers.image[i] * 0.1) + ",0-" + (highLightedHovers.text[i] * 0.1) + ",0-" + (highLightedHovers.image[i] * 0.1) + "]");
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

    const handleSeeInfoClick = () => {
        setSeeInfo(!seeInfo);
    }

    return (
        <div className="" style={styles.container}>
            <audio ref={audioRef1} src={audio1} />
            <audio ref={audioRef2} src={audio2} />
            <audio ref={audioRef3} src={audio3} />
            <audio ref={audioRef4} src={audio4} />
            <audio ref={audioRef5} src={audio5} />
            <audio ref={audioRef6} src={audio6} />
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
                    {seeInfo &&
                        <p style={styles.textCount}>
                            Text count: {clicks.text[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Time: {(parseFloat(hovers.text[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Reading Text count: {highligtedClicks.text[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Reading Text Time: {(parseFloat(highLightedHovers.text[currentSlide]) * 0.1).toFixed(1)}
                        </p>}
                    {seeInfo &&
                        <p style={styles.imageCount}>
                            Image count: {clicks.image[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Time: {(parseFloat(hovers.image[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Reading Image count: {highligtedClicks.image[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Reading Image Time: {(parseFloat(highLightedHovers.image[currentSlide]) * 0.1).toFixed(1)}
                        </p>}
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
                    <svg style={styles.textTarget[currentSlide]} width={styles.textTarget[currentSlide].width} height={styles.textTarget[currentSlide].height}>
                        <defs>
                            <mask id="mask-custom">
                                {/* Fondo blanco = área visible */}
                                <rect width="100%" height="100%" fill="white" />
                                {/* Área negra = se oculta (la "máscara") */}
                                <rect x="0" y={readingData[currentSlide][step].maskTop + "vh"} width="100%" height={readingData[currentSlide][step].height} fill="black" />
                            </mask>
                        </defs>

                        <foreignObject width="100%" height="100%" mask="url(#mask-custom)">
                            <button
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    fontSize: "18px",
                                    border: "none",
                                    padding: "0",
                                }}
                                onClick={() => handleClick("text")}
                                onMouseEnter={() => handleHover("text")}
                                onMouseLeave={() => handleHoverOut("text")}
                            >
                            </button>
                        </foreignObject>
                    </svg>
                    <div
                        onClick={() => handleClick("text_highligted")}
                        onMouseEnter={() => handleHover("text_highligted")}
                        onMouseLeave={() => handleHoverOut("text_highligted")}
                        style={{
                            position: "absolute",
                            top: `${readingData[currentSlide][step].maskTop + offsets[currentSlide].textTop}vh`,
                            left: styles.textTarget[currentSlide].left,
                            width: styles.textTarget[currentSlide].width,
                            height: readingData[currentSlide][step].height,
                            backgroundColor: isDebug ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 0, 0, 0)", // visible para debug, luego ponlo en 0
                            pointerEvents: "auto",
                            zIndex: 2,
                        }}
                    />

                    <svg style={styles.imageTarget[currentSlide]} width={styles.imageTarget[currentSlide].width} height={styles.imageTarget[currentSlide].height}>
                        <defs>
                            <mask id="mask-custom-image">
                                {/* Fondo blanco = área visible */}
                                <rect width="100%" height="100%" fill="white" />
                                {/* Área negra = se oculta (la "máscara") */}
                                <rect x={readingData[currentSlide][step].imgLeft + "vh"} y={readingData[currentSlide][step].imgTop + "vh"} width={readingData[currentSlide][step].imgWidth} height={readingData[currentSlide][step].imgHeight} fill="black" />
                            </mask>
                        </defs>

                        <foreignObject width="100%" height="100%" mask="url(#mask-custom-image)">
                            <button
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    fontSize: "18px",
                                    border: "none",
                                    padding: "0",
                                }}
                                onClick={() => handleClick("image")}
                                onMouseEnter={() => handleHover("image")}
                                onMouseLeave={() => handleHoverOut("image")}
                            >
                            </button>
                        </foreignObject>
                    </svg>
                    <div
                        onClick={() => handleClick("image_highligted")}
                        onMouseEnter={() => handleHover("image_highligted")}
                        onMouseLeave={() => handleHoverOut("image_highligted")}
                        style={{
                            position: "absolute",
                            top: `${readingData[currentSlide][step].imgTop + offsets[currentSlide].imgTop}vh`,
                            left: `${readingData[currentSlide][step].imgLeft + offsets[currentSlide].imgLeft}vh`,
                            width: readingData[currentSlide][step].imgWidth,
                            height: readingData[currentSlide][step].imgHeight,
                            backgroundColor: isDebug ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 0, 0, 0)", // visible para debug, luego ponlo en 0
                            pointerEvents: "auto",
                            zIndex: 2,
                        }}
                    />


                    {/* <button
                        style={Object.assign({}, styles.imageTarget[currentSlide])}
                        onClick={() => handleClick("image")}
                        onMouseEnter={() => handleHover("image")}
                        onMouseLeave={() => handleHoverOut("image")}
                    ></button> */}
                    <button
                        style={Object.assign({}, styles.nextButton, { display: nextButtonEnabled ? "block" : "none" })}
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
        height: "90%"
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
        fontSize: "15px"
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
    },
    {
        position: "absolute",
        left: "10vw",
        top: "8.5vh",
        width: "41.5vw",
        height: "84vh",
    },
    {
        position: "absolute",
        left: "9vw",
        top: "7.5vh",
        width: "42vw",
        height: "85vh",
    },
    {
        position: "absolute",
        left: "9.5vw",
        top: "7.5vh",
        width: "41.5vw",
        height: "84vh",
    },
    {
        position: "absolute",
        left: "7.5vw",
        top: "7.5vh",
        width: "41.5vw",
        height: "84vh",
    },
    {
        position: "absolute",
        left: "7.5vw",
        top: "7.5vh",
        width: "41.5vw",
        height: "84vh",
    }
    ],
    imageTarget: [{
        position: "absolute",
        left: "53.5vw",
        top: "8vh",
        width: "37.5vw",
        height: "84vh",
    },
    {
        position: "absolute",
        left: "53.5vw",
        top: "9vh",
        width: "37.5vw",
        height: "83vh",
    },
    {
        position: "absolute",
        left: "55.5vw",
        top: "7.5vh",
        width: "36.5vw",
        height: "85vh",
    },
    {
        position: "absolute",
        left: "55.4vw",
        top: "8vh",
        width: "37vw",
        height: "84vh",
    },
    {
        position: "absolute",
        left: "50vw",
        top: "20.5vh",
        width: "44.5vw",
        height: "55vh",
    },
    {
        position: "absolute",
        left: "50vw",
        top: "21vh",
        width: "45vw",
        height: "55vh",
    }
    ],
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
    },
    maskButton: {
        maskImage: 'url("/mask.png")',
        webkitMaskImage: 'url("/mask.png")',
        maskSize: "cover",
        webkitMaskSize: "cover",
        maskRepeat: "no-repeat",
        webkitMaskRepeat: "no-repeat",
    },
    tableTH: {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#434343",
        color: "#f0f0f0"
    },
    tableTD: {
        border: "1px solid #ccc",
        padding: "8px",
    }
};