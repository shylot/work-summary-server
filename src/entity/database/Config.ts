const pg = {
    database: 'postgres',
    user: 'postgres',
    password: '123456',
    port: 5432,
    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}

export const Config = {pg};
