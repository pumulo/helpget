import { Configuration, OpenAIApi } from "openai";
import { genai_k } from '../config/cgpt_ek';

const configuration = new Configuration({
    apiKey: genai_k,
});

const openai = new OpenAIApi(configuration);

export { openai };

