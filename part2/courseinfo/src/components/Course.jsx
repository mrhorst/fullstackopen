const Course = ({ courses }) => {
  return (
    <ul style={{ paddingLeft: 0 }}>
      {courses.map((course) => {
        return (
          <li style={{ listStyle: 'none' }} key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
          </li>
        )
      })}
    </ul>
  )
}

const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {
  return (
    <ul style={{ paddingLeft: 0 }}>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </ul>
  )
}

const Part = (props) => (
  <li style={{ listStyle: 'none' }}>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  </li>
)

const Total = (props) => {
  const total = props.total.reduce((acc, cur) => {
    return (acc += cur.exercises)
  }, 0)
  return <p style={{ fontWeight: 'bold' }}>Number of exercises {total}</p>
}
export default Course
