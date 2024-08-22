import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://appwrite.theisland.computer')
    .setProject('66c5c4c2000afb9c17fe');

export const account = new Account(client);
export const databases = new Databases(client);
