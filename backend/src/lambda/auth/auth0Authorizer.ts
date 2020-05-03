import { CustomAuthorizerEvent, CustomAuthorizerResult, CustomAuthorizerHandler  } from 'aws-lambda';
import { JwtPayload  } from '../../auth/JwtPayload';
import { verify } from 'jsonwebtoken';
import axios from 'axios';

const jwksUrl = 'https://grgtest.auth0.com/.well-known/jwks.json';
export const handler: CustomAuthorizerHandler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  console.log('auth header token: ', event.authorizationToken);
  
  try{
    const jwtToken = await verifyToken(event.authorizationToken);
    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }

  }catch(e){
    console.error('User not authorized', { error: e.message });
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

const verifyToken = async (authHeader:string): Promise<JwtPayload> => {

  const token = getToken(authHeader);

  const response = await axios.get(jwksUrl);
  const data = await response.data;
  const cert = `-----BEGIN CERTIFICATE-----\n${data.keys[0].x5c[0]}\n-----END CERTIFICATE-----`;
  return verify(token, cert, {algorithms: ['RS256']}) as JwtPayload;
}

const getToken = (authHeader: string): string => {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}