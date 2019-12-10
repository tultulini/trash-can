import { safePropGetter } from "./object"

const user = { cat: { name: 'schupid', singy: () => console.log('meooooooww mother fucker') } }

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const c = safePropGetter(user, (cat, name) => {
    const isMute = cat.sing === null | cat.sing === undefined
    return `${capitalize(name)} can ${isMute ? 'not ' : ''}sing`
})

if (!c.error) {
    console.log(`${c.res} exists and FYI: ${c.func()}`)
}




