import crypto from 'crypto';
export function sign(body:string, secret?:string){if(!secret) return '';return crypto.createHmac('sha256', secret).update(body).digest('hex');}