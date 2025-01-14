import { Client, Databases, Account, Avatars } from "react-native-appwrite";

export const config = {
  platform: 'com.sitespeople.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}


const client = new Client();
client
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

    

export const account = new Account(client);
export const databases = new Databases(client);

export const avatars = new Avatars(client);
