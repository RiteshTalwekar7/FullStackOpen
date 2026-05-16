import { useState } from 'react'

const Header = (course) => {
  return (
    <>
      <h1>{course.course}</h1>
    </>
  )
}

const Content = (contentInfo) => {
  return (
    <>
      <p>
        {contentInfo.part} {contentInfo.exercise}
      </p>
    </>
  )
}

const Total = (totalContent) => {
  return (
    <>
      <p>Number of exercises {totalContent.exercises1 + totalContent.exercises2 + totalContent.exercises3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
