import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';

function sendError(response: Response, error: unknown): void {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Unable to complete request' });
}

export function createResourceRouter<T>(resourceModel: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await resourceModel.find().lean());
    } catch (error) {
      sendError(response, error);
    }
  });

  router.get('/:id', async (request: Request, response: Response) => {
    try {
      const record = await resourceModel.findById(request.params.id).lean();
      if (!record) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      sendError(response, error);
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const record = await resourceModel.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      sendError(response, error);
    }
  });

  return router;
}
