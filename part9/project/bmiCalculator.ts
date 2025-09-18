const calculateBmi = (height: number, weight: number): void => {
  /** height in cm, weight in kg */
  const bmi: number = weight / (height / 100) ** 2

  if (bmi < 18.5) {
    console.log('underweight')
  } else if (bmi >= 18.5 && bmi < 24.9) {
    console.log('normal')
  } else if (bmi >= 25 && bmi < 29.9) {
    console.log('overweight')
  } else {
    console.log('obesity')
  }
}
try {
  const height: number = Number(process.argv[2])
  if (isNaN(height)) {
    throw Error('height is not a number!')
  }

  const weight: number = Number(process.argv[3])
  if (isNaN(weight)) {
    throw Error('weight is not a number!')
  }

  calculateBmi(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something is wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.error(errorMessage)
}
