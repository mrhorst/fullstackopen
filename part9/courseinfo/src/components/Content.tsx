interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseParts {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => {
        return (
          <p>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
