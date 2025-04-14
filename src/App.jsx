import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NormalTest from './components/NormalTest'
import StartMenu from './components/StartMenu'
import TextFollowingTest from './components/TextFollowingTest'

function App() {
  const [startTest, setStartTest] = useState(false);
  const [selectedTest, setSelectedTest] = useState("none");

  const handleStart = (value) => {
    setStartTest(true);
    setSelectedTest(value);
    console.log("start: "+value);
  }

  return (
    <>
      {
        !startTest && <StartMenu onStart={handleStart} />
      }
      {
        startTest && (selectedTest !== "TextFollowing" ? <NormalTest /> : <TextFollowingTest />)
      }
    </>
  )
}

export default App
