import {
  SystemProgram,
  PublicKey,
  Keypair,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useAppKitProvider } from "@reown/appkit/react";
import {
  useAppKitConnection,
  type Provider,
} from "@reown/appkit-adapter-solana/react";
// import * as borsh from 'borsh';

// Program ID for the EventSnap program
const PROGRAM_ID = new PublicKey(
  "9B1F56Dx649qbEDRbQAXZtmPXTFrLaYjTXBuCeZWMJ1x"
);

// Constants for account sizes and limitations
// const EVENT_ACCOUNT_SIZE = 1024; // Estimated size, adjust as needed
// const USER_DATA_ACCOUNT_SIZE = 1024; // Estimated size, adjust as needed
// const PROGRAM_DATA_ACCOUNT_SIZE = 128; // Estimated size, adjust as needed

// Instruction discriminators from IDL
const INSTRUCTION_DISCRIMINATORS = {
  createEvent: Buffer.from([49, 219, 29, 203, 22, 98, 100, 87]),
  deleteEvent: Buffer.from([103, 111, 95, 106, 232, 24, 190, 84]),
  deleteImage: Buffer.from([196, 158, 176, 208, 221, 127, 46, 248]),
  getAllEvents: Buffer.from([224, 53, 176, 39, 120, 138, 187, 18]),
  getUserImagesByEvent: Buffer.from([40, 42, 253, 150, 210, 137, 54, 157]),
  initialize: Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]),
  joinEvent: Buffer.from([10, 93, 234, 137, 237, 194, 224, 0]),
  uploadImageWithTag: Buffer.from([250, 85, 172, 120, 239, 134, 184, 93]),
};

// Account discriminators from IDL
const ACCOUNT_DISCRIMINATORS = {
  Event: Buffer.from([125, 192, 125, 158, 9, 115, 152, 233]),
  ProgramData: Buffer.from([211, 243, 91, 186, 23, 190, 190, 4]),
  UserData: Buffer.from([139, 248, 167, 203, 253, 220, 210, 221]),
};

// Utility function to find program derived address (PDA)
function findPDA(seeds: Array<Buffer | Uint8Array>, programId: PublicKey) {
  const [publicKey, nonce] = PublicKey.findProgramAddressSync(seeds, programId);
  return { publicKey, nonce };
}

// Helper to encode string for instruction data
function encodeString(str: string): Buffer {
  const bytes = Buffer.from(str);
  const len = Buffer.alloc(4);
  len.writeUInt32LE(bytes.length, 0);
  return Buffer.concat([len, bytes]);
}

// Helper function to create an initialize instruction
function createInitializeInstruction(
  programDataAccount: PublicKey,
  owner: PublicKey,
  oracle: PublicKey
): TransactionInstruction {
  const data = Buffer.concat([
    INSTRUCTION_DISCRIMINATORS.initialize,
    Buffer.from(oracle.toBytes()),
  ]);

  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: programDataAccount, isSigner: true, isWritable: true },
      { pubkey: owner, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });
}

// Helper function to create a createEvent instruction
function createEventInstruction(
  eventAccount: PublicKey,
  programDataAccount: PublicKey,
  authority: PublicKey,
  uid: string,
  name: string,
  banner: string
): TransactionInstruction {
  // Encode strings for instruction data
  const uidEncoded = encodeString(uid);
  const nameEncoded = encodeString(name);
  const bannerEncoded = encodeString(banner);

  // Combine discriminator and encoded strings
  const data = Buffer.concat([
    INSTRUCTION_DISCRIMINATORS.createEvent,
    uidEncoded,
    nameEncoded,
    bannerEncoded,
  ]);

  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: eventAccount, isSigner: true, isWritable: true },
      { pubkey: programDataAccount, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });
}

// Helper function to create a joinEvent instruction
function createJoinEventInstruction(
  eventAccount: PublicKey,
  userDataAccount: PublicKey,
  authority: PublicKey
): TransactionInstruction {
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: eventAccount, isSigner: false, isWritable: true },
      { pubkey: userDataAccount, isSigner: true, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: INSTRUCTION_DISCRIMINATORS.joinEvent,
  });
}

// Helper function to create an uploadImageWithTag instruction
function createUploadImageWithTagInstruction(
  eventAccount: PublicKey,
  userDataAccount: PublicKey,
  authority: PublicKey,
  url: string,
  tag: string
): TransactionInstruction {
  // Encode strings for instruction data
  const urlEncoded = encodeString(url);
  const tagEncoded = encodeString(tag);

  // Combine discriminator and encoded strings
  const data = Buffer.concat([
    INSTRUCTION_DISCRIMINATORS.uploadImageWithTag,
    urlEncoded,
    tagEncoded,
  ]);

  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: eventAccount, isSigner: false, isWritable: true },
      { pubkey: userDataAccount, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
    ],
    data,
  });
}

// Helper function to create a deleteImage instruction
function createDeleteImageInstruction(
  userDataAccount: PublicKey,
  authority: PublicKey,
  imageIndex: number
): TransactionInstruction {
  // Encode the image index
  const indexBuffer = Buffer.alloc(4);
  indexBuffer.writeUInt32LE(imageIndex, 0);

  const data = Buffer.concat([
    INSTRUCTION_DISCRIMINATORS.deleteImage,
    indexBuffer,
  ]);

  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: userDataAccount, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
    ],
    data,
  });
}

// Helper function to create a deleteEvent instruction
function createDeleteEventInstruction(
  eventAccount: PublicKey,
  programDataAccount: PublicKey,
  authority: PublicKey
): TransactionInstruction {
  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: eventAccount, isSigner: false, isWritable: true },
      { pubkey: programDataAccount, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
    ],
    data: INSTRUCTION_DISCRIMINATORS.deleteEvent,
  });
}

// Helper function to create a getAllEvents instruction
// function createGetAllEventsInstruction(
//   programDataAccount: PublicKey,
//   eventAccount: PublicKey,
//   authority: PublicKey
// ): TransactionInstruction {
//   return new TransactionInstruction({
//     programId: PROGRAM_ID,
//     keys: [
//       { pubkey: programDataAccount, isSigner: false, isWritable: true },
//       { pubkey: eventAccount, isSigner: false, isWritable: true },
//       { pubkey: authority, isSigner: true, isWritable: true }
//     ],
//     data: INSTRUCTION_DISCRIMINATORS.getAllEvents
//   });
// }

// Helper function to create a getUserImagesByEvent instruction
// function createGetUserImagesByEventInstruction(
//   userDataAccount: PublicKey,
//   eventAccount: PublicKey,
//   authority: PublicKey
// ): TransactionInstruction {
//   return new TransactionInstruction({
//     programId: PROGRAM_ID,
//     keys: [
//       { pubkey: userDataAccount, isSigner: false, isWritable: true },
//       { pubkey: eventAccount, isSigner: false, isWritable: true },
//       { pubkey: authority, isSigner: true, isWritable: true }
//     ],
//     data: INSTRUCTION_DISCRIMINATORS.getUserImagesByEvent
//   });
// }

// Class for deserializing Event account data
class Event {
  uid: string;
  name: string;
  banner: string;
  owner: PublicKey;
  attendees: PublicKey[];
  highlight_images: string[];

  constructor(props: {
    uid: string;
    name: string;
    banner: string;
    owner: PublicKey;
    attendees: PublicKey[];
    highlight_images: string[];
  }) {
    this.uid = props.uid;
    this.name = props.name;
    this.banner = props.banner;
    this.owner = props.owner;
    this.attendees = props.attendees;
    this.highlight_images = props.highlight_images;
  }

  static deserialize(data: Buffer): Event | null {
    // Skip the 8-byte discriminator
    if (data.length <= 8) return null;

    let offset = 8;

    // Extract uid
    const uidLength = data.readUInt32LE(offset);
    offset += 4;
    const uid = data.slice(offset, offset + uidLength).toString("utf8");
    offset += uidLength;

    // Extract name
    const nameLength = data.readUInt32LE(offset);
    offset += 4;
    const name = data.slice(offset, offset + nameLength).toString("utf8");
    offset += nameLength;

    // Extract banner
    const bannerLength = data.readUInt32LE(offset);
    offset += 4;
    const banner = data.slice(offset, offset + bannerLength).toString("utf8");
    offset += bannerLength;

    // Extract owner
    const owner = new PublicKey(data.slice(offset, offset + 32));
    offset += 32;

    // Extract attendees array
    const attendeesCount = data.readUInt32LE(offset);
    offset += 4;
    const attendees: PublicKey[] = [];
    for (let i = 0; i < attendeesCount; i++) {
      attendees.push(new PublicKey(data.slice(offset, offset + 32)));
      offset += 32;
    }

    // Extract highlight_images array
    const highlightImagesCount = data.readUInt32LE(offset);
    offset += 4;
    const highlight_images: string[] = [];
    for (let i = 0; i < highlightImagesCount; i++) {
      const imageLength = data.readUInt32LE(offset);
      offset += 4;
      highlight_images.push(
        data.slice(offset, offset + imageLength).toString("utf8")
      );
      offset += imageLength;
    }

    return new Event({
      uid,
      name,
      banner,
      owner,
      attendees,
      highlight_images,
    });
  }
}

// Class for deserializing UploadedImage data
class UploadedImage {
  url: string;
  tag: string;
  uploader: PublicKey;

  constructor(props: { url: string; tag: string; uploader: PublicKey }) {
    this.url = props.url;
    this.tag = props.tag;
    this.uploader = props.uploader;
  }
}

// Class for deserializing UserData account data
class UserData {
  uploader_selfie: string;
  is_joined: boolean;
  images: UploadedImage[];

  constructor(props: {
    uploader_selfie: string;
    is_joined: boolean;
    images: UploadedImage[];
  }) {
    this.uploader_selfie = props.uploader_selfie;
    this.is_joined = props.is_joined;
    this.images = props.images;
  }

  static deserialize(data: Buffer): UserData | null {
    // Skip the 8-byte discriminator
    if (data.length <= 8) return null;

    let offset = 8;

    // Extract uploader_selfie
    const selfieLength = data.readUInt32LE(offset);
    offset += 4;
    const uploader_selfie = data
      .slice(offset, offset + selfieLength)
      .toString("utf8");
    offset += selfieLength;

    // Extract is_joined
    const is_joined = data[offset] === 1;
    offset += 1;

    // Extract images array
    const imagesCount = data.readUInt32LE(offset);
    offset += 4;
    const images: UploadedImage[] = [];

    for (let i = 0; i < imagesCount; i++) {
      // Extract url
      const urlLength = data.readUInt32LE(offset);
      offset += 4;
      const url = data.slice(offset, offset + urlLength).toString("utf8");
      offset += urlLength;

      // Extract tag
      const tagLength = data.readUInt32LE(offset);
      offset += 4;
      const tag = data.slice(offset, offset + tagLength).toString("utf8");
      offset += tagLength;

      // Extract uploader
      const uploader = new PublicKey(data.slice(offset, offset + 32));
      offset += 32;

      images.push(new UploadedImage({ url, tag, uploader }));
    }

    return new UserData({
      uploader_selfie,
      is_joined,
      images,
    });
  }
}

// Main EventSnap client functions
export function useEventSnap() {
  const { connection = null } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  // Add this check at the start of each async function
  const checkPrerequisites = () => {
    if (!walletProvider?.publicKey || !connection)
      throw new Error("Wallet not connected or connection not found");

    return {
      connection,
      walletProvider: {
        ...walletProvider,
        publicKey: walletProvider.publicKey as PublicKey,
      },
    };
  };

  // Find program data account PDA
  const programDataAccount = findPDA(
    [Buffer.from("program_data")],
    PROGRAM_ID
  ).publicKey;

  // Find event account PDA based on UID
  const getEventAccount = (uid: string) => {
    return findPDA([Buffer.from("event"), Buffer.from(uid)], PROGRAM_ID)
      .publicKey;
  };

  // Find user data account PDA based on user pubkey and event
  const getUserDataAccount = (user: PublicKey, eventAccount: PublicKey) => {
    return findPDA(
      [Buffer.from("user_data"), user.toBuffer(), eventAccount.toBuffer()],
      PROGRAM_ID
    ).publicKey;
  };

  // Initialize the program
  async function initializeProgram(oracle: PublicKey) {
    const { connection, walletProvider } = checkPrerequisites();

    // Create a new program data account
    const programDataKeypair = Keypair.generate();

    // Create instruction to initialize program
    const initializeIx = createInitializeInstruction(
      programDataKeypair.publicKey,
      walletProvider.publicKey,
      oracle
    );

    // Create transaction and add instruction
    const tx = new Transaction().add(initializeIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    // Sign with the keypair first
    tx.sign(programDataKeypair);

    // Then send with the wallet
    await walletProvider.signAndSendTransaction(tx);

    return programDataKeypair.publicKey;
  }

  // Create a new event
  async function createEvent(uid: string, name: string, banner: string) {
    const { connection, walletProvider } = checkPrerequisites();

    // Generate a new keypair for the event account
    const eventKeypair = Keypair.generate();

    // Create instruction to create event
    const createEventIx = createEventInstruction(
      eventKeypair.publicKey,
      programDataAccount,
      walletProvider.publicKey,
      uid,
      name,
      banner
    );

    // Create transaction and add instruction
    const tx = new Transaction().add(createEventIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;

    // Sign with the keypair
    tx.partialSign(eventKeypair);

    // Send transaction through the wallet
    await walletProvider.sendTransaction(tx, [eventKeypair]);

    return eventKeypair.publicKey;
  }

  // Join an event
  async function joinEvent(eventUid: string) {
    const { connection, walletProvider } = checkPrerequisites();

    const eventAccount = getEventAccount(eventUid);

    // Generate a new keypair for the user data account
    const userDataKeypair = Keypair.generate();

    // Create instruction to join event
    const joinEventIx = createJoinEventInstruction(
      eventAccount,
      userDataKeypair.publicKey,
      walletProvider.publicKey
    );

    // Create transaction and add instruction
    const tx = new Transaction().add(joinEventIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    // Sign and send transaction
    tx.sign(userDataKeypair);
    await walletProvider.signAndSendTransaction(tx);

    return userDataKeypair.publicKey;
  }

  // Upload an image with a tag to an event
  async function uploadImageWithTag(
    eventUid: string,
    url: string,
    tag: string
  ) {
    const { connection, walletProvider } = checkPrerequisites();

    const eventAccount = getEventAccount(eventUid);
    const userDataAccount = getUserDataAccount(
      walletProvider.publicKey,
      eventAccount
    );

    // Create instruction to upload image with tag
    const uploadImageIx = createUploadImageWithTagInstruction(
      eventAccount,
      userDataAccount,
      walletProvider.publicKey,
      url,
      tag
    );

    // Create transaction and add instruction
    const tx = new Transaction().add(uploadImageIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    // Sign and send transaction
    await walletProvider.signAndSendTransaction(tx);

    return true;
  }

  // Delete an image
  async function deleteImage(eventUid: string, imageIndex: number) {
    const { connection, walletProvider } = checkPrerequisites();

    const eventAccount = getEventAccount(eventUid);
    const userDataAccount = getUserDataAccount(
      walletProvider.publicKey,
      eventAccount
    );

    // Create instruction to delete image
    const deleteImageIx = createDeleteImageInstruction(
      userDataAccount,
      walletProvider.publicKey,
      imageIndex
    );

    // Create transaction and add instruction
    const tx = new Transaction().add(deleteImageIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    // Sign and send transaction
    await walletProvider.signAndSendTransaction(tx);

    return true;
  }

  // Delete an event
  async function deleteEvent(eventUid: string) {
    const { connection, walletProvider } = checkPrerequisites();

    const eventAccount = getEventAccount(eventUid);

    // Create instruction to delete event
    const deleteEventIx = createDeleteEventInstruction(
      eventAccount,
      programDataAccount,
      walletProvider.publicKey
    );

    // Create transaction and add instruction
    const tx = new Transaction().add(deleteEventIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    // Sign and send transaction
    await walletProvider.signAndSendTransaction(tx);

    return true;
  }

  // Get all events
  async function getAllEvents() {
    const { connection } = checkPrerequisites();

    // Fetch all events
    // Note: This is a simplification - in a real app, you'd need to query program accounts
    // with the Event discriminator and deserialize them
    const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: Buffer.from(ACCOUNT_DISCRIMINATORS.Event).toString("base64"),
          },
        },
      ],
    });

    return accounts
      .map((account) => {
        return Event.deserialize(account.account.data);
      })
      .filter(Boolean);
  }

  // Get user images by event
  async function getUserImagesByEvent(eventUid: string) {
    const { connection, walletProvider } = checkPrerequisites();

    const eventAccount = getEventAccount(eventUid);
    const userDataAccount = getUserDataAccount(
      walletProvider.publicKey,
      eventAccount
    );

    try {
      const accountInfo = await connection.getAccountInfo(userDataAccount);

      if (!accountInfo) {
        throw new Error("User data account not found");
      }

      const userData = UserData.deserialize(accountInfo.data);
      return userData?.images || [];
    } catch (error) {
      console.error("Error fetching user images:", error);
      return [];
    }
  }

  return {
    initializeProgram,
    createEvent,
    joinEvent,
    uploadImageWithTag,
    deleteImage,
    deleteEvent,
    getAllEvents,
    getUserImagesByEvent,
  };
}
