import { PullRequestEvent } from "@octokit/webhooks-types"
import { Connection } from "@prisma/client"
import getConnection from "@utils/getConnection"
import { createComment } from "@utils/ghHandler"
import { onPrOpenedMessage } from "@utils/ghMessages"

export default async function onPrOpened(payload: PullRequestEvent) {
  const connection: Connection = await getConnection(payload.repository.id)
  
  if (!connection) {
    console.log("No connection found for repository:", payload.repository.id)
    return
  }

  // TODO: Get bounty ID and stats from TEA Network
  const bountyId = connection.id // Placeholder - use connection ID for now
  const totalBounties = 0 // TODO: Integrate with TEA Network bounty tracking
  const author = payload.pull_request.user.login
  
  await createComment(
    payload.repository.owner.login,
    payload.repository.name,
    payload.pull_request.number,
    onPrOpenedMessage(author, bountyId, totalBounties),
    payload.installation.id
  )
}
