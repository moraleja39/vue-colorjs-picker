export function getStepCount(min: number, max: number, { minSteps = 100, maxStep = 1 } = {}) {
  let range = Math.abs(max - min)
  let step = range / minSteps

  step = 10 ** Math.floor(Math.log10(step))

  return step > maxStep ? maxStep : step
}
