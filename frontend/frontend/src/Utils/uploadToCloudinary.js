// const cloud_name = "dk0h2cq2f";
// const upload_preset = "bodywise";

// export const uploadToCloudinary = async(file, fileType)=>{

//     if(file && fileType){
//         const data = new FormData();
//         data.append("file", file);
//         data.append("upload_preset", upload_preset);
//         data.append("cloud_name", cloud_name);

//         const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
//             {method:"POST", body:data}
//         )

//         const fileData = await res.json();
        
//         console.log("file url....", fileData.url)
//         return fileData.url
//     }else{
//         console.log("file upload error.........");
//     }
// }

const cloud_name = "dk0h2cq2f";
const upload_preset = "bodywise";

export const uploadToCloudinary = async (file, fileType) => {
    if (file && fileType) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType === 'image' ? 'image/upload' : 'video/upload'}`,
            { method: "POST", body: data }
        );

        const fileData = await res.json();
        console.log("file url....", fileData.url);
        return fileData.url;
    } else {
        console.log("file upload error.........");
    }
};
