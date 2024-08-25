import { Client, Account, Databases } from "appwrite";

const client = new Client();

const endpoint = process.env.APPWRITE_ENDPOINT;
const project = process.env.APPWRITE_PROJECT;

client.setEndpoint(endpoint!).setProject(project!);

export const account = new Account(client);
export const databases = new Databases(client);
