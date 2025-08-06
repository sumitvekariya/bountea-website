import { ethers, AlchemyProvider, Contract } from "ethers"
import { SliceCore } from "../types/SliceCore"
import { GnosisSafe } from "../types/GnosisSafe"
import { sliceCoreInterface } from "../abi/SliceCore"
import { gnosisSafeInterface } from "../abi/GnosisSafe"

export const sliceCoreAddress = process.env.NEXT_PUBLIC_SLICECORE
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID
export const provider = new AlchemyProvider(
  process.env.NEXT_PUBLIC_ENV,
  alchemyId
)

export const sliceCore = new Contract(
  sliceCoreAddress,
  sliceCoreInterface.abi,
  provider
) as unknown as SliceCore

export const safe = (safeAddress: string) =>
  new Contract(
    safeAddress,
    gnosisSafeInterface.abi,
    provider
  ) as unknown as GnosisSafe

export const mteWallet = new ethers.Wallet(String(process.env.PK))
