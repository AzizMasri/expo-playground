import { Client, Account } from "appwrite";

export const config = {
  platform: 'com.sitespeople.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

const client = new Client();

client
  .setEndpoint(config.endpoint!) // Replace with your Appwrite endpoint
  .setProject(config.projectId!); // Replace with your Appwrite project ID

export const account = new Account(client);

export default client;
