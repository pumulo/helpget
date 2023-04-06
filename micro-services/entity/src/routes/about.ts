import express, { Request, Response } from 'express';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.get(
    `${baseUrl}about`,
    (req: Request, res: Response) => {
        const resp = `
            <h1>Entity microservice!!!!</h1>
            <p>
                Creaed by <em>Pumulo Sikaneta</em>.</br>
                Utilizes:
                <ul>
                    <li>
                        node.js including the following libraries:
                        <ul>
                            <li>
                                mongoose (mongo dd)
                            </li>
                            <li>
                                exrpress (web server)
                            </li>
                        </ul>
                    </li>
                    <li>
                        Docker
                    </li>
                    <li>
                        Kubernetes
                    </li>
                    <li>
                        Skaffold
                    </li>
                </ul>
            </p>
            Created as a template for publishing services from a public site for use in simutlations. This template can be used to create any Object by changing the properties and name of the Entity.</br>
            <em>Initial create date - Marh, 2023.</em>
        `;
        res.send(
            resp
        )
    }
);

export { router as aboutRouter };