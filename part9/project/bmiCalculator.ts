const calculateBmi = (height: number, weight: number): string => {
  /** height in cm, weight in kg */
  const bmi: number = weight / (height / 100) ** 2

  if (isNaN(bmi)) {
    throw Error('bmi is not a number')
  }

  if (bmi < 18.5) {
    return 'underweight'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'normal'
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'overweight'
  } else {
    return 'obesity'
  }
}

if (require.main === module) {
  try {
    const height: number = Number(process.argv[2])
    if (isNaN(height)) {
      throw Error('height is not a number!')
    }

    const weight: number = Number(process.argv[3])
    if (isNaN(weight)) {
      throw Error('weight is not a number!')
    }

    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something is wrong: '
    if (error instanceof Error) {
      errorMessage += error.message
    }
    console.error(errorMessage)
  }
}

export default calculateBmi
