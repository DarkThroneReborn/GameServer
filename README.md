# Dark Throne Reborn Game Server

This is the game server for the Dark Throne Reborn project. It is a Node.js application that uses Express and PostgreSQL.

## Prerequisites

- Node.js
- PostgreSQL

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the root of the project and add the following environment variables:

```bash
GAME_SERVER_DATABASE_URL=postgres://localhost:5432/gameserver
GAME_SERVER_PORT=3000
```

3. Run the database migrations

Migrations are handled by knex. To run migrations, use the following command:

```bash
npx knex migrate:latest
```

4. Start the server

```bash
npm start
```

## Running Tests

```bash
npm test
```

## Contributing

Please read [CONTRIBUTING](https://github.com/DarkThroneReborn/.github/blob/main/profile/ContributionGuidelines.md) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/DarkThroneReborn/GameServer/tags).
