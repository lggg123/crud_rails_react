import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Airlines from './Airlines/Airlines'
import Airline from './Airline/Airline'

class App extends Component {
   render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Airlines />} />
                    <Route exact path="/airlines/:slug" element={<Airline />} />
                </Routes>
            </Router>
        )
   } 
}

export default App