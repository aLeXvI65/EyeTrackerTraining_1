import { useEffect, useRef, useState } from "react";

export default function StartMenu({ onStart }) {

  return (
    <div className="" style={styles.container}>
        <div style={styles.startContainer}>
          <h1>CHOOSE THE TEST TYPE</h1>
          <button style={styles.startButton} onClick={() => onStart("Normal")}>Start Normal test</button>
          <button style={styles.startButton} onClick={() => onStart("TextFollowing")}>Start Test with text following</button>
          <button style={styles.startButton} onClick={() => onStart("NarrativeNoFollow")}>Start Test with narrative text</button>
          <button style={styles.startButton} onClick={() => onStart("CustomProject")}>Start Custom Project</button>
        </div>
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
    color: "white"
  },
  startContainer: {
    color: "#333"
  },
  startButton: {
    marginLeft: "2em",
    color: "white"
  }
};