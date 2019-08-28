/**
 * Compose functions as any functional stuff
 * @param { ...Function } fns functions to compose
 * @returns { function(any): any } anything the function wants to return
 */
export function compose (...fns) {
  return fns.reduce((f, g) => (...x) => f(g(...x)))
}

/**
 * Returns identity of param
 * @param { T } x anything
 * @returns { T } x
 * @template T
 */
export function identity (x) { return x }
