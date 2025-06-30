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
import TargetTest from './components/TargetTest'

const trainingIds = {
  Normal: 10,
  TextFollowing: 11,
  NarrativeNoFollow: 14
}

function App() {
  const { userId, setUserId } = useContext(UserContext);

  const [startTest, setStartTest] = useState(false);
  const [hasLogin, setHasLogin] = useState(false);
  const [hasFinishedTargetTest, setHasFinishedTargetTest] = useState(false);
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

          const elem = document.documentElement;
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) {
              elem.webkitRequestFullscreen(); // Safari
          } else if (elem.msRequestFullscreen) {
              elem.msRequestFullscreen(); // IE/Edge
          }
          
        }
      })
      .catch(error => {
        console.error("Request error:", error);
      });
  }

  const handleStart = (value) => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(); // Safari
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen(); // IE/Edge
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

  let testComponent = <TextFollowingTest isTextFollowing={false} />;
  if (selectedTest === "TextFollowing") testComponent = <TextFollowingTest />;
  else if (selectedTest === "NarrativeNoFollow") testComponent = <BioImagesNarrativeNoFollow />;

  return (
    <>
      {!hasLogin && startTest && <Login onLogin={handleLogin} error={loginError} />}
      {
        !startTest && !hasLogin  && <StartMenu onStart={handleStart} />
      }
      {
        startTest && !hasLogin  && hasFinishedTargetTest && <TargetTest onFinish={handleFinish} />
      }
      {
        startTest && hasLogin && testComponent
      }
    </>
  )
}

export default App
