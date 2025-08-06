// Temporary compatibility layer for ethers v6 migration
// This file provides type compatibility while we upgrade to ethers v6

declare module "ethers" {
  export interface BigNumber extends BigNumberish {}
  export interface CallOverrides {}
  export interface PayableOverrides {}
  export interface PopulatedTransaction {}
  export interface Listener {}
}

// Temporary type exports for backward compatibility
export type BigNumber = import("ethers").BigNumberish;
export type CallOverrides = Record<string, any>;
export type PayableOverrides = Record<string, any>;
export type PopulatedTransaction = Record<string, any>;
export type ContractReceipt = any;
export type Event = any;
