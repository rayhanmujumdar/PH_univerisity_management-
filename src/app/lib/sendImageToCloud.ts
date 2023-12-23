import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";
cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

export default function sendImageToCloud(path: string, imageName: string) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: imageName },
            function (error, result) {
                if (error) {
                    reject(error);
                }
                fs.unlink(path, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            },
        );
    });
}
