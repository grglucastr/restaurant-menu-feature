import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk';

const region = process.env.APP_REGION;
const bucketName = process.env.S3_BUCKET_IMAGES;
const expirationSeconds = parseInt(process.env.S3_SIGNED_URL_EXPIRATION_SECONDS);

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {

  const { itemId } = event.pathParameters;

  const s3 = new AWS.S3({
    region: region,
    signatureVersion: 'v4',
    params: {Bucket: bucketName }
  });

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: itemId,
    Expires: expirationSeconds
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({uploadUrl})
  }
}