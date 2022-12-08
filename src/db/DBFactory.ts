import {IdbInfo, IdbType} from "./common/IDB";
import DB from "./common/DB";
import PgDB from "./pg/PgDB";

export default class DBFactory {

    private readonly db: DB;

    constructor(type: IdbType, opt: IdbInfo) {
        switch (type) {
            case IdbType.PG:
                this.db = new PgDB(opt);
        }
    }

    public getDB(): DB {
        return this.db;
    }
}
