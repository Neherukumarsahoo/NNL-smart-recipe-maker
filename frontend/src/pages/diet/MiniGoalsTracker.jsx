import React, { useState } from "react";
import { Card, ListGroup, Button, ProgressBar, Row, Col, Alert } from "react-bootstrap";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const MiniGoalsTracker = () => {
  const goalList = [
    "Drink 8 glasses of water 💧",
    "Eat 5 servings of vegetables 🥦",
    "Limit sugar intake 🍭",
    "No fast food today 🚫🍔",
    "Eat fruits instead of snacks 🍎",
    "Avoid sugary drinks 🥤🚫",
    "Finish meals before 8 PM ⏰",
  ];

  const [checkedGoals, setCheckedGoals] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const [width, height] = useWindowSize();

  const toggleGoal = (goal) => {
    if (checkedGoals.includes(goal)) {
      setCheckedGoals(checkedGoals.filter((g) => g !== goal));
    } else {
      setCheckedGoals([...checkedGoals, goal]);
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const markAllDone = () => {
    setCheckedGoals([...goalList]);
    showMessage("✅ Successfully submitted!", "success");
  };

  const resetGoals = () => {
    setCheckedGoals([]);
    showMessage("🔁 Successfully reset!", "danger");
  };

  const completionPercentage = Math.round((checkedGoals.length / goalList.length) * 100);

  return (
    <Card className="mb-4 goal-card shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-3">🥗 Mini Diet Goals Tracker</Card.Title>

        {checkedGoals.length === goalList.length && (
          <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
        )}

        <ProgressBar
          now={completionPercentage}
          label={`${completionPercentage}%`}
          variant={completionPercentage === 100 ? "success" : "info"}
          className="mb-3"
        />

        {message && (
          <Alert variant={messageType} className="text-center fw-semibold animate__animated animate__fadeInDown">
            {message}
          </Alert>
        )}

        <ListGroup variant="flush">
          {goalList.map((goal, idx) => (
            <ListGroup.Item
              key={idx}
              onClick={() => toggleGoal(goal)}
              className={`d-flex justify-content-between align-items-center goal-item ${
                checkedGoals.includes(goal)
                  ? "bg-success text-white text-decoration-line-through"
                  : ""
              }`}
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            >
              {goal}
              {checkedGoals.includes(goal) ? "✅" : "⬜"}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Row className="mt-3 text-center">
          <Col>
            <Button variant="outline-success" size="sm" onClick={markAllDone}>
              Mark All Done
            </Button>
          </Col>
          <Col>
            <Button variant="outline-danger" size="sm" onClick={resetGoals}>
              Reset Goals
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MiniGoalsTracker;
