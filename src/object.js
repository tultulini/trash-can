export function safePropGetter(obj, path) {
    if (!obj || !path)
        return null

    const pathComponents = (path + '')
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]

    let currentStep = obj
    let step = 0
    let error = undefined
    const params = pathComponents.map(par => {
        currentStep = currentStep && currentStep[par] ? currentStep[par] : null
        if (!error && !currentStep) {
            error = { step, paramName: par }
        }
        step++
        return currentStep
    })

    const func = !error && (typeof path === "function")
        ? (() => path.apply(null, params))
        : undefined

    return { res: params[params.length - 1], func, error }

}  