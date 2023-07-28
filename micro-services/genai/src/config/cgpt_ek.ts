import crypto from 'crypto';

const ed = '96C448F8421446A51AA4EB12BADE097E7878F67C1A368B612E5079E2638D16279675B2CABCAEDAD670AE40C652033B7BFB19D99BB59B2D6DD36B1057EC3BC033';
const sk = 'H8XtVUB2ZAAC6YjgKFJ7AHgi2wvaNWY3';
const btf = 'hex';
const ttf = 'utf8';
const alg = 'aes-256-cbc';
const iv = Buffer.from('BLZPKNVfwzkHaVC7');

const decipher = crypto.createDecipheriv(alg, sk, iv);


const decryptedData = 'sk-' + decipher.update(ed, btf, ttf);

export { decryptedData as genai_k };