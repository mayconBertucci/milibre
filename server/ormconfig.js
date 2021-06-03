require('dotenv').config();

if (process.env.ENVIRONMENT === 'local') {
    module.exports = [
        {
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            logging: true,
            entities: ["./src/entities/**{.ts,.js}"],
            migrations: ["./src/database/migrations/**{.ts,.js}"],
            cli: {
                migrationsDir: './src/database/migrations'
            },
            migrationsRun: false
        }
    ];
} else {
    module.exports = [
        {
            type: `postgres`,
            url: process.env.DATABASE_URL,
            synchronize: false,
            logging: false,
            entities: ["dist/src/entities/**{.ts,.js}"],
            migrations: ["dist/src/database/migrations/**{.ts,.js}"],
            cli: {
                migrationsDir: 'dist/src/database/migrations'
            },
            ssl: {
                rejectUnauthorized: false
            },
            migrationsRun: false
        },
    ];
}

