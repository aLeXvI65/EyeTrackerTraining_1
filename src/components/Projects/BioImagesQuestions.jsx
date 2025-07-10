import { useContext, useEffect, useRef, useState } from "react";

import slide1 from '../../assets/images/transparent_back.png';
import slide2 from '../../assets/images/transparent_back.png';
import slide3 from '../../assets/images/transparent_back.png';
import slide4 from '../../assets/images/transparent_back.png';
import slide5 from '../../assets/images/transparent_back.png';
import slide6 from '../../assets/images/transparent_back.png';
import slide7 from '../../assets/projects/BioImagesQuestions/slides/question7.jpg';
import slide8 from '../../assets/projects/BioImagesQuestions/slides/question8.jpg';
import slide9 from '../../assets/projects/BioImagesQuestions/slides/question9.jpg';
import slide10 from '../../assets/projects/BioImagesQuestions/slides/question10.jpg';

import audio1 from '../../assets/projects/BioImagesQuestions/audios/audio 1.mp3';
import audio2 from '../../assets/projects/BioImagesQuestions/audios/audio 2.mp3';
import audio3 from '../../assets/projects/BioImagesQuestions/audios/audio 3.mp3';
import audio4 from '../../assets/projects/BioImagesQuestions/audios/audio 4.mp3';
import audio5 from '../../assets/projects/BioImagesQuestions/audios/audio 5.mp3';
import audio6 from '../../assets/projects/BioImagesQuestions/audios/audio 6.mp3';
import audio7 from '../../assets/projects/BioImagesQuestions/audios/audio 7.mp3';
import audio8 from '../../assets/projects/BioImagesQuestions/audios/audio 8.mp3';
import audio9 from '../../assets/projects/BioImagesQuestions/audios/audio 9.mp3';
import audio10 from '../../assets/projects/BioImagesQuestions/audios/audio 10.mp3';

import video1 from '../../assets/videos/tuti_fruti/Car_Crash_cut_optimized.mp4';

import { TargetData as TARGET_DATA_1 } from '../../utils/projects/BioImagesQuestions/TargetData1';
import { TargetData as TARGET_DATA_2 } from '../../utils/projects/BioImagesQuestions/TargetData2';
import { TargetData as TARGET_DATA_3 } from '../../utils/projects/BioImagesQuestions/TargetData3';
import { TargetData as TARGET_DATA_4 } from '../../utils/projects/BioImagesQuestions/TargetData4';
import { TargetData as TARGET_DATA_5 } from '../../utils/projects/BioImagesQuestions/TargetData5';
import { TargetData as TARGET_DATA_6 } from '../../utils/projects/BioImagesQuestions/TargetData6';
import { TargetData as TARGET_DATA_7 } from '../../utils/projects/BioImagesQuestions/TargetData7';
import { TargetData as TARGET_DATA_8 } from '../../utils/projects/BioImagesQuestions/TargetData8';
import { TargetData as TARGET_DATA_9 } from '../../utils/projects/BioImagesQuestions/TargetData9';
import { TargetData as TARGET_DATA_10 } from '../../utils/projects/BioImagesQuestions/TargetData10';
import { TargetData as TARGET_DATA_11 } from '../../utils/projects/BioImagesQuestions/TargetData11';
import { TargetData as TARGET_DATA_12 } from '../../utils/projects/BioImagesQuestions/TargetData12';

import { questions, answers1, answers2, answers3, answers4 } from "../../utils/projects/BioImagesQuestions/questions_answers";

import { UserContext } from "../../context/UserContext";

let startAudioInterval = null;

const intervals = {
    target1: null,
    target2: null,
    target3: null,
    target4: null,
    target5: null,
    target6: null,
    target7: null,
    target8: null,
    target9: null,
    target10: null,
    target11: null,
    target12: null,
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
    audio1,
    audio2,
    audio3,
    audio4,
    audio5,
    audio6,
    audio7,
    audio8,
    audio9,
    audio10,
];

const videos = [
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

export default function BioImagesQuestions({ trainingId, enableSeeInfo = false }) {
    const { userId, setUserId } = useContext(UserContext);

    const [clicks, setClicks] = useState({
        button: 0,
        target1: new Array(numSlides).fill(0),
        target2: new Array(numSlides).fill(0),
        target3: new Array(numSlides).fill(0),
        target4: new Array(numSlides).fill(0),
        target5: new Array(numSlides).fill(0),
        target6: new Array(numSlides).fill(0),
        target7: new Array(numSlides).fill(0),
        target8: new Array(numSlides).fill(0),
        target9: new Array(numSlides).fill(0),
        target10: new Array(numSlides).fill(0),
        target11: new Array(numSlides).fill(0),
        target12: new Array(numSlides).fill(0),
        figure: 0
    });
    const [hovers, setHovers] = useState({
        button: 0,
        target1: new Array(numSlides).fill(0),
        target2: new Array(numSlides).fill(0),
        target3: new Array(numSlides).fill(0),
        target4: new Array(numSlides).fill(0),
        target5: new Array(numSlides).fill(0),
        target6: new Array(numSlides).fill(0),
        target7: new Array(numSlides).fill(0),
        target8: new Array(numSlides).fill(0),
        target9: new Array(numSlides).fill(0),
        target10: new Array(numSlides).fill(0),
        target11: new Array(numSlides).fill(0),
        target12: new Array(numSlides).fill(0),
        figure: []
    });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [finishTest, setFinishTest] = useState(false);
    const [seeInfo, setSeeInfo] = useState(enableSeeInfo);
    const [sendReportSuccess, setSendReportSuccess] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [answersList, setAnswersList] = useState(new Array(numSlides).fill("none"));
    const [nextEnabled, setNextEnabled] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

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

    const videoRef1 = useRef(null);


    useEffect(() => {
        // audios[0] = audioRef1;
        // audios[1] = audioRef2;
        // audios[2] = audioRef3;
        // audios[3] = audioRef4;
        // audios[4] = audioRef5;
        // audios[5] = audioRef6;
        // audios[6] = audioRef7;
        // audios[7] = audioRef8;
        // audios[8] = audioRef9;
        // audios[9] = audioRef10;

        // videos[8] = videoRef1;

        startTest();
    }, []);

    const handleAnswerClick = (answer) => {
        setAnswersList(prev => {
            const updated = [...prev];
            updated[currentSlide] = answer;
            return updated;
        });
        handleNextClick();
    }

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
        if (element === "target4") {
            const newTarget = clicks.target4;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target4: newTarget }));
        }
        if (element === "target5") {
            const newTarget = clicks.target5;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target5: newTarget }));
        }
        if (element === "target6") {
            const newTarget = clicks.target6;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target6: newTarget }));
        }
        if (element === "target7") {
            const newTarget = clicks.target7;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target7: newTarget }));
        }
        if (element === "target8") {
            const newTarget = clicks.target8;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target8: newTarget }));
        }
        if (element === "target9") {
            const newTarget = clicks.target9;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target9: newTarget }));
        }
        if (element === "target10") {
            const newTarget = clicks.target10;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target10: newTarget }));
        }
        if (element === "target11") {
            const newTarget = clicks.target11;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target11: newTarget }));
        }
        if (element === "target12") {
            const newTarget = clicks.target12;
            newTarget[currentSlide]++;
            setClicks((prev) => ({ ...prev, target12: newTarget }));
        }
    };

    const playAudioOnce = () => {
        if (audioRef1.current && !hasPlayed) {
            console.log("playing");
            audioRef1.current.play().then(() => {
                setHasPlayed(true);
            }).catch((err) => {
            console.warn("Playback failed:", err);
            });
        }
    };

    const handleNextClick = () => {
        //clearInterval(startAudioInterval);
        //audios.forEach(x => { if (x && x.current !== null && x.current !== undefined) x.current.pause(); });
        audioRef1.current.pause();

        if (currentSlide < slides.length - 1) {
            setTimeout(() => {
                //audios[currentSlide + 1].current.play().catch(error => console.log("Reproducción bloqueada:", error));
                //const nextAudioRef = audios[currentSlide + 1];
                const nextAudioRef = audioRef1;
                if (nextAudioRef && nextAudioRef.current) {
                    nextAudioRef.current.src = audios[currentSlide + 1];
                    nextAudioRef.current.play().catch(error => {
                        console.log("Playback blocked:", error);
                    });
                    //playAudioOnce();
                } else {
                    console.warn("Audio ref no disponible en el slide:", currentSlide + 1);
                }

                const nextVideoRef = videos[currentSlide + 1];
                if (nextVideoRef && nextVideoRef.current) {
                    nextVideoRef.current.play().catch(error => {
                        console.log("Playback blocked:", error);
                    });
                    setShowVideo(true);
                } else {
                    console.warn("Video ref no disponible en el slide:", currentSlide + 1);
                    setShowVideo(false);
                }
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
        if (element === "target4") {
            intervals.target4 = setInterval(() => {
                const newTargetValue = hovers.target4;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target4: newTargetValue }));
            }, 100);
        }
        if (element === "target5") {
            intervals.target5 = setInterval(() => {
                const newTargetValue = hovers.target5;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target5: newTargetValue }));
            }, 100);
        }
        if (element === "target6") {
            intervals.target6 = setInterval(() => {
                const newTargetValue = hovers.target6;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target6: newTargetValue }));
            }, 100);
        }
        if (element === "target7") {
            intervals.target7 = setInterval(() => {
                const newTargetValue = hovers.target7;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target7: newTargetValue }));
            }, 100);
        }
        if (element === "target8") {
            intervals.target8 = setInterval(() => {
                const newTargetValue = hovers.target8;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target8: newTargetValue }));
            }, 100);
        }
        if (element === "target9") {
            intervals.target9 = setInterval(() => {
                const newTargetValue = hovers.target9;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target9: newTargetValue }));
            }, 100);
        }
        if (element === "target10") {
            intervals.target10 = setInterval(() => {
                const newTargetValue = hovers.target10;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target10: newTargetValue }));
            }, 100);
        }
        if (element === "target11") {
            intervals.target11 = setInterval(() => {
                const newTargetValue = hovers.target11;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target11: newTargetValue }));
            }, 100);
        }
        if (element === "target12") {
            intervals.target12 = setInterval(() => {
                const newTargetValue = hovers.target12;
                newTargetValue[currentSlide]++;
                setHovers((prev) => ({ ...prev, target12: newTargetValue }));
            }, 100);
        }
    };

    const handleHoverOut = (element) => {
        clearInterval(intervals[element]);
    };

    const startTest = () => {
        audioRef1.current.loop = false;
        // console.log(audioRef1.current);
        setTimeout(() => {
            audioRef1.current.play();
            audioRef1.current.src = audios[currentSlide];
            audioRef1.current.play().catch(error => {
                console.log("Playback blocked:", error);
            });
            // playAudioOnce();
            setNextEnabled(true);
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

        for (let i = 0; i < hovers.target1.length; i++) {
            formData.append("data" + i, "[" + hovers.target1[i] + "," + hovers.target2[i] + "," + hovers.target3[i] + "," + hovers.target4[i] + "," + hovers.target5[i] + "," + hovers.target6[i] + "," + hovers.target7[i] + "," + hovers.target8[i] + "," + hovers.target9[i] + "," + hovers.target10[i] + "," + hovers.target11[i] + "," + hovers.target12[i] + "]");
            formData.append("data2_" + i, "[" + "0-" + (hovers.target1[i] * .1) + ",0-" + (hovers.target2[i] * 0.1) + ",0-" + (hovers.target3[i] * 0.1) + ",0-" + (hovers.target4[i] * 0.1) + "," + "0-" + (hovers.target5[i] * .1) + ",0-" + (hovers.target6[i] * 0.1) + ",0-" + (hovers.target7[i] * 0.1) + ",0-" + (hovers.target8[i] * 0.1) + "," + "0-" + (hovers.target9[i] * .1) + ",0-" + (hovers.target10[i] * 0.1) + ",0-" + (hovers.target11[i] * 0.1) + ",0-" + (hovers.target12[i] * 0.1) + "]");
            formData.append("data3_" + i, "" + (i + 1));
            formData.append("data4_" + i, "" + 0);
            formData.append("data5_" + i, answersList[i]);
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
            <audio ref={audioRef1} src={audio1} loop={false} />

            <video 
                style={{
                    ...styles.video,
                    display: showVideo ? "block" : "none"
                    }
                } 
                ref={videoRef1} 
                src={video1} 
            />

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
                    {questions.length > currentSlide && questions[currentSlide] && 
                        <span style={styles.question}>{questions[currentSlide]}</span>
                    }
                    {answers1.length > currentSlide && answers1[currentSlide] && 
                        <button onClick={() => handleAnswerClick(answers1[currentSlide])} style={{...styles.answers, ...styles.answer1}}>{answers1[currentSlide]}</button>
                    }
                    {answers2.length > currentSlide && answers2[currentSlide] && 
                        <button onClick={() => handleAnswerClick(answers2[currentSlide])} style={{...styles.answers, ...styles.answer2}}>{answers2[currentSlide]}</button>
                    }
                    {answers3.length > currentSlide && answers3[currentSlide] && 
                        <button onClick={() => handleAnswerClick(answers3[currentSlide])} style={{...styles.answers, ...styles.answer3}}>{answers3[currentSlide]}</button>
                    }
                    {answers4.length > currentSlide && answers4[currentSlide] && 
                        <button onClick={() => handleAnswerClick(answers4[currentSlide])} style={{...styles.answers, ...styles.answer4}}>{answers4[currentSlide]}</button>
                    }
                    {seeInfo && 
                    <p style={styles.textCount}>
                        T1: {(parseFloat(hovers.target1[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        T2: {(parseFloat(hovers.target2[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T3: {(parseFloat(hovers.target3[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T4: {(parseFloat(hovers.target4[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T5: {(parseFloat(hovers.target5[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        T6: {(parseFloat(hovers.target6[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T7: {(parseFloat(hovers.target7[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T8: {(parseFloat(hovers.target8[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T9: {(parseFloat(hovers.target9[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        T10: {(parseFloat(hovers.target10[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T11: {(parseFloat(hovers.target11[currentSlide]) * 0.1).toFixed(1)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T12: {(parseFloat(hovers.target12[currentSlide]) * 0.1).toFixed(1)} 
                    </p>}
                    {/* {seeInfo && <p style={styles.imageCount}>Image count: {clicks.image[currentSlide]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: {(parseFloat(hovers.target2[currentSlide]) * 0.1).toFixed(1)}</p>} */}
                </div>
            }
            {
                finishTest && !sendReportSuccess &&
                <div style={styles.results}>
                    <h1>Your Results are:</h1>
                    <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1em" }}>
                        <thead>
                            <th style={styles.tableTH}>Slide</th>
                            <th style={styles.tableTH}>Target 1</th>
                            <th style={styles.tableTH}>Target 2</th>
                            <th style={styles.tableTH}>Answers</th>
                        </thead>
                        <tbody>
                            {
                                hovers.target1.length > 0 && hovers.target1.map((item, index) =>
                                    <tr key={index}>
                                        <td style={styles.tableTD}>{index + 1}</td>
                                        <td style={styles.tableTD}>{(parseFloat(hovers.target1[index]) * 0.1).toFixed(1)}</td>
                                        <td style={styles.tableTD}>{(parseFloat(hovers.target2[index]) * 0.1).toFixed(1)}</td>
                                        <td style={styles.tableTD}>{answersList[index]}</td>
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
                    {/* Target buttons */}
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
                        style={Object.assign({}, styles.target4[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target4")}
                        onMouseEnter={() => handleHover("target4")}
                        onMouseLeave={() => handleHoverOut("target4")}
                    ></button>

                    <button
                        style={Object.assign({}, styles.target5[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target5")}
                        onMouseEnter={() => handleHover("target5")}
                        onMouseLeave={() => handleHoverOut("target5")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target6[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target6")}
                        onMouseEnter={() => handleHover("target6")}
                        onMouseLeave={() => handleHoverOut("target6")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target7[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target7")}
                        onMouseEnter={() => handleHover("target7")}
                        onMouseLeave={() => handleHoverOut("target7")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target8[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target8")}
                        onMouseEnter={() => handleHover("target8")}
                        onMouseLeave={() => handleHoverOut("target8")}
                    ></button>

                    <button
                        style={Object.assign({}, styles.target9[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target9")}
                        onMouseEnter={() => handleHover("target9")}
                        onMouseLeave={() => handleHoverOut("target9")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target10[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target10")}
                        onMouseEnter={() => handleHover("target10")}
                        onMouseLeave={() => handleHoverOut("target10")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target11[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target11")}
                        onMouseEnter={() => handleHover("target11")}
                        onMouseLeave={() => handleHoverOut("target11")}
                    ></button>
                    <button
                        style={Object.assign({}, styles.target12[currentSlide], (!seeInfo ? styles.hideTarget : {}))}
                        onClick={() => handleClick("target12")}
                        onMouseEnter={() => handleHover("target12")}
                        onMouseLeave={() => handleHoverOut("target12")}
                    ></button>
                    {/* End target buttons */}

                    {nextEnabled &&
                        <button
                            style={styles.nextButton}
                            onClick={handleNextClick}
                        >{currentSlide >= slides.length - 1 ? "See Results" : "Next"}</button>
                    }
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
    question: {
        position: "absolute",
        left: "0vw",
        top: "15vh",
        fontSize: "35px",
        color: "#111",
        
    },
    answers: {
        position: "absolute",
        fontSize: "16px",
        color: "#f2f2f2",
        backgroundColor: "#4682b4",
        width: "40vw",
        height: "8vh"
    },
    answer1: {
        left: "7vw",
        top: "74vh",
    },
    answer2: {
        left: "49vw",
        top: "74vh",
    },
    answer3: {
        left: "7vw",
        top: "84vh",
    },
    answer4: {
        left: "49vw",
        top: "84vh",
    },
    video: {
        position: "absolute",
        left: "33vw",
        top: "38vh",
        width: "35vw"
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
        left: "11vw",
        top: "0px",
        color: "#333",
        fontSize: "12px"
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
    target4: TARGET_DATA_4,
    target5: TARGET_DATA_5,
    target6: TARGET_DATA_6,
    target7: TARGET_DATA_7,
    target8: TARGET_DATA_8,
    target9: TARGET_DATA_9,
    target10: TARGET_DATA_10,
    target11: TARGET_DATA_11,
    target12: TARGET_DATA_12,


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
    tableTH: {
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#434343",
        color: "#f0f0f0"
    },
    tableTD: {
        border: "1px solid #ccc",
        padding: "0px",
    }
};