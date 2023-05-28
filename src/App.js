import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Timer from "./components/timer";

const getCloud = () =>
    `codedam muhul playground react nextjs macbook windows elon musk bitcoin dogecoin cryptocurrency tesla spacex editor coding html javascript world eachmars heater wood blanket`.split(
        " "
    );
// .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props) {
    // const effect = useRef(0);

    // useEffect(() => {
    //     effect.current += 1;
    // });

    if (props.correct === true) {
        return <span className="correct">{props.text} </span>;
    }

    if (props.correct === false) {
        return <span className="incorrect">{props.text} </span>;
    }

    if (props.active) {
        return <span className="active">{props.text} </span>;
    }

    return <span style={{ fontSize: "1.2rem" }}>{props.text} </span>;
}

Word = React.memo(Word);

function App() {
    const [userInput, setUserInput] = useState("");
    const cloud = useRef(getCloud());
    const [startCounting, setStartCounting] = useState(false);
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [correctWordArray, setCorrectWordArray] = useState([]);

    function processInput(value) {
        if (!startCounting) setStartCounting(true);
        if (value.endsWith(" ")) {
            if (activeWordIndex === cloud.current.length - 1) {
                setStartCounting(false);
                setUserInput("Completed");
                return;
            }

            setActiveWordIndex(activeWordIndex + 1);
            setUserInput("");

            //correct word
            setCorrectWordArray((data) => {
                const word = value.trim();
                const newResult = [...data];
                newResult[activeWordIndex] =
                    word === cloud.current[activeWordIndex];
                console.log(cloud.current[activeWordIndex]);
                return newResult;
            });
        } else {
            setUserInput(value);
        }
    }

    return (
        <div className="App">
            <div
                style={{
                    letterSpacing: "0.2rem",
                    color: "#4a4a56",
                    marginBottom: "10px",
                    marginTop: "10px",
                }}
            >
                TYPING SPEED TEST
            </div>
            <h1 style={{ marginBottom: "30px" }}>Test your typing skills</h1>
            <Timer
                startCounting={startCounting}
                correctWords={correctWordArray.filter(Boolean).length}
                noOfWords={correctWordArray.length}
            />

            <div className="testing-word-container">
                {cloud.current.map((word, index) => {
                    // console.log(word);
                    // if (index === activeWordIndex) {
                    //     // console.log(index, activeWordIndex, word);
                    //     return <b>{word} </b>;
                    // }

                    // return <span>{word} </span>;

                    // let flag = (word === userInput)
                    return (
                        <Word
                            text={word}
                            active={index === activeWordIndex}
                            correct={correctWordArray[index]}
                        />
                    );
                })}
            </div>
            <h2 style={{ color: "#800080" }}>
                {cloud.current[activeWordIndex]}
            </h2>
            <input
                type="text"
                className="input"
                value={userInput}
                placeholder="Start Typing"
                onChange={(e) => processInput(e.target.value)}
            />
        </div>
    );
}

export default App;
