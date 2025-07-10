import { use, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NormalTest from './components/NormalTest'
import StartMenu from './components/StartMenu'
import TextFollowingTest from './components/TextFollowingTest'
import Login from './components/Login'
import { UserContext } from './context/UserContext'
import BioImagesNarrativeNoFollow from './components/BioImages/BioImagesNarrativeNoFollow'
import TargetTest from './components/TargetTests/TargetTest'
import TargetTest2 from './components/TargetTests/TargetTest2'
import CustomProjectTest from './components/CustomProject/CustomProjectTest'
import BioImagesQuestions from './components/Projects/BioImagesQuestions'
import PlantsBaseProject from './components/Projects/PlantsBaseProject'

const trainingIds = {
  Normal: 10,
  TextFollowing: 11,
  NarrativeNoFollow: 14,
  CustomProject: 15,
  BioImagesQuestions: 16,
  PlantsBaseProject: 15
}

const isDebug = false;

const skipTest1 = isDebug;
const skipTest2 = isDebug;
const disableFullScreen = isDebug;
const autoFillLogin = isDebug;
const seeInfo = isDebug;

function App() {
  const { userId, setUserId } = useContext(UserContext);

  const [startTest, setStartTest] = useState(false);
  const [hasLogin, setHasLogin] = useState(false);
  const [hasFinishedTargetTest, setHasFinishedTargetTest] = useState(false);
  const [hasFinishedTargetTest2, setHasFinishedTargetTest2] = useState(false);
  const [selectedTest, setSelectedTest] = useState("none");
  const [selectedTestId, setSelectedTestId] = useState(0);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (username, pass) => {
    const name = username.current.value;
    const password = pass.current.value;
    console.log(name + "," + password);

    fetch("https://eyetrackingtraining.com/corporate/getTrainerLoginByName.php?name=" + name + "&pass=" + password+"&trainingId="+selectedTestId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server response error');
        }
        return response.text(); // si el PHP hace un echo simple
        // o usar .json() si devuelve JSON
      })
      .then(data => {
        console.log("Respuesta del PHP:", data);
        if (data === "Login failed") {
          setLoginError("The user name or password are wrong, please try again!");
        }
        else {
          setUserId(data);
          setHasLogin(true);

          if (!disableFullScreen) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(); // Safari
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen(); // IE/Edge
            }
          }
          
        }
      })
      .catch(error => {
        console.error("Request error:", error);
      });
  }

  const handleStart = (value) => {
    if (!disableFullScreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(); // Safari
      } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen(); // IE/Edge
      }
    }

    setTimeout(() => {
      setStartTest(true);
      setSelectedTest(value);
      //console.log(value+": "+trainingIds[value]);
      setSelectedTestId(trainingIds[value]);
      // console.log("start: " + value);
    }, 500);
    
  }

  const handleFinish = () => {
    setHasFinishedTargetTest(true);
  }

  const handleFinish2 = () => {
    setHasFinishedTargetTest2(true);
  }

  let testComponent = <TextFollowingTest isTextFollowing={false} />;
  if (selectedTest === "TextFollowing") testComponent = <TextFollowingTest />;
  else if (selectedTest === "NarrativeNoFollow") testComponent = <BioImagesNarrativeNoFollow />;
  else if (selectedTest === "CustomProject") testComponent = <CustomProjectTest trainingId={selectedTestId} enableSeeInfo={seeInfo} />;
  else if (selectedTest === "BioImagesQuestions") testComponent = <BioImagesQuestions trainingId={selectedTestId} enableSeeInfo={seeInfo} />;
  else if (selectedTest === "PlantsBaseProject") testComponent = <PlantsBaseProject trainingId={selectedTestId} enableSeeInfo={seeInfo} />;
  

  return (
    <>
      {!hasLogin && startTest && hasFinishedTargetTest && hasFinishedTargetTest2 && <Login onLogin={handleLogin} error={loginError} autoFill={autoFillLogin} />}
      {
        !startTest && !hasLogin  && !hasFinishedTargetTest && !hasFinishedTargetTest2 && <StartMenu onStart={handleStart} />
      }
      {
        startTest && !hasLogin  && !hasFinishedTargetTest && !hasFinishedTargetTest && <TargetTest onFinish={handleFinish} skip={skipTest1} />
      }
      {
        startTest && !hasLogin  && hasFinishedTargetTest && !hasFinishedTargetTest2 && <TargetTest2 onFinish={handleFinish2} skip={skipTest2} />
      }
      {
        startTest && hasLogin && testComponent
      }
    </>
  )
}

export default App
