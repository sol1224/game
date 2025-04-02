import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

const App = () => {
  const sissorsRockPaper = {
    rock: {
      name: "rock",
      koName: "바위",
      img: "/image/rock-re.jpg",
    },
    sissors: {
      name: "sissors",
      koName: "가위",
      img: "/image/sissors.png",
    },
    paper: {
      name: "paper",
      koName: "보",
      img: "/image/paper.png",
    },
  };

  const [select, setSelect] = useState("");
  const [computerSelect, setComputerSelect] = useState("");
  const [result, setResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const game = userSelect => {
    setSelect(sissorsRockPaper[userSelect]);
    const computer = computerPick();
    setComputerSelect(sissorsRockPaper[computer]);
    setResult(winOrLose(userSelect, computer));
    scoreSum(winOrLose(userSelect, computer));
  };

  const ResultCss = result => {
    if (result === "tie") {
      return "gray";
    } else if (result === "win") {
      return "green";
    } else if (result === "lose") {
      return "red";
    }
  };

  const resultCss = {
    tie: { name: "비김", color: "gray" },
    win: { name: "승", color: "green" },
    lose: { name: "패", color: "red" },
  };

  //   console.log("resultCss", ResultCss(result));

  // computer random choice
  const computerPick = () => {
    let items = Object.keys(sissorsRockPaper);
    let randomIndex = Math.floor(Math.random() * items.length);
    let item = items[randomIndex];
    return item;
  };

  const scoreSum = result => {
    if (result === "win") {
      setUserScore(userScore + 1);
    } else if (result === "lose") {
      setComputerScore(computerScore + 1);
    } else return "tie";
  };

  const finish = () => {
    if (userScore === computerScore && (userScore && computerSelect) === 0) {
      return <div className="font-size-42">"게임을 시작해주세요!😜"</div>;
    } else if (
      userScore === computerScore &&
      (userScore && computerSelect) !== 0
    ) {
      return "비겼다!";
    } else if (userScore > computerScore) {
      return "얏호~! 이겼다!";
    } else {
      return <div className="font-size-42">"패배...다음 기회에😢"</div>;
    }
  };

  const reset = () => {
    setSelect("");
    setComputerSelect("");
    setUserScore(0);
    setComputerScore(0);
    setResult("");
  };

  const winOrLose = (select, computerSelect) => {
    // win|lose|tie
    if (select === computerSelect) {
      return "tie";
    } else if (select === "rock")
      return computerSelect === "sissors" ? "win" : "lose";
    else if (select === "sissors")
      return computerSelect === "paper" ? "win" : "lose";
    else if (select === "paper")
      return computerSelect === "rock" ? "win" : "lose";
  };

  return (
    <div className="main">
      <Container className="bootstrap-container-re">
        <img className="lion" src="/image/lion.png" alt="lion"></img>
        <div className="cong">
          두구두구! 과연 승자는<i>!</i>
        </div>
        <div className="score">
          <span className="score-sb">{userScore}</span>:
          <span className="score-sb">{computerScore}</span>
        </div>

        <div className="score"></div>

        <div className="row-width">
          <Row>
            <Col xs={6}>
              <div className="flex-row">
                <div className="whoIs">YOU</div>

                <div className="result-notice">
                  {result ? (
                    <div
                      className="resultCss-circle"
                      style={{
                        backgroundColor: resultCss[result]?.color || (
                          <span>""</span>
                        ),
                      }}
                    >
                      {resultCss[result].name}
                      {/* 'black' as a fallback color */}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              {/* console.log("나와랏!!!", resultCss[result].color); */}

              <div className="play-game-center border-right">
                {select ? (
                  <img
                    className="play-game select-img"
                    src={select.img}
                    alt="paper"
                  ></img>
                ) : (
                  <img
                    className="play-game select-img"
                    src="/image/move.gif"
                    alt="paper"
                  ></img>
                )}
              </div>
              <div className="me-select">
                {select ? (
                  <div className="me-select">쨘! {select.koName} 냈지롱!</div>
                ) : (
                  <div className="me-select">준비</div>
                )}
              </div>
            </Col>
            <Col xs={6}>
              <div className="flex-row">
                <div className="whoIs">COMPUTER</div>

                <div className="result-notice">
                  {result ? (
                    <div
                      className="resultCss-circle"
                      style={{
                        backgroundColor:
                          resultCss[result].name === "패"
                            ? "green"
                            : resultCss[result].name === "승"
                            ? "red"
                            : "gray" || <span>""</span>,
                      }}
                    >
                      {resultCss[result].name === "승"
                        ? "패"
                        : resultCss[result].name === "패"
                        ? "승"
                        : "비김"}
                      {/* 'black' as a fallback color */}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>

              <div className="play-game-center">
                {computerSelect ? (
                  <img
                    className="play-game select-img"
                    src={computerSelect.img}
                    alt="paper"
                  ></img>
                ) : (
                  <img
                    className="play-game select-img"
                    src="/image/move.gif"
                    alt="paper"
                  ></img>
                )}

                <div className="computer-select">
                  {computerSelect ? (
                    <div className="computer-select">
                      난, {computerSelect.koName} 냈다!
                    </div>
                  ) : (
                    <div className="computer-select">준비</div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="select-button">
          <button className="button-style-none">
            <img
              className="sub-img"
              src="/image/rock.png"
              alt="rock"
              onClick={() => game("rock")}
            ></img>
          </button>
          <button className="button-style-none">
            <img
              className="sub-img"
              src="/image/sissors.png"
              alt="sissors"
              value="sissors"
              onClick={() => game("sissors")}
            ></img>
          </button>
          <button className="button-style-none">
            <img
              className="sub-img"
              src="/image/paper.png"
              alt="paper"
              value="paper"
              onClick={() => game("paper")}
            ></img>
          </button>
        </div>
        <div className="button-div">
          <Button
            variant="danger"
            className={"modal-open-btn button-style"}
            onClick={() => setModalOpen(true)}
          >
            결과
          </Button>
          <Button className="button-style" variant="warning" onClick={reset}>
            다시시작
          </Button>
        </div>
        {modalOpen && (
          <div
            className={"modal-container"}
            ref={modalBackground}
            onClick={e => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          >
            <div className={"modal-content"}>
              <p className="modal-text">{finish()}</p>

              {/* <p className="modal-text">win!!</p> */}
              <button
                className={"modal-close-btn"}
                onClick={() => setModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        <img className="lion2" src="/image/lion2.png" alt="lion2"></img>
      </Container>
    </div>
  );
};

export default App;
