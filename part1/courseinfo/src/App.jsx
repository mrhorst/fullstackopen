const App = () => {
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = { name: 'Using props to pass data', exercises: 7 }
  const part3 = { name: 'State of a component', exercises: 14 }
  const course = {
    name: 'Half Stack application development',
    parts: [part1, part2, part3],
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}
const Content = (props) => {
  return (
    <>
      {props.parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  )
}
const Total = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts.reduce((sum, cur) => cur.exercises + sum, 0)}
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

export default App
