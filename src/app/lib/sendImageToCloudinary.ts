import { v2 as cloudinary } from "cloudinary";
export default function sendImageToCloudinary() {
    cloudinary.config({
        cloud_name: "dygvvdwlk",
        api_key: "356581769982424",
        api_secret: "grTmGtC0dykawdUDI-dELJmKejU",
    });
    cloudinary.uploader.upload(
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
        { public_id: "olympic_flag" },
        function (error, result) {
            console.log(error);
            console.log(result);
        },
    );
}
