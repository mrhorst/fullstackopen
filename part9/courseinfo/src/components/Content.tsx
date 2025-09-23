import type { CoursePart, CourseParts } from '../types/CoursePart';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
          required skills:{' '}
          {part.requirements.map((req) => (
            <p key={req}>{req}</p>
          ))}
        </div>
      );
  }
};

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => {
        return (
          <div key={part.name}>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

export default Content;
