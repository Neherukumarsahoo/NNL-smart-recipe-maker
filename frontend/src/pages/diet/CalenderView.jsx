import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./calendar.css"; // for custom styling

const FullMealCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [mealInput, setMealInput] = useState("");
  const [mealCategory, setMealCategory] = useState("Breakfast");
  const [mealCalories, setMealCalories] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mealEvents")) || [];
    setEvents(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("mealEvents", JSON.stringify(events));
  }, [events]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setMealInput("");
    setMealCategory("Breakfast");
    setMealCalories("");
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    const confirm = window.confirm(`Edit or delete "${clickInfo.event.title}"?`);
    if (confirm) {
      const action = window.prompt("Type 'edit' to change or 'delete' to remove:");
      if (action === "delete") {
        const updated = events.filter(e => e.title !== clickInfo.event.title || e.date !== clickInfo.event.startStr);
        setEvents(updated);
      } else if (action === "edit") {
        setMealInput(clickInfo.event.title);
        setMealCategory(clickInfo.event.extendedProps.category || "Breakfast");
        setMealCalories(clickInfo.event.extendedProps.calories || "");
        setSelectedDate(clickInfo.event.startStr);
        setEditingEvent(clickInfo.event);
        setShowModal(true);
      }
    }
  };

  const saveMeal = () => {
    if (mealInput.trim() === "") return;

    const newEvent = {
      title: mealInput,
      date: selectedDate,
      category: mealCategory,
      calories: mealCalories,
    };

    let updatedEvents = [...events];
    if (editingEvent) {
      updatedEvents = updatedEvents.filter(
        (e) =>
          !(e.title === editingEvent.title && e.date === editingEvent.startStr)
      );
    }
    updatedEvents.push(newEvent);
    setEvents(updatedEvents);
    setShowModal(false);
  };

  const exportPDF = () => {
    const filtered = events.filter(event => {
      const date = new Date(event.date);
      return date.getMonth() === new Date().getMonth();
    });

    if (!filtered || filtered.length === 0) {
      alert("No meals to export!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🍱 Meal Calendar Report", 14, 20);

    const tableRows = filtered.map((event, index) => [
      index + 1,
      event.date,
      event.title || "N/A",
      event.category || "N/A",
      event.calories || "N/A",
    ]);

    autoTable(doc, {
      head: [["#", "Date", "Meal", "Category", "Calories"]],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
    });

    doc.save("meal_calendar.pdf");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🍱 Full Meal Calendar</h2>
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/meal-input")}>
        ← Back to Meal Input
      </Button>
      <Button
        variant="outline-danger"
        className="mb-3 ms-2"
        onClick={exportPDF}
      >
        📄 Export as PDF
      </Button>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        eventDisplay="block"
        dayMaxEventRows={2}
      />

      {/* Modal for meal input */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingEvent ? "Edit Meal" : "Add Meal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter meal title"
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
            />
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Meal Category (e.g., Dinner)"
              value={mealCategory}
              onChange={(e) => setMealCategory(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Calories"
              value={mealCalories}
              onChange={(e) => setMealCalories(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveMeal}>
            Save Meal
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Optional: Clear all events */}
      <Button variant="danger" className="mt-3" onClick={() => setEvents([])}>
        Clear All Meals
      </Button>
    </Container>
  );
};

export default FullMealCalendar;
