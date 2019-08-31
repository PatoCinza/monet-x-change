/**
 * Compose functions as any functional stuff
 * @param { ...Function } fns functions to compose
 * @returns { function(any): any } anything the function wants to return
 */
export function compose (...fns) {
  return fns.reduce((f, g) => (...x) => f(g(...x)))
}

/**
 * Chains the initial value until next is false
 * the notation if you want it: ((b -> c, a -> c a) -> Promise c, a) -> Promise b
 * @param { Function } recursiveChainner chainner
 * @param { Promise } initialValue initial promise
 * @returns { T } step value
 * @template T
 */
export async function chainRec (recursiveChainner, initialValue = Promise.resolve()) {
  const next = a => ({
    value: a,
    next
  })
  const done = b => ({
    value: b,
    next: false
  })

  let step = next(initialValue)
  do {
    const value = await step.value
    step = await recursiveChainner(done, next, value)
  } while (step.next)

  return step.value
}

/**
 * Returns identity of param
 * @param { T } x anything
 * @returns { T } x
 * @template T
 */
export function identity (x) { return x }
