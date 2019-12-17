import { isPromise, wrapPromiseForResult } from "./promises"

export const properAsync = async (obj, pathToAction) => {
    console.log(`isAsync: ${isAsync(pathToAction)}`)
    const f = pathToAction()
    return f
}

export function proper(obj, pathToAction) {
    if (isNullOrUndefined(obj) || isNullOrUndefined(pathToAction)) {
        if (raiseErrorOnFailure) {
            throw new Error('Need base object and pathToAction')
        }
        return null
    }
    const isAsyncFun = isAsync(pathToAction)
    console.log(`isAsync: ${isAsyncFun}`)

    let catchFunc
    let elseFunc
    const emptyFunc = () => { }

    const { params, pathError } = getPathParamValues(obj, pathToAction)
    let runPathToAction = false
    if (pathError) {
        elseFunc = emptyFunc
        catchFunc = (pred) => {
            return pred(pathError.prop, pathError.step)
        }
    }
    else {
        if (isNullOrUndefined(params[params.length - 1])) {
            elseFunc = pred => {
                return pred()
            }
        }
        else {
            runPathToAction = true

            elseFunc = emptyFunc
        }
        catchFunc = emptyFunc
    }

    const result = {}


    result.else = (pred) => {
        const fun = elseFunc(pred)
        return isPromise(fun)
            ? wrapPromiseForResult(fun, result)
            : result
    }

    result.catch = (pred) => {
        const fun = catchFunc(pred);
        return isPromise(fun)
            ? wrapPromiseForResult(fun, result)
            : result
    }

    let ret
    if (isAsyncFun) {
        ret = runPathToAction
            ? wrapPromiseForResult(pathToAction.apply(null, params), result)
            : Promise.resolve(result)
    }
    else {
        ret = result
    }
    return ret
}



function getFunctionArgs(func) {
    return (func + '')
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]
}
function isAsync(func) {
    const string = func.toString().trim();

    return !!(
        // native
        string.match(/^async /) ||
        // babel (this may change, but hey...)
        string.match(/return _ref[^\.]*\.apply/)
        // insert your other dirty transpiler check

        // there are other more complex situations that maybe require you to check the return line for a *promise*
    );
}

function getPathParamValues(obj, pathToAction) {
    let step = 0
    const pathComponents = getFunctionArgs(pathToAction)
    const stepCount = pathComponents.length

    if (stepCount === 0) {
        throw new Error("path to action is empty")
    }

    let currentStep = obj
    let pathError
    const params = pathComponents.map(prop => {
        if (!currentStep) {
            return null
        }

        currentStep = currentStep[prop]
        if (isNullOrUndefined(currentStep) && step < stepCount - 1) {
            pathError = { prop, step }
            // elseFunc = emptyFunc
            // catchFunc = (pred) => {
            //     pred(prop, step)
            // }
        }
        step++
        return currentStep
    })
    return { params, pathError }

}

export function isNullOrUndefined(val) {
    return val === null || val === undefined
}