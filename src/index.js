import { proper } from "./object"

const user = { cat: { name: 'schupid', singy: () => console.log('meooooooww mother fucker') } }

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

proper(user, (cat, name) => {
    const isMute = cat.sing === null | cat.sing === undefined
    console.log(`${capitalize(name)} can ${isMute ? 'not ' : ''}sing`)
})
    .else(_ => {
        console.log('else hit')
    })
    .catch((prop, step) => {
        console.log(`missing prop: ${prop} at step: ${step}`)
    })





