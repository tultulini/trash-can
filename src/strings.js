export function formatString(value, ...args) {
    let result = value
    for (let i in args) {
        const param = new RegExp(`{[${i}]}`, 'g')        
        result = result.replace(param, args[i])
    }
    return result
}