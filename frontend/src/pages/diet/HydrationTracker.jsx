import React, { useState } from "react";
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap";
import 'animate.css';
import glassIcon from './zcqn_r6mq_140725.jpg'; // Add a glass image in your assets and import it
import waterSound from './glass-shatter-7-95202.mp3'; // Add a water sound file

import './hydration.css';

const quotes = [
  "Stay strong, stay hydrated! 💪",
  "Every drop counts! 💧",
  "You're fueling greatness with every glass!",
  "Hydration = Energy. Keep going!",
  "Small sips, big impact.",
  "One glass closer to your best self!",
];

const HydrationTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const [quote, setQuote] = useState("");

  const handleAddGlass = () => {
    const audio = new Audio(waterSound);
    audio.play();

    const newCount = glasses + 1;
    setGlasses(newCount);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <Container className="my-5 text-center">
      <h2 className="mb-5 animate__animated animate__fadeInDown ">💦 Hydration Tracker</h2>

      <Card className="shadow-sm p-4 animate__animated animate__fadeInUp">
        <h5>Glasses of Water Drank Today</h5>
        <p className="display-4 fw-bold text-primary">{glasses}</p>

        <Button variant="success" size="lg" onClick={handleAddGlass} className="mb-4">
          Add a Glass 🥤
        </Button>

        <Row className="justify-content-center mb-3">
          {[...Array(glasses)].map((_, index) => (
            <Col xs={3} md={2} key={index} className="animate__animated animate__bounceIn">
              <Image src={glassIcon} alt="Glass of Water" fluid className="glass-image" />
            </Col>
          ))}
        </Row>

        {glasses > 0 && (
          <div className="mt-3 animate__animated animate__fadeIn">
            <h5>You’ve completed {glasses} {glasses === 1 ? 'glass' : 'glasses'} today!</h5>
            <p className="fst-italic text-muted">"{quote}"</p>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default HydrationTracker;
