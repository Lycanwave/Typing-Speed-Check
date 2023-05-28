import React, { useEffect, useState } from "react";
import "./timer.css";

function Timer(props) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        // console.log("render");
        let id;
        if (props.startCounting) {
            id = setInterval(() => {
                setTimeElapsed((speed) => speed + 1);
            }, 1000);
        }

        return () => {
            clearInterval(id);
        };
    }, [props.startCounting]);

    let sec = timeElapsed % 60;
    let min = Math.floor(timeElapsed / 60);
    let hour = Math.floor(min / 60);

    const minutes = timeElapsed / 60;

    return (
        <div>
            <div className="timer-container">
                <div className="item-container">
                    <div className="item-title">Time: </div>
                    <div className="item-content">
                        {`  ${
                            hour > 9 ? hour : "0" + hour.toFixed(0).toString()
                        }:${
                            min > 9 ? minutes : "0" + min.toFixed(0).toString()
                        }:${sec > 9 ? sec : "0" + sec.toString()}`}{" "}
                    </div>
                </div>
                <div className="item-container">
                    <div className="item-title"> Speed: </div>
                    <div className="item-content">
                        {" "}
                        {(props.correctWords / minutes || 0).toFixed(2)} WPM
                    </div>
                </div>
                <div className="item-container">
                    <div className="item-title"> Accuracy: </div>
                    <div className="item-content">
                        {" "}
                        {(
                            (props.correctWords / props.noOfWords) * 100 || 0
                        ).toFixed(2)}{" "}
                        %{" "}
                    </div>
                </div>
            </div>
            <div className="words-judgement">
                <div className="item-container">
                    {" "}
                    <div className="item-title">Correct Word:</div>{" "}
                    <div className="item-content">{props.correctWords}</div>{" "}
                </div>
                <div className="item-container">
                    {" "}
                    <div className="item-title">Incorrect Word:</div>{" "}
                    <div className="item-content">
                        {props.noOfWords - props.correctWords}
                    </div>{" "}
                </div>
                <div className="item-container">
                    <div className="item-title">Total Word: </div>{" "}
                    <div className="item-content">
                        {props.correctWords +
                            (props.noOfWords - props.correctWords)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timer;
