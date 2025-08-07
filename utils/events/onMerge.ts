import { IssueCommentEvent, PullRequestEvent } from "@octokit/webhooks-types"
import { Connection } from "@prisma/client"
import getConnection from "@utils/getConnection"
import { getPinnedComment } from "@utils/getPinnedComment"
import { createComment } from "@utils/ghHandler"

export default async function onMerge(payload: PullRequestEvent) {
  const connection: Connection = await getConnection(payload.repository.id)
  
  if (!connection) {
    console.log("No connection found for repository:", payload.repository.id)
    return
  }

  const pinnedBotComment = await getPinnedComment(
    <PullRequestEvent & IssueCommentEvent>payload
  )

  if (pinnedBotComment) {
    // TODO: Integrate with TEA Network bounty distribution
    // Parse bounty distribution requests from pinned comment
    
    const message = "Bounty distribution will be processed via TEA Network's escrow system 🚀"

    await createComment(
      payload.repository.owner.login,
      payload.repository.name,
      payload.pull_request.number,
      message,
      payload.installation.id
    )
  }
}
