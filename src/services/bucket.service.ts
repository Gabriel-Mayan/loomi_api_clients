import * as AWS from "aws-sdk";
import { bucketConfig, bucketName } from "../config/aws.config";

const getBucket = () => {
    return new AWS.S3(bucketConfig);
};

export const getArchiveInBucket = async ({ folder, fileName }: { folder: string, fileName: string }) => {
    const s3 = getBucket();
    const params = {
        Bucket: `${bucketName}/${folder}`,
        Key: fileName,
    };
    
    const data = await s3.getObject(params).promise();

    return data.Body;
};

export const insertArchiveInBucket = async ({ folder, fileName, file, fileExtension }: { folder: string, fileName: string, file: string, fileExtension: string }) => {
    const s3 = getBucket();
    const buffer = Buffer.from(file, 'base64');

    const params = {
        Bucket: `${bucketName}/${folder}`,
        Key: fileName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: `image/${fileExtension}`
    };

    await s3.putObject(params).promise();

    const url = `https://${bucketName}.s3.amazonaws.com/${folder}/${fileName}`;

    return { url };
};