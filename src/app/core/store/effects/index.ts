import { ErrorEffects } from './error.effects';
import { Web3GatewayEffects } from './web3-gateway.effects';
import { IpfsDaemonEffects } from './ipfs-daemon.effects';
import { IpfsImageEffects } from './ipfs-image.effects';
import { NftMintingEffects } from './nft-minting.effects';

export const effects: any[] = [ErrorEffects,
    Web3GatewayEffects, IpfsDaemonEffects,IpfsImageEffects,NftMintingEffects];

export * from './error.effects';
export * from './web3-gateway.effects';
export * from './ipfs-daemon.effects';
export * from './ipfs-image.effects';
export * from './nft-minting.effects';
