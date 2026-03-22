# SMS Workflow Engine

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set:

- `PORT`
- `DATABASE_URL`
- `EXAMPLE_ADMIN_PHONE` (optional, used by the example action)

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run the initial migration:

```bash
npx prisma migrate dev --name init
```

5. Start the app:

```bash
npm run dev
```

## Inbound Route

`POST /api/messages/inbound`

Example request body:

```json
{
  "provider": "signalwire",
  "providerMessageId": "msg_123",
  "fromNumber": "+15555550111",
  "toNumber": "+15555550999",
  "body": "start",
  "rawPayload": {
    "event": "message.received"
  }
}
```

## Notes

- Flows live under `src/flow/flows/`.
- Add a new flow by creating a new flow file and registering it in `src/flow/engine/flowRegistry.ts`.
- Add new named actions in a flow action file and register them in `src/flow/engine/actionRegistry.ts`.
- The SMS service is currently a stub and can be replaced later with a real provider implementation.
