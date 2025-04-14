import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import './diet.css'; // Keep this if hover styles are defined there

const DietProgressTracker = () => {
  return (
    <Container className="my-5">
      <h3 className="text-center mb-5 animate__animated animate__fadeInDown">
        💪 Stay Inspired on Your Health Journey
      </h3>
      <Row className="g-4">
        <Col md={4}>
          <Card className="hover-card text-center shadow-sm p-4 animate__animated animate__zoomIn">
            <h5 className="text-primary">“Every bite is a step forward.”</h5>
            <p className="fst-italic">Fuel your body. Feed your goals.</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hover-card text-center shadow-sm p-4 animate__animated animate__zoomIn animate__delay">
            <h5 className="text-danger">“Goals need disciplined action ”</h5>
            <p className="fst-italic">Consistency is your superpower.</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="hover-card text-center shadow-sm p-4 animate__animated animate__zoomIn animate__delay">
            <h5 className="text-success">“Make progress, not perfection.”</h5>
            <p className="fst-italic">Celebrate small wins every day.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DietProgressTracker;
