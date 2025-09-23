import type { DiaryEntry } from '../types';

const Diary = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return diaries.length !== 0 ? (
    <div>
      <h3>Flight Logs</h3>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>weather: {diary.weather}</p>
            <p>visibility: {diary.visibility}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <h3>No Flight logs...</h3>
  );
};

export default Diary;
