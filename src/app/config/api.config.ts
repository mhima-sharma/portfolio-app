// export const API_BASE_URL = 'http://localhost:3001/api';
// export const HEALTH_URL = 'http://localhost:3001/health';
export const API_BASE_URL = 'https://portfolio-backend-dr2s.onrender.com/api';
export const HEALTH_URL = 'https://portfolio-backend-dr2s.onrender.com/health';
export const PREMIUM_API_BASE_URL = 'https://portfolio-premium-backend.onrender.com/api';

export const CLOUDINARY_CLOUD_NAME: string = 'dyao79iwv';
export const CLOUDINARY_UPLOAD_PRESET: string = 'mahima';

const isBrowser = typeof window !== 'undefined';
const hostname = isBrowser ? window.location.hostname : '';

export const COURSE_PROXY_BASE_URL =
  isBrowser && (hostname === 'localhost' || hostname === '127.0.0.1')
    ? 'http://localhost:3000/api/course'
    : 'https://scholarsbridge-9fxq.vercel.app/api/v1//api/course';
