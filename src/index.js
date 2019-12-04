
import { stringify, parse, unescape } from 'querystring'
import { readFileSync, existsSync } from 'fs'
import { verify, JsonWebTokenError } from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
const filePath = `${__dirname}/../resources/tokens.json`
const jwkFilePath = `${__dirname}/../resources/jwks.json`
console.log(`${filePath} exist--: ${existsSync(filePath)}`)
const rawData = readFileSync(filePath)
const tokenData = JSON.parse(rawData);

const jwt = tokenData.id_token

const jwksBuffer = readFileSync(jwkFilePath)
const jwks = JSON.parse(jwksBuffer)
const key = jwks.keys[0]
const pem = jwkToPem(key)
const TokenValidationErrors = { TokenExpiredError: "TokenExpiredError" }
validateToken(jwt, pem).then(res => {
    console.log(`jwt valid: ${JSON.stringify(res, null, '\t')}`)
}).catch(err => {
    console.error(err)
})

function validateToken(jwt, keyPem) {
    if (!jwt || jwt.length === 0) {
        return Promise.reject("empty")

    }

    const [keyPart, dataPart, signaturePart] = jwt.split(".")
    if (!dataPart || !signaturePart) {
        return Promise.reject("bad format")
    }

    console.log(`keyPart, dataPart, signaturePart: ${keyPart}\r\n${dataPart}\r\n${signaturePart}`);
    return new Promise((resolve, reject) => {
        verify(jwt, keyPem, (err, decoded) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(decoded)
            }
        })
    })


}