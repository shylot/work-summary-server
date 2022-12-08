import DB from "../common/DB";
import {IdbType} from "../common/IDB";
import {pg} from 'pg';

export default class PgDB extends DB {
    private type: IdbType = IdbType.PG;
    private pool: pg.Pool;
    private client: pg.Client;

    constructor(props) {
        super(props);
        this.pool = new pg.Pool({
            host: this.getHost(),
            port: this.getPort(),
            database: this.getDbName(),
            user: this.getUserName(),
            password: this.getPassword(),
            poolSize: this.getMax(),
            poolIdleTimeout: this.getIdleTimeoutMillis(),
        })
    }

    public getType(): IdbType {
        return this.type;
    }

    public connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.connect((err: any, client: any, done: any) => {
                if (err) {
                    reject(err);
                } else {
                    this.client = client;
                    resolve(done)
                }
            });
        })
    }
}
