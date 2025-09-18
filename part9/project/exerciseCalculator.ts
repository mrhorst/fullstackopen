interface ExerciseSummary {
  periodLength: number
  trainingDays: number
  target: number
  average: number
  success: boolean
  rating: Rating
  ratingDescription: string
}

type Rating = 1 | 2 | 3

const calculateExercises = (
  dailyExerciseHoursArray: number[],
  target: number
): ExerciseSummary => {
  let rating: Rating
  let success
  let ratingDescription

  const periodLength = dailyExerciseHoursArray.length
  const average =
    dailyExerciseHoursArray.reduce((acc, cur) => (acc += cur), 0) / periodLength
  const trainingDays = dailyExerciseHoursArray.filter((day) => day !== 0).length

  if (average < target) {
    rating = 1
    success = false
    ratingDescription = 'you suck'
  } else if (average === target) {
    rating = 2
    success = true
    ratingDescription = 'target reached. you do not suck but could be better'
  } else {
    rating = 3
    success = true
    ratingDescription = 'you pushed past your target. great job'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 3, 2, 4.5, 0, 3, 1], 2))
