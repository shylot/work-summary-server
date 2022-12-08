import * as http from 'http';

export default class Service {

    private static server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

    public static createServer() {
        return new Promise((resolve, reject) => {
            this.server = http.createServer((req, res) => {
                resolve({req, res});
            })
        })
    }
}
