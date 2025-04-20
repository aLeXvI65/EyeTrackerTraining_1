import { use, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NormalTest from './components/NormalTest'
import StartMenu from './components/StartMenu'
import TextFollowingTest from './components/TextFollowingTest'
import Login from './components/Login'
import { UserContext } from './context/UserContext'

function App() {
  const { userId, setUserId } = useContext(UserContext);

  const [startTest, setStartTest] = useState(false);
  const [hasLogin, setHasLogin] = useState(false);
  const [selectedTest, setSelectedTest] = useState("none");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (username, pass) => {
    const name = username.current.value;
    const password = pass.current.value;
    console.log(name + "," + password);

    fetch("https://eyetrackingtraining.com/corporate/getTrainerLoginByName.php?name=" + name + "&pass=" + password)
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
        }
      })
      .catch(error => {
        console.error("Request error:", error);
      });
  }

  const handleStart = (value) => {
    setStartTest(true);
    setSelectedTest(value);
    console.log("start: " + value);
  }

  return (
    <>
      {!hasLogin && <Login onLogin={handleLogin} error={loginError} />}
      {
        !startTest && hasLogin && <StartMenu onStart={handleStart} />
      }
      {
        startTest && hasLogin && (selectedTest !== "TextFollowing" ? <NormalTest /> : <TextFollowingTest />)
      }
    </>
  )
}

export default App
