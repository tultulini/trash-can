import { proper, properAsync } from "./object"

const user = { catoo: { name: 'schupid', singy: () => console.log('meooooooww mother fucker') } }

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
run()
async function run() {
    const a = await proper(user, async (cat, name) => {
        const isMute = cat.sing === null | cat.sing === undefined
        console.log(`${capitalize(name)} can ${isMute ? 'not ' : ''}sing`)
    })
    a.else(_ => {
        console.log('else hit!!')
    })
        .catch(async (prop, step) => {
            console.log(`missing prop: ${prop} at step: ${step}`)
        }).then(_ => {
            console.log('finished')
        })
}