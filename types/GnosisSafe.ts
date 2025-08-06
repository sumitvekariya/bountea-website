// Simplified GnosisSafe types for ethers v6 compatibility
import type { BaseContract } from "ethers";

export interface GnosisSafe extends BaseContract {
  getTransactionHash: (...args: any[]) => Promise<string>;
  [key: string]: any;
}