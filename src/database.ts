import { Pool } from 'pg'
import configs from './configs'

const {
    NODE_ENV,
    PG_USER,
    PG_HOST,
    PG_DATABASE,
    PG_DATABASE_TEST,
    PG_PASSWORD,
    PG_PORT
} = configs

let pool: unknown


console.log(NODE_ENV)

if (NODE_ENV === 'test') {
    pool = new Pool({
        user: PG_USER,
        host: PG_HOST,
        database: PG_DATABASE_TEST,
        password: PG_PASSWORD,
        port: parseInt(PG_PORT as string)
    })
}

if (NODE_ENV === 'dev') {
    pool = new Pool({
        user: PG_USER,
        host: PG_HOST,
        database: PG_DATABASE,
        password: PG_PASSWORD,
        port: parseInt(PG_PORT as string)
    })
}

export default pool as Pool
