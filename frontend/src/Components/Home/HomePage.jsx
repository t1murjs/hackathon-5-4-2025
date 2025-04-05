import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import './HomePage.css';
import NavigationBar from "../Navbar/NavigationBar";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Example course data (replace with actual course data or API calls)
  const courses = [
    { id: 1, title: "Introduction to Computer Science", description: "A beginner-friendly course in computer science fundamentals." },
    { id: 2, title: "Advanced Web Development", description: "Learn modern web development with React and Node.js." },
    { id: 3, title: "Data Structures and Algorithms", description: "Deep dive into essential data structures and algorithms." },
    { id: 4, title: "Machine Learning Basics", description: "Get started with machine learning using Python." },
  ];

  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   <>
    <NavigationBar/>
   </>
  );
};

export default HomePage;
