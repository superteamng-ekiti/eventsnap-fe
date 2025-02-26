"use client";

import ImageUploader from "@/components/global/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadImage } from "@/hooks/api/use-upload-image";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  SystemProgram,
  PublicKey,
  Keypair,
  Transaction,
  TransactionInstruction,
  Signer,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider
} from "@reown/appkit/react";
import {
  useAppKitConnection,
  type Provider
} from "@reown/appkit-adapter-solana/react";
import { Buffer } from "buffer";
import idl from "../../../idl/eventsnap.json";

export const CreateEventsModal = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { uploadImage: mutateUploadImage, isLoading: isUploading } =
    useUploadImage();

  const { open } = useAppKit();

  const { address } = useAppKitAccount();
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const uploadImage = async (file: File) => {
    // const formData = new FormData()
    // formData.append("image", file, file.name)

    // console.log('FormData contents:')
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1])
    // }

    mutateUploadImage([file]);
  };

  useEffect(() => {
    open();
  }, []);

  async function createEvent(uid: string, name: string, banner: string) {
    const PROGRAM_ID = new PublicKey(idl.address);
    const eventKeypair = Keypair.generate(); // New event account
    const eventAccount = eventKeypair.publicKey;

    if (!address || !connection) return;
    if (!walletProvider || !walletProvider.publicKey) {
      throw new Error("Wallet not connected");
    }

    console.log(`✅ Wallet connected`);

    // Create Event Instruction
    const createEventIx = new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: eventAccount, isSigner: true, isWritable: true },
        { pubkey: new PublicKey(address), isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
      ],
      data: Buffer.from(
        Uint8Array.of(...new TextEncoder().encode(uid + name + banner))
      )
    });

    console.log(`✅ Created instruction`);

    // Create and sign transaction
    const tx = new Transaction().add(createEventIx);
    tx.feePayer = walletProvider.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    console.log(`✅ Fetched latest blockhash`);

    // ✅ Sign transaction manually with both the wallet and eventKeypair
    tx.partialSign(eventKeypair);
    const signedTx = await walletProvider.signTransaction(tx);

    console.log(`✅ Transaction signed`);

    // ✅ Send the transaction
    try {
      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed"
        }
      );

      console.log(`✅ Event ${name} created! Tx Signature: ${signature}`);
    } catch (error) {
      console.error("❌ Transaction failed:", error);
    }
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    if (files.length === 0) {
      alert("Please upload an image");
      return;
    }

    const image = files[0];

    console.log("image", image);

    // const imageIpfsUrl = await uploadImage(image);

    // console.log(imageIpfsUrl);

    setLoading(false);
    console.log("calling smart contract");

    // TODO: CALL THE CREATE EVENTS FUNCTION
    try {
      const finishedEvent = await createEvent(
        "hello",
        "Summer event",
        "link to banner"
      );
      console.log("eventt submitted success", finishedEvent);
    } catch (error: any) {
      console.log("error occured: ", error.toString());
    }

    // TODO: CLOSE THE MODAL
    // TODO: REFRESH THE EVENTS LIST
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Create a new event here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label>What’s the name of your event?</Label>
            <Input
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <ImageUploader
            multiple={false}
            allowedTypes={["image/jpeg", "image/png"]}
            files={files}
            onFilesChange={setFiles}
          />
        </div>
        <DialogFooter>
          <Button
            size="sm"
            disabled={!name || files.length === 0 || loading || isUploading}
            onClick={handleSave}
          >
            {loading || isUploading ? "Creating..." : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
