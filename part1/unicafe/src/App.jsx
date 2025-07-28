import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Feedback
        setGood={() => setGood(good + 1)}
        setNeutral={() => setNeutral(neutral + 1)}
        setBad={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Feedback = (props) => {
  return (
    <>
      <h1>give feedback</h1>

      <Button onClick={props.setGood} text={'Good'} />
      <Button onClick={props.setNeutral} text={'Neutral'} />
      <Button onClick={props.setBad} text={'Bad'} />
    </>
  )
}

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{ marginRight: '5px', padding: '8px' }}
    >
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return props.text === 'positive feedback' ? (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>

      {props.good || props.neutral || props.bad ? (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={props.good} />
              <StatisticLine text="neutral" value={props.neutral} />
              <StatisticLine text="bad" value={props.bad} />
              <StatisticLine
                text="total"
                value={props.good + props.neutral + props.bad}
              />
              <StatisticLine
                text="average"
                value={
                  (props.good - props.bad) /
                  (props.good + props.neutral + props.bad)
                }
              />
              <StatisticLine
                text="positive feedback"
                value={(
                  (props.good / (props.good + props.neutral + props.bad)) *
                  100
                ).toFixed(2)}
              />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  )
}
export default App
