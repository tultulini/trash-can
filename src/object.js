export function proper(obj, pathToAction) {
    if (isNullOrUndefined(obj) || isNullOrUndefined(pathToAction)) {
        if (raiseErrorOnFailure) {
            throw new Error('Need base object and pathToAction')
        }
        return null
    }

    const pathComponents = (pathToAction + '')
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]

    let currentStep = obj
    const stepCount = pathComponents.length
    let catchFunc


    let elseFunc
    const emptyFunc = () => { }
    let step = 0
    const params = pathComponents.map(prop => {
        if (!currentStep) {
            return null
        }

        currentStep = currentStep[prop]
        if (isNullOrUndefined(currentStep) && step < stepCount - 1) {
            elseFunc = emptyFunc
            catchFunc = (pred) => {
                pred(prop, step)
            }
        }
        step++
        return currentStep
    })

    if (!catchFunc) {

        if (isNullOrUndefined(params[params.length - 1])) {
            elseFunc = pred => {
                pred()
            }
        }
        else {
            pathToAction.apply(null, params)
            elseFunc = emptyFunc
        }
        catchFunc = emptyFunc
    }
    const ret = {}

    ret.else = (pred) => {
        elseFunc(pred);
        return ret
    }
    ret.catch = (pred) => {
        catchFunc(pred);
        return ret
    }
    return ret

}

export function isNullOrUndefined(val) {
    return val === null || val === undefined
}