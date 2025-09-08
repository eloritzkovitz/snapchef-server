import { JWT } from "google-auth-library";
import axios from "axios";
import fs from "fs";
import path from "path";
import "dotenv/config";
import logger from "./logger";

const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];

// Load service account from GOOGLE_APPLICATION_CREDENTIALS env variable
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credentialsPath) {
  throw new Error(
    "GOOGLE_APPLICATION_CREDENTIALS environment variable is not set."
  );
}
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(credentialsPath), "utf8")
);

const PROJECT_ID = serviceAccount.project_id;

const jwtClient = new JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: SCOPES,
});

// Send FCM message using HTTP v1 API
export async function sendFcmHttpV1({
  token,
  notification,
  data,
  android,
  webpush,
}: {
  token: string;
  notification: { title: string; body: string };
  data?: Record<string, string>;
  android?: any;
  webpush?: any;
}) {
  try {
    await jwtClient.authorize();
    const accessToken = jwtClient.credentials.access_token;

    const message: any = { message: { token, notification } };
    if (data) message.message.data = data;
    if (android) message.message.android = android;
    if (webpush) message.message.webpush = webpush;

    await axios.post(
      `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`,
      message,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    logger.error("FCM send error: %o", error?.response?.data || error.message);
    throw error;
  }
}
