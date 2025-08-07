import formatNumber from "./formatNumber"

export const resolveEnsForBot = async (address: string) => {
  // ENS resolution functionality for GPG addresses if needed
  // This would need to be updated for TEA Network address resolution
  return address
}

export const isValidAddress = (address: string) => {
  return address.match(/^(0x[a-fA-F0-9]{40})$|\.eth$/)
}

export const baseReviewMessage =
  "Please review your request and submit it again."

export function onPrOpenedMessage(
  author: string,
  bountyId: string | number,
  totalBounties: number
) {
  const today = new Date()
  return `### 👋 Gm @${author}

  This repository uses [BounTEA](https://github.com/sumitvekariya/bountea-website) to reward contributors with bounties via TEA Network's GPG-based Account Abstraction.
  
  When merging a pull request, contributors can **receive an agreed bounty amount in supported tokens directly to their GPG-derived wallet address**. 
  
  Funds are managed through TEA Network's secure escrow system and can be claimed using your GPG key for Account Abstraction.

  ---
  
  To request bounty distribution, comment using this template by specifying the **GPG addresses or wallet addresses** of the contributors involved and the **desired bounty amount** for each.
  
  \`\`\`
  Include any optional details related to your request here.
  
  ### Bounty distribution request
  
  - contributor@example.com (GPG) : 1000 USDC
  - 0x... : 500 USDC
  - reviewer@example.com (GPG) : 50 USDC
  \`\`\`
  
  > Current total bounties processed (${today.toDateString()}): ${formatNumber(totalBounties)}
  `
}

// TODO fix params type
export async function onBountyRequestMessage(
  bountyId: string | number,
  splitText: string[],
  indexToStart: number
): Promise<[string, boolean, number]> {
  let isSuccess = false
  let totalBounties = 0
  const newSplitText = splitText.slice(indexToStart)
  const resolvedArray = []

  for (let i = 0; i < newSplitText.length; i++) {
    const el: string = newSplitText[i]
    const [addressTt, bountyAmountTt] = el.split(":")
    const address = addressTt.trim()
    const bountyAmount = bountyAmountTt.trim()
    
    if (bountyAmount && bountyAmount.length > 0) {
      if (isValidAddress(address) || address.includes("@")) { // GPG email or wallet address
        const resolved = await resolveEnsForBot(address)
        if (resolved) {
          resolvedArray.push("| " + resolved + " | " + bountyAmount + " |")
        } else {
          return [
            "Address not resolved.\n" + baseReviewMessage,
            isSuccess,
            totalBounties
          ]
        }
      } else {
        return [
          "Invalid address or message format.\n" + baseReviewMessage,
          isSuccess,
          totalBounties
        ]
      }
    } else {
      return [
        "Invalid bounty amount or message format.\n" + baseReviewMessage,
        isSuccess,
        totalBounties
      ]
    }
  }
  isSuccess = true

  // TODO: Integrate with TEA Network bounty tracking
  totalBounties = 0 // Placeholder for actual bounty count

  return [
    "### Scheduled bounty distribution \n| Address | Amount |\n| --- | --- |\n" +
      resolvedArray.join(" \n ") +
      "\n \n > **Bounties to be distributed via TEA Network escrow**",
    isSuccess,
    totalBounties
  ]
}
