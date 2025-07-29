const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </ul>
  )
}

const Part = (props) => (
  <li>
    {props.part.name} {props.part.exercises}
  </li>
)

const Total = (props) => <p>Number of exercises {props.total}</p>
export default Course
