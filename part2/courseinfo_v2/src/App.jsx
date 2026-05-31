import { useState } from 'react'
import courses from './CourseModule/courses'
import Course from './CourseModule/components/Course'

function App() {
  return <>
    <h1>Web Development Curriculum</h1>
    <Course courses={courses} />
  </>
}

export default App
