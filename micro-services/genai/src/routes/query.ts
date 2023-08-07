import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { baseUrl } from '../config/end-points';
import { openai } from '../config/openai';
import { ChatCompletionRequestMessage } from 'openai';

const router = express.Router();



router.post(
    `${baseUrl}query`,
    [
        body('prompt').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const conversationContext: string[] = [];
        const currentMessages: ChatCompletionRequestMessage[] = [];
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
        const responseChoice = result.data.choices[0];
        const responseText = responseChoice.message?.content;
        // conversationContext.push([prompt, responseText]);
        res.send({ response: responseText });
    }
);

router.post(
    `${baseUrl}query_with_conversation`,
    [
        body('prompt').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const currentMessages: ChatCompletionRequestMessage[] = [];
        const { prompt, conversation }: {prompt: string, conversation: []} = req.body;
        const modelId = "gpt-3.5-turbo";
        // set up the conversation
        conversation.map(
            async submission => {
                const { message } = submission
                const builderMessagePrompt = `${message}\n\nResponse:`;
                currentMessages.push({ role: "user", content: builderMessagePrompt });
                // console.log(currentMessages);
                const result = await openai.createChatCompletion({
                    model: modelId,
                    messages: currentMessages,
                });
                console.log(result);
                const responseChoice = result.data.choices[0];
                const responseText = responseChoice.message?.content;
                currentMessages.push({ role: "assistant", content: responseText });
                console.log(responseText);
                console.log(currentMessages);
            }
        )

        // submit the final prompt
        const promptText = `${prompt}\n\nResponse:`;
        

        // Stores the new message
        currentMessages.push({ role: "user", content: promptText });
        
        const result = await openai.createChatCompletion({
            model: modelId,
            messages: currentMessages,
        });
        console.log(`make a gen ai post call with prompt ${prompt}`);
        const responseChoice = result.data.choices[0];
        const responseText = responseChoice.message?.content;
        
        res.send({ response: responseText });
    }
);

router.post(
    `${baseUrl}json/query`,
    [
        body('prompt').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const conversationContext: string[] = [];
        const currentMessages: ChatCompletionRequestMessage[] = [];
        const { prompt } = req.body;
        const modelId = "gpt-3.5-turbo";
        const promptText = `${prompt}\n\nResponse:`;
        console.log('received request' + prompt)
        
        // Stores the new message
        currentMessages.push({ role: "user", content: promptText });
        let result;
        let responseChoice;
        let responseText;

        try {
            result = await openai.createChatCompletion({
                model: modelId,
                messages: currentMessages,
            });
            console.log(`make a gen ai post call with prompt ${prompt}`);
            responseChoice = result.data.choices[0];
            responseText = responseChoice.message?.content;
        } catch (error) {
            console.log(`Error in try catch with message ${error}`);
        }
        currentMessages.push({ role: "assistant", content: responseText });
        
        
        // submit the final prompt
        const promptJSON = `Return the value in json format\n\nResponse:`;
        

        // Stores the new message
        currentMessages.push({ role: "user", content: promptJSON });
        
        result = await openai.createChatCompletion({
            model: modelId,
            messages: currentMessages,
        });
        
        responseChoice = result.data.choices[0];
        responseText = responseChoice.message?.content;
        currentMessages.push({ role: "assistant", content: responseText });
        
        if (responseText) {
            res.send({ response: JSON.parse(responseText) });
        }
        res.send('Error');
    }
);

router.post(
    `${baseUrl}json/batch/query`,
    [
        body('prompt').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const conversationContext: string[] = [];
        const currentMessages: ChatCompletionRequestMessage[] = [];
        const { prompt } = req.body;
        const modelId = "gpt-3.5-turbo";
        const promptText = `${prompt}\n\nResponse:`;
        console.log('received request' + prompt)
        
        // Stores the new message
        currentMessages.push({ role: "user", content: promptText });
        let result;
        let responseChoice;
        let responseText;

        try {
            result = await openai.createChatCompletion({
                model: modelId,
                messages: currentMessages,
            });
            console.log(`make a gen ai post call with prompt ${prompt}`);
            responseChoice = result.data.choices[0];
            responseText = responseChoice.message?.content;
        } catch (error) {
            console.log(`Error in try catch with message ${error}`);
        }
        currentMessages.push({ role: "assistant", content: responseText });
        
        
        // submit the final prompt
        const promptJSON = `Return the response as an array in json format\n\nResponse:`;
        

        // Stores the new message
        currentMessages.push({ role: "user", content: promptJSON });
        
        result = await openai.createChatCompletion({
            model: modelId,
            messages: currentMessages,
        });
        
        responseChoice = result.data.choices[0];
        responseText = responseChoice.message?.content;
        currentMessages.push({ role: "assistant", content: responseText });
        
        if (responseText) {
            res.send({ response: JSON.parse(responseText) });
        }
        res.send('Error');
    }
);

router.post(
    `${baseUrl}json/query_with_conversation`,
    [
        body('conversation').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const currentMessages: ChatCompletionRequestMessage[] = [];
        const { conversation }: {prompt: string, conversation: []} = req.body;
        const modelId = "gpt-3.5-turbo";
        // set up the conversation
        conversation.map(
            async submission => {
                const { message } = submission
                const builderMessagePrompt = `${message}\n\nResponse:`;
                currentMessages.push({ role: "user", content: builderMessagePrompt });
                console.log(currentMessages);
                const result = await openai.createChatCompletion({
                    model: modelId,
                    messages: currentMessages,
                });
                console.log(result);
                const responseChoice = result.data.choices[0];
                const responseText = responseChoice.message?.content;
                currentMessages.push({ role: "assistant", content: responseText });
                console.log(responseText);
                console.log(currentMessages);
            }
        )

        // submit the final prompt
        const promptText = `Return the value in json format\n\nResponse:`;
        

        // Stores the new message
        currentMessages.push({ role: "user", content: promptText });
        
        const result = await openai.createChatCompletion({
            model: modelId,
            messages: currentMessages,
        });
        
        const responseChoice = result.data.choices[0];
        const responseText = responseChoice.message?.content;
        
        if (responseText) {
            res.send({ response: JSON.parse(responseText) });
        }
        res.send('Error');
    }
);

router.post(
    `${baseUrl}translate`,
    [
        body('language').notEmpty()
            .withMessage('Specify the language'),
        body('document').notEmpty()
            .withMessage('Specify a document to translate')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { language, document } = req.body;
        const prompt = `Translate the following document into ${language}: ${document} and return the response as text`
        const modelId = "gpt-3.5-turbo";
        const promptText = `${prompt}\n\nResponse:`;
        const conversationContext: string[] = [];
        const currentMessages: ChatCompletionRequestMessage[] = [];


        // Stores the new message
        currentMessages.push({ role: "user", content: promptText });
        
        const result = await openai.createChatCompletion({
            model: modelId,
            messages: currentMessages,
        });
        console.log(`make a gen ai post call with prompt ${prompt}`);
        const responseChoice = result.data.choices[0];
        const responseText = responseChoice.message?.content;
        res.send({ response: responseText });
    }
);

export { router as queryRouter };