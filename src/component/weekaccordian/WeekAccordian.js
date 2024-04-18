import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardDeck } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
const WeekAccordion = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <Accordion>
            {daysOfWeek.map((day, index) => (
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                        {day}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>
                            <span>
                                Delivery: 10:00 am - 10:00pm
                            </span>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
        </Accordion>
    );
};
export default WeekAccordion;