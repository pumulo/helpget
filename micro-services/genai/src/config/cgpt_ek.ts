import crypto from 'crypto';

const ed = '42F2E04F283AA8B25FC1D7E182E08EFB91C1AFD16F19AA8DB248C4327F2F8373C790517637CC247F5FE73173997EEFC14812A1157E8DF2899AD3050A84CFB469';
const sk = 'H8XtVUB2ZAAC6YjgKFJ7AHgi2wvaNWY3';
const btf = 'hex';
const ttf = 'utf8';
const alg = 'aes-256-ecb';
const iv = 'BLZPKNVfwzkHaVC7';

const decipher = crypto.createDecipheriv(alg, sk, iv);


const decryptedData = decipher.update(ed, btf, ttf);

export { decryptedData as genai_k };