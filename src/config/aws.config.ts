import { S3 } from "aws-sdk";
import { config } from "dotenv";

config();

const { AWS_REGION, ACESS_KEY_ID_AWS, SECRET_ACESS_KEY, BUCKET_NAME } = process.env;

export const bucketConfig: S3.ClientConfiguration = {    
    region: AWS_REGION,
    credentials: {
        accessKeyId: ACESS_KEY_ID_AWS || "",
        secretAccessKey: SECRET_ACESS_KEY || "",
    },
};

export const bucketName = BUCKET_NAME || ""