import { PROJECT_ID } from "@/constant";
import { BaseWalletAdapter, SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solanaDevnet, solana, solanaTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// import { defineChain } from '@reown/appkit/networks';

// const devnetSonic = defineChain({
//   id: "sonic-devnet",
// })


export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter() as unknown as BaseWalletAdapter<string>, new SolflareWalletAdapter() as unknown as BaseWalletAdapter<string>],
});

export const projectId = PROJECT_ID ?? "";

export const metadata = {
  name: "AppKit",
  description: "AppKit Solana Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const createAppKitMethod = () => createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaTestnet, solanaDevnet],
  metadata: metadata,
  projectId: projectId,
  features: {
    analytics: true,
  },
});