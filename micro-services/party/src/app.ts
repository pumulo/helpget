import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
    aboutRouter,
    createGroupRouter, deleteGroupRouter, queryGroupRouter, updateGroupRouter,
    createIndividualRouter, deleteIndividualRouter, queryIndividualRouter, updateIndividualRouter,
    createOrganizationRouter, deleteOrganizationRouter, queryOrganizationRouter, updateOrganizationRouter,
    createRelationshipRouter, deleteRelationshipRouter, queryRelationshipRouter, updateRelationshipRouter
} from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession(
        {
            signed: false
        }
    )
)

// TODO add all the routes that we define here
app.use(aboutRouter);
// add group routes
app.use(createGroupRouter);
app.use(deleteGroupRouter);
app.use(queryGroupRouter);
app.use(updateGroupRouter);
// add individual routes
app.use(createIndividualRouter);
app.use(deleteIndividualRouter);
app.use(queryIndividualRouter);
app.use(updateIndividualRouter);
// add organization routes
app.use(createOrganizationRouter);
app.use(deleteOrganizationRouter);
app.use(queryOrganizationRouter);
app.use(updateOrganizationRouter);
// add relationship routes
app.use(createRelationshipRouter);
app.use(deleteRelationshipRouter);
app.use(queryRelationshipRouter);
app.use(updateRelationshipRouter);

app.all('*', () => {
    throw new Error('Unable to reach this url. no functionality has been defined');
});

export { app };