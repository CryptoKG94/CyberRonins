import { ErrorEffects } from './error.effects';
import { Web3GatewayEffects } from './web3-gateway.effects';
import { IpfsDaemonEffects } from './ipfs-daemon.effects';

export const effects: any[] = [ErrorEffects,
    Web3GatewayEffects, IpfsDaemonEffects];

export * from './error.effects';
export * from './web3-gateway.effects';
export * from './ipfs-daemon.effects';
