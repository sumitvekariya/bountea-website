// Simplified SliceCore types for ethers v6 compatibility
import type { BaseContract } from "ethers";

export interface SliceCore extends BaseContract {
  [key: string]: any;
}
