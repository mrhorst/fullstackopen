const calculateBmi = (height: number, weight: number): string => {
  /** height in cm, weight in kg */
  const bmi: number = weight / (height / 100) ** 2

  if (bmi < 18.5) {
    return 'underweight'
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'normal'
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'overweight'
  } else {
    return 'obesity'
  }
}

console.log(calculateBmi(180, 74))
