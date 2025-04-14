import { useEffect, useRef, useState } from "react";

export default function Login({ onLogin }) {
    const username = useRef();
    const pass = useRef();

  return (
    <div className="" style={styles.container}>
        <h1>LOGIN</h1>
        <div style={styles.startContainer}>
          <input style={styles.input} ref={username}  type="text" placeholder="Username" /><br/>
          <input style={styles.input} ref={pass} type="password" placeholder="Password" /><br />
          <button style={styles.startButton} onClick={() => onLogin(username, pass)}>Login</button>
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
  }
};