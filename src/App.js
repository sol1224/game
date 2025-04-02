import React, { useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

// 🚀3일차 가위바위 보게임 최종 결과물
// 유저가 가위, 바위, 보 버튼 클릭시 컴퓨터는 랜덤하게 선택이 되어야 한다.
// 게임의 결과가 맞게 나와야 한다 (이김, 짐, 비김이 각 카드에 유저와 컴퓨터 각자의 입장에 맞게 나와야함)
// 결과에 따라 다른 테두리색을 보여줘야한다 (예: 이김-초록, 짐-빨감, 비김- 회색)

const App = () => {
  const sissorsRockPaper = {
    rock: {
      name: "rock",
      koName: "바위",
      img: `/image/rock.jpg`,
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
        <img className="lion" img src={"images/lion.png"} alt="lion"></img>
        <div className="cong">
          두구두구! 과연 승자는<i>!</i>
        </div>
        <div className="score">
          <span className="score-sb">{userScore}</span>:
          <span className="score-sb">{computerScore}</span>
        </div>

        <div className="score"></div>

        <div className="row-width">
          <Row style={{ backgroundColor: "white" }}>
            {/* <Col xs={6}> */}
            <Col
              style={{
                border: `2px solid ${resultCss[result]?.color}`,
                borderRadius: "20px",
                overflow: "hidden",
              }}
              xs={6}
            >
              <div className="flex-row">
                <div className="whoIs">YOU</div>

                <div className="result-notice">
                  {result ? (
                    <div
                      className="resultCss-circle"
                      style={{
                        backgroundColor: resultCss[result]?.color || "",
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
                    src={`images/${select.img}`}
                    alt="paper"
                  ></img>
                ) : (
                  <img
                    className="play-game select-img"
                    src={"images/move.gif"}
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

            <Col
              xs={6}
              style={{
                ...(resultCss?.[result]?.name && {
                  border: `2px solid ${
                    resultCss[result].name === "패"
                      ? "green"
                      : resultCss[result].name === "승"
                      ? "red"
                      : "gray"
                  }`,
                }),
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
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
                    src={`images/${computerSelect.img}`}
                    alt="paper"
                  ></img>
                ) : (
                  <img
                    className="play-game select-img"
                    src={"images/move.gif"}
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
              src={"images/rock-re.png"}
              alt="rock"
              onClick={() => game("rock")}
            ></img>
          </button>
          <button className="button-style-none">
            <img
              className="sub-img"
              src={"images/sissors.png"}
              alt="sissors"
              value="sissors"
              onClick={() => game("sissors")}
            ></img>
          </button>
          <button className="button-style-none">
            <img
              className="sub-img"
              src={"images/paper.png"}
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
