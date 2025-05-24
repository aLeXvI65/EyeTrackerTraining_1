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

const isDebug = true;

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
];

const readingData = [
    [
        { maskTop: 0, height: "11vh", imgTop: 47, imgLeft: 39, imgWidth: "22vh", imgHeight: "30vh", time: 8.2 },
        { maskTop: 13, height: "29vh", imgTop: 26, imgLeft: 28, imgWidth: "25vh", imgHeight: "18vh", time: 16 },
        { maskTop: 43, height: "8vh", imgTop: 42, imgLeft: 40, imgWidth: "45vh", imgHeight: "15vh", time: 5.3 },
        { maskTop: 51, height: "8vh", imgTop: 28, imgLeft: 54, imgWidth: "15vh", imgHeight: "15vh", time: 4.5 },
        { maskTop: 59, height: "15vh", imgTop: 33, imgLeft: 0, imgWidth: "38vh", imgHeight: "45vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "18vh", imgTop: 5, imgLeft: 5, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 10.2 },
        { maskTop: 18, height: "11vh", imgTop: 3, imgLeft: 38, imgWidth: "41vh", imgHeight: "25vh", time: 3.2 },
        { maskTop: 30, height: "22vh", imgTop: 18, imgLeft: 0, imgWidth: "48vh", imgHeight: "58vh", time: 3.2 }, 
    ],
    [
        { maskTop: 0, height: "25vh", imgTop: 0, imgLeft: 0, imgWidth: "77vh", imgHeight: "23vh", time: 15 },
        { maskTop: 25, height: "17vh", imgTop: 23, imgLeft: 0, imgWidth: "77vh", imgHeight: "13vh", time: 8 },
        { maskTop: 42, height: "26vh", imgTop: 36, imgLeft: 0, imgWidth: "77vh", imgHeight: "36vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "14vh", imgTop: 5, imgLeft: 5, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 13.2 },
        { maskTop: 14, height: "29vh", imgTop: 0, imgLeft: 0, imgWidth: "94vh", imgHeight: "25vh", time: 22.8 },
        { maskTop: 43, height: "20vh", imgTop: 25, imgLeft: 0, imgWidth: "94vh", imgHeight: "21vh", time: 17.1 },
        { maskTop: 63, height: "14vh", imgTop: 46, imgLeft: 0, imgWidth: "94vh", imgHeight: "26vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "19vh", imgTop: 5, imgLeft: 5, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 13.4 },
        { maskTop: 19, height: "21vh", imgTop: 0, imgLeft: 0, imgWidth: "28vh", imgHeight: "50vh", time: 6.2 },
        { maskTop: 19, height: "21vh", imgTop: 0, imgLeft: 63, imgWidth: "37vh", imgHeight: "25vh", time: 6 },
        { maskTop: 40, height: "14vh", imgTop: 17, imgLeft: 45, imgWidth: "55vh", imgHeight: "33vh", time: 9 },
        { maskTop: 54, height: "14vh", imgTop: 19, imgLeft: 30, imgWidth: "15vh", imgHeight: "31vh", time: 6.6 },
        { maskTop: 68, height: "14vh", imgTop: 0, imgLeft: 29, imgWidth: "33vh", imgHeight: "18vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "13vh", imgTop: 5, imgLeft: 5, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 11.7 },
        { maskTop: 13, height: "15vh", imgTop: 9, imgLeft: 0, imgWidth: "28vh", imgHeight: "26vh", time: 7.7 },  
        { maskTop: 28, height: "10vh", imgTop: 55, imgLeft: 30, imgWidth: "34vh", imgHeight: "26vh", time: 5.9 }, 
        { maskTop: 38, height: "12vh", imgTop: 11, imgLeft: 43, imgWidth: "38vh", imgHeight: "22vh", time: 9.5 }, 
        { maskTop: 50, height: "12vh", imgTop: 50, imgLeft: 0, imgWidth: "45vh", imgHeight: "12vh", time: 7.4 }, 
        { maskTop: 62, height: "16vh", imgTop: 58, imgLeft: 60, imgWidth: "21vh", imgHeight: "23vh", time: 3 }, 
    ],
    [
        { maskTop: 0, height: "19vh", imgTop: 5, imgLeft: 5, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 10.7 },
        { maskTop: 19, height: "10vh", imgTop: 5, imgLeft: 5, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 5.4 },
        { maskTop: 29, height: "10vh", imgTop: 7, imgLeft: 69, imgWidth: "20vh", imgHeight: "27vh", time: 4.2 },
        { maskTop: 39, height: "18vh", imgTop: 0, imgLeft: 0, imgWidth: "24vh", imgHeight: "31vh", time: 9.1 },
        { maskTop: 57, height: "10vh", imgTop: 8, imgLeft: 22, imgWidth: "32vh", imgHeight: "23vh", time: 3.5 },
        { maskTop: 67, height: "14vh", imgTop: 8, imgLeft: 54, imgWidth: "15vh", imgHeight: "20vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "17vh", imgTop: 0, imgLeft: 0, imgWidth: "99vh", imgHeight: "31vh", time: 6.1 },
        { maskTop: 17, height: "22vh", imgTop: 31, imgLeft: 0, imgWidth: "99vh", imgHeight: "23vh", time: 4.2 },
        { maskTop: 39, height: "23vh", imgTop: 54, imgLeft: 0, imgWidth: "99vh", imgHeight: "21vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "32vh", imgTop: 0, imgLeft: 0, imgWidth: "16vh", imgHeight: "55vh", time: 19.6 },
        { maskTop: 32, height: "32vh", imgTop: 0, imgLeft: 16, imgWidth: "23vh", imgHeight: "55vh", time: 17 },
        { maskTop: 64, height: "8vh", imgTop: 0, imgLeft: 39, imgWidth: "30vh", imgHeight: "55vh", time: 7.7 },
        { maskTop: 72, height: "10vh", imgTop: 0, imgLeft: 69, imgWidth: "21.5vh", imgHeight: "55vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "12vh", imgTop: 0, imgLeft: 0, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 8.8 },
        { maskTop: 12, height: "18vh", imgTop: 0, imgLeft: 0, imgWidth: "97vh", imgHeight: "40vh", time: 13.9 },
        { maskTop: 30, height: "12vh", imgTop: 0, imgLeft: 0, imgWidth: "97vh", imgHeight: "40vh", time: 6 },
        { maskTop: 42, height: "14vh", imgTop: 40, imgLeft: 0, imgWidth: "97vh", imgHeight: "20vh", time: 7.8 },
        { maskTop: 56, height: "12vh", imgTop: 60, imgLeft: 0, imgWidth: "97vh", imgHeight: "10vh", time: 7 },
        { maskTop: 68, height: "12vh", imgTop: 70, imgLeft: 0, imgWidth: "97vh", imgHeight: "18vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "18vh", imgTop: 0, imgLeft: 0, imgWidth: "81vh", imgHeight: "58vh", time: 3 },
        { maskTop: 18, height: "28vh", imgTop: 58, imgLeft: 32, imgWidth: "49vh", imgHeight: "21vh", time: 3 },
        { maskTop: 46, height: "33vh", imgTop: 53, imgLeft: 0, imgWidth: "40vh", imgHeight: "39vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "27vh", imgTop: 32, imgLeft: 30, imgWidth: "57.5vh", imgHeight: "14vh", time: 3 },
        { maskTop: 27, height: "15vh", imgTop: 0, imgLeft: 19, imgWidth: "42vh", imgHeight: "33vh", time: 3 },
        { maskTop: 42, height: "10vh", imgTop: 0, imgLeft: 19, imgWidth: "42vh", imgHeight: "33vh", time: 3 },
        { maskTop: 52, height: "12vh", imgTop: 45, imgLeft: 0, imgWidth: "56vh", imgHeight: "10vh", time: 3 },
        { maskTop: 64, height: "8vh", imgTop: 55, imgLeft: 0, imgWidth: "87vh", imgHeight: "16vh", time: 3 },
        { maskTop: 72, height: "10vh", imgTop: 45, imgLeft: 50, imgWidth: "37.5vh", imgHeight: "14vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "14vh", imgTop: 0, imgLeft: 0, imgWidth: "84vh", imgHeight: "44vh", time: 3 },
        { maskTop: 14, height: "25vh", imgTop: 44, imgLeft: 0, imgWidth: "35vh", imgHeight: "50vh", time: 3 },
        { maskTop: 39, height: "40vh", imgTop: 44, imgLeft: 35, imgWidth: "49vh", imgHeight: "48vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "27vh", imgTop: 0, imgLeft: 0, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 3 },
        { maskTop: 27, height: "6vh", imgTop: 0, imgLeft: 42, imgWidth: "26vh", imgHeight: "44vh", time: 3 },
        { maskTop: 33, height: "14vh", imgTop: 0, imgLeft: 68, imgWidth: "23vh", imgHeight: "44vh", time: 3 },
        { maskTop: 47, height: "10vh", imgTop: 0, imgLeft: 68, imgWidth: "23vh", imgHeight: "44vh", time: 3 },
        { maskTop: 57, height: "5vh", imgTop: 44, imgLeft: 0, imgWidth: "91vh", imgHeight: "13vh", time: 3 },
        { maskTop: 62, height: "10vh", imgTop: 57, imgLeft: 0, imgWidth: "91vh", imgHeight: "8vh", time: 3 },
        { maskTop: 72, height: "7vh", imgTop: 65, imgLeft: 0, imgWidth: "91vh", imgHeight: "25vh", time: 3 },
    ],
    [
        { maskTop: 0, height: "17vh", imgTop: 0, imgLeft: 0, imgWidth: "0.5vh", imgHeight: "0.5vh", time: 3 },
        { maskTop: 17, height: "20vh", imgTop: 25, imgLeft: 0, imgWidth: "35vh", imgHeight: "15vh", time: 3 },
        { maskTop: 37, height: "9vh", imgTop: 25, imgLeft: 32, imgWidth: "38vh", imgHeight: "11vh", time: 3 },
        { maskTop: 46, height: "10vh", imgTop: 38, imgLeft: 0, imgWidth: "38vh", imgHeight: "11vh", time: 3 },
        { maskTop: 56, height: "17vh", imgTop: 43, imgLeft: 4, imgWidth: "50vh", imgHeight: "29vh", time: 3 },
    ]
    ,
    [
        { maskTop: 0, height: "15vh", imgTop: 0, imgLeft: 0, imgWidth: "17vh", imgHeight: "50vh", time: 3 },
        { maskTop: 15, height: "13vh", imgTop: 0, imgLeft: 17, imgWidth: "13vh", imgHeight: "50vh", time: 3 },
        { maskTop: 28, height: "13vh", imgTop: 0, imgLeft: 30, imgWidth: "15vh", imgHeight: "50vh", time: 3 },
        { maskTop: 41, height: "13vh", imgTop: 0, imgLeft: 45, imgWidth: "16vh", imgHeight: "50vh", time: 3 },
        { maskTop: 54, height: "13vh", imgTop: 0, imgLeft: 61, imgWidth: "38vh", imgHeight: "50vh", time: 3 },
        { maskTop: 67, height: "13vh", imgTop: 0, imgLeft: 61, imgWidth: "38vh", imgHeight: "50vh", time: 3 },
    ]
];

const offsets = [
    {
        textLeft: 0,
        textTop: 18,
        imgLeft: 101.7,
        imgTop: 16
    },
    {
        textLeft: 0,
        textTop: 28,
        imgLeft: 109,
        imgTop: 18
    },
    {
        textLeft: 0,
        textTop: 24,
        imgLeft: 108,
        imgTop: 18
    },
    {
        textLeft: 0,
        textTop: 19,
        imgLeft: 99.7,
        imgTop: 20
    },
    {
        textLeft: 0,
        textTop: 14,
        imgLeft: 95.5,
        imgTop: 27
    },
    {
        textLeft: 0,
        textTop: 15,
        imgLeft: 108,
        imgTop: 11
    },
    {
        textLeft: 0,
        textTop: 14,
        imgLeft: 101.5,
        imgTop: 18.5
    },
    {
        textLeft: 0,
        textTop: 24,
        imgLeft: 93.5,
        imgTop: 17
    },
    {
        textLeft: 0,
        textTop: 14,
        imgLeft: 94.5,
        imgTop: 24
    },
    {
        textLeft: 0,
        textTop: 17,
        imgLeft: 90.5,
        imgTop: 6
    },
    {
        textLeft: 0,
        textTop: 15.5,
        imgLeft: 99.8,
        imgTop: 5
    },
    {
        textLeft: 0,
        textTop: 13,
        imgLeft: 104,
        imgTop: 3
    },
    {
        textLeft: 0,
        textTop: 15,
        imgLeft: 99.5,
        imgTop: 2
    },
    {
        textLeft: 0,
        textTop: 12,
        imgLeft: 98.7,
        imgTop: 6.5
    },
    {
        textLeft: 0,
        textTop: 17.5,
        imgLeft: 116.5,
        imgTop: 17
    },
    {
        textLeft: 0,
        textTop: 11.5,
        imgLeft: 93.5,
        imgTop: 24
    }
];

const numSlides = 20;
const trainingId = 11;

export default function TextFollowingTest() {
    const { userId, setUserId } = useContext(UserContext);

    const [clicks, setClicks] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: 0 });
    const [hovers, setHovers] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: [] });
    const [highligtedClicks, setHighlightedClicks] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: 0 });
    const [highLightedHovers, setHighlightedHovers] = useState({ button: 0, image: Array(numSlides).fill(0), text: Array(numSlides).fill(0), figure: [] });
    const [step, setStep] = useState(0);
    const [sendReportSuccess, setSendReportSuccess] = useState(false);

    const [currentSlide, setCurrentSlide] = useState(15);
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
            //audioRef1.current.play();
            audios[currentSlide].current.play().catch(error => console.log("Reproducción bloqueada:", error));
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
        top: "18vh",
        width: "38vw",
        height: "73vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "10vw",
        top: "28vh",
        width: "40vw",
        height: "51vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "10vw",
        top: "24vh",
        width: "41vw",
        height: "68vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "7vw",
        top: "19vh",
        width: "40vw",
        height: "76vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "9vw",
        top: "14vh",
        width: "37vw",
        height: "78vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "10vw",
        top: "15vh",
        width: "40vw",
        height: "78vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "8vw",
        top: "14vh",
        width: "40vw",
        height: "78vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "6.5vw",
        top: "24vh",
        width: "34.5vw",
        height: "62vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "6vw",
        top: "14vh",
        width: "39vw",
        height: "79vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "6vw",
        top: "17vh",
        width: "37.3vw",
        height: "79vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "6vw",
        top: "15.5vh",
        width: "38.5vw",
        height: "79vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "8vw",
        top: "13vh",
        width: "42vw",
        height: "81vh",
        backgroundColor: "rgba(0,0,0,0)"
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
    // Image targets




    imageTarget: [{
        position: "absolute",
        left: "49vw",
        top: "16vh",
        width: "41vw",
        height: "77vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "52.5vw",
        top: "18vh",
        width: "38vw",
        height: "75vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "52vw",
        top: "18vh",
        width: "37vw",
        height: "72vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "48vw",
        top: "20vh",
        width: "45vw",
        height: "72vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "46vw",
        top: "27vh",
        width: "48vw",
        height: "50vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "52vw",
        top: "11vh",
        width: "39vw",
        height: "81vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "49vw",
        top: "18.5vh",
        width: "42.5vw",
        height: "75vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "45vw",
        top: "17vh",
        width: "47.5vw",
        height: "75vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "45.5vw",
        top: "24vh",
        width: "43.5vw",
        height: "55vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "43.5vw",
        top: "6vh",
        width: "46.5vw",
        height: "88vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "48vw",
        top: "5vh",
        width: "39vw",
        height: "92vh",
        backgroundColor: "rgba(0,0,0,0)"
    },
    {
        position: "absolute",
        left: "50vw",
        top: "3vh",
        width: "42vw",
        height: "90vh",
        backgroundColor: "rgba(0,0,0,0)"
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