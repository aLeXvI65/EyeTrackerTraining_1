import { useEffect, useRef, useState } from "react";

export default function StartMenu({ onStart }) {

  const [openGroup1, setOpenGroup1] = useState(true);
  const [openGroup2, setOpenGroup2] = useState(true);

  return (
    <div>
      {/* Grupo 1 */}
      <div>
        <div
          style={styles.sectionTitle}
          onClick={() => setOpenGroup1(!openGroup1)}
        >
          Bio Images tests {openGroup1 ? "▲" : "▼"}
        </div>
        {openGroup1 && (
          <div style={styles.sectionContent}>
            <button
              style={styles.startButton}
              onClick={() => onStart("Normal")}
            >
              Start Normal test
            </button>
            <button
              style={styles.startButton}
              onClick={() => onStart("TextFollowing")}
            >
              Start Test with text following
            </button>
            <button
              style={styles.startButton}
              onClick={() => onStart("NarrativeNoFollow")}
            >
              Start Test with narrative text
            </button>
            <button
              style={styles.startButton}
              onClick={() => onStart("BioImagesQuestions")}
            >
              Bio Images Questions
            </button>
          </div>
        )}
      </div>

      {/* Grupo 2 */}
      <div>
        <div
          style={styles.sectionTitle}
          onClick={() => setOpenGroup2(!openGroup2)}
        >
          Custom Projects {openGroup2 ? "▲" : "▼"}
        </div>
        {openGroup2 && (
          <div style={styles.sectionContent}>
            <button
              style={styles.startButton}
              onClick={() => onStart("CustomProject")}
            >
              Start Custom Project
            </button>
            <button
              style={styles.startButton}
              onClick={() => onStart("PlantsBaseProject")}
            >
              Plants Base Project
            </button>
          </div>
        )}
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
    padding: "10px 20px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer"
  },
  sectionTitle: {
    marginTop: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#131313",
    fontSize: "24px",
    border: "solid 2px",
    borderRadius: "4px",
    width: "60vw"
  },
  sectionContent: {
    marginLeft: "10px",
    marginTop: "5px"
  }
};