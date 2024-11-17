import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();
  console.log(data);
  if (data.get("file")) {
    console.log("We have file", data.get("file"));
    const file = data.get("file");

    //initial aws client
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    //graping the extension
    const ext = file.name.split(".").slice(-1)[0];
    console.log({ ext });

    const newFileName = uniqid() + "." + ext;
    console.log(newFileName);

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    // const bucket = "tutorialss";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: "tutorialss",
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    console.log("https://tutorialss.s3.amazonaws.com/" + newFileName);
    return Response.json("https://tutorialss.s3.amazonaws.com/" + newFileName);
  }

  return Response.json(true);
}
