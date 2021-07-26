import dotenv from 'dotenv';
dotenv.config();

// 값이 있는지 없는지 실시간으로 확인해서, 개발하는 단계에서 설정하지 않은 값을 알려주는 함수
// defaultValue = undefined는 secretKey: required('JWT_SECRET')처럼 두 번째 파라미터를 전달하지 않으면 defaultValue값이 undefined로 설정된다.
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  // null일때도 true, undefined일때도 true이다.
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

// 만약 문자 형태로 전달되면 error가 발생 할 수 있으므로, 숫자인 경우는 parseInt를 이용하여 숫자로 바꿔주는 것이 좋다.
export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
};
