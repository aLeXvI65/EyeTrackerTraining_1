import { useEffect, useRef, useState } from "react";

export default function Login({ onLogin, error }) {
  const username = useRef();
  const pass = useRef();

  const keyHandle = (e) => {
    if (e.key === "Enter") {
      onLogin(username, pass);
    }
  }

  return (
    <div className="" style={styles.container}>
      <h1>LOGIN</h1>
      <div style={styles.startContainer}>
        <input style={styles.input} ref={username} type="text" placeholder="Username" onKeyDown={(e) => keyHandle(e)} /><br />
        <input style={styles.input} ref={pass} type="password" placeholder="Password" onKeyDown={(e) => keyHandle(e)} /><br />
        <button style={styles.startButton} onClick={() => onLogin(username, pass)}>Login</button>
        { error && <div style={styles.errorMessage}><span>{error}</span></div>}
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
    color: "#111",
  },
  startContainer: {
    color: "#333",
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',  // centra horizontal
    alignItems: 'center',      // centra vertical
  },
  startButton: {
  },
  input: {
    backgroundColor: "white",
    width: "16em",
    height: "2.5em",
    borderRadius: "8px",
    color: "#121212",
  },
  errorMessage: {
    color: "red"
  }
};