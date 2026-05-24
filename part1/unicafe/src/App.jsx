import { useState } from 'react'

const Statistics = ({ good, neutral, bad, all, positiveFb, sum }) => {
  if (all !== 0) {
    return (
      <>
        <Title text={"Statistics"} />
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={all} />
        <Average sum={sum} total={all} />
        <Positive sumOfPosFb={positiveFb} total={all} />
      </>
    )
  }
  return <>
    <div>
      <p>No Feedback given</p>
    </div>
  </>
}

const Title = ({ text }) => <div><h1>{text}</h1></div>
const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>
const StatisticLine = ({ text, value }) => <p>{text} {value}</p>
const Average = ({ sum, total }) => {
  if (total < 2 || sum == 0) {
    return <p>Not Enough Feedback</p>
  }
  return <>
    <p>Average {sum / total}</p>
  </>
}
const Positive = ({ sumOfPosFb, total }) => {
  if (total < 1 || sumOfPosFb == 0) {
    return <p>Not Enough Feedback</p>
  }
  return <>
    <p>Positive {(sumOfPosFb / total) * 100} %</p>
  </>
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [sum, setSum] = useState(0);
  const [positiveFb, setPositiveFb] = useState(0);

  //score card: good-1, neutral-0, bad-(-1)
  const updateGood = () => {
    setSum(sum + 1);
    setPositiveFb(positiveFb + 1);
    setGood(good + 1);
    setAll(all + 1);
  }

  const updateNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  const updateBad = () => {
    setSum(sum - 1);
    setBad(bad + 1);
    setAll(all + 1);
  }

  return (
    <>
      <Title text={"Give Feedback"} />
      <Button handler={updateGood} text={"good"} />
      <Button handler={updateNeutral} text={"neutral"} />
      <Button handler={updateBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} positiveFb={positiveFb} all={all} bad={bad} sum={sum} />
    </>
  )

}

export default App
