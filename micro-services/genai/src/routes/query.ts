import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { baseUrl } from '../config/end-points';
import { openai } from '../config/openai';
import { ChatCompletionRequestMessage } from 'openai';

const router = express.Router();

const conversationContext: string[] = [];
const currentMessages: ChatCompletionRequestMessage[] = [];

router.post(
    `${baseUrl}query`,
    [
        body('prompt').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { prompt } = req.body;
        const modelId = "gpt-3.5-turbo";
        const promptText = `${prompt}\n\nResponse:`;
        // Restore the previous context
        for (const [inputText, responseText] of conversationContext) {
            currentMessages.push({ role: "user", content: inputText });
            currentMessages.push({ role: "assistant", content: responseText });
        }

        // Stores the new message
        currentMessages.push({ role: "user", content: promptText });
        
        const result = await openai.createChatCompletion({
            model: modelId,
            messages: currentMessages,
        });
        console.log(`make a gen ai post call with prompt ${prompt}`);
        // const responseText = result.data.choices.shift().message.content;
        // conversationContext.push([promptText, responseText]);
        res.send({ response: result });
    }
);


export { router as queryRouter };