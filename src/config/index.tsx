import { PROJECT_ID } from "@/constant";
import {
  BaseWalletAdapter,
  SolanaAdapter
} from "@reown/appkit-adapter-solana/react";
import {
  defineChain
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";

const sonicSvmTestnet = defineChain({
  blockExplorers: {
    default: {
      name: "Sonic Explorer",
      url: "https://explorer.sonic.game"
    }
  },
  name: "Sonic SVM Testnet",

  // Keep the Solana currency details if the native currency is still SOL
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9
  },
  rpcUrls: {
    default: {
      http: ["https://api.testnet.sonic.game"]
    }
  },

  testnet: true,
  chainNamespace: "solana",

  // to be updatted
  id: "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  caipNetworkId: "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",

  custom: {
    faucetUrl: "https://faucet.sonic.game",
    mainnetAlphaUrl: "https://api.mainnet-alpha.sonic.game"
  },

  network: "sonic-testnet"
});
export const sonicSvmMainnet = defineChain({
  blockExplorers: {
    default: {
      name: "Sonic Explorer",
      url: "https://explorer.sonic.game"
    }
  },

  name: "Sonic SVM Mainnet",
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9
  },

  rpcUrls: {
    default: {
      http: ["https://api.mainnet-alpha.sonic.game"]
    }
  },

  testnet: false,
  chainNamespace: "solana",
  id: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",

  caipNetworkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  network: "sonic-mainnet"
});

export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [
    new PhantomWalletAdapter() as unknown as BaseWalletAdapter<string>,
    new SolflareWalletAdapter() as unknown as BaseWalletAdapter<string>
  ]
});

export const projectId = PROJECT_ID ?? "";

export const metadata = {
  name: "AppKit",
  description: "AppKit Solana Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"]
};

export const createAppKitMethod = () =>
  createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [sonicSvmTestnet, sonicSvmMainnet],
    metadata: metadata,
    projectId: projectId,
    features: {
      analytics: true
    }
  });
