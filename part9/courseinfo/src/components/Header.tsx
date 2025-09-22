interface CourseNameProps {
  courseName: string;
}

const Header = ({ courseName }: CourseNameProps) => {
  return <h1>{courseName}</h1>;
};

export default Header;
