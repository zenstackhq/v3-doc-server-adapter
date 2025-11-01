import type { ClientContract } from '@zenstackhq/orm';
import { RPCApiHandler } from '@zenstackhq/server/api';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import express, { Request } from 'express';
import { createClient } from './db';
import { schema, type SchemaType } from './zenstack/schema';

const app = express();
const port = 3000;

// initialize the ORM client
let client: ClientContract<SchemaType> | undefined;
createClient().then(_client => {
  client = _client;
});

app.use(express.json());

app.use(
  '/api/model',
  ZenStackMiddleware({
    apiHandler: new RPCApiHandler({ schema }),
    getClient: (request) => getClient(request),
  })
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log('Run `npm run client` to test the service');
});

async function getClient(request: Request) {
  // here we use the "x-userid" header to simulate user authentication, in a
  // real application, you should use a proper auth mechanism
  const uid = request.get('x-userid');
  if (!uid) {
    // returns the client unbound to a specific user (anonymous)
    console.log('Using anonymous ORM client');
    return client!;
  } else {
    // return a user-bound client
    console.log('Using ORM client bound to user:', uid);
    return client!.$setAuth({id: parseInt(uid)})
  }
}
