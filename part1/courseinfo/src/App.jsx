import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (contentInfoProps) => {
  return (
    <>
    <p>{contentInfoProps.parts[0].name} {contentInfoProps.parts[0].exercises}</p>
    <p>{contentInfoProps.parts[1].name} {contentInfoProps.parts[1].exercises}</p>
    <p>{contentInfoProps.parts[2].name} {contentInfoProps.parts[2].exercises}</p>
    </>
  )
}

const Total = (totalContentProps) => {
  return (
    <>
      <p>
        Total Exercises: {totalContentProps.parts[0].exercises + totalContentProps.parts[1].exercises + totalContentProps.parts[2].exercises}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App
