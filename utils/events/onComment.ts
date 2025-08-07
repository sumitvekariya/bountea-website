import { IssueCommentEvent, PullRequestEvent } from "@octokit/webhooks-types"
import { onPrOpenedMessage, onBountyRequestMessage } from "@utils/ghMessages"
import { createComment, editComment } from "@utils/ghHandler"
import getConnection from "@utils/getConnection"
import { Connection } from "@prisma/client"
import { getPinnedComment } from "@utils/getPinnedComment"

export default async function onComment(payload: IssueCommentEvent) {
  const text: string = payload.comment.body
  const requiredText = "### Bounty distribution request"

  if (text.includes(requiredText)) {
    const connection: Connection = await getConnection(payload.repository.id)
    // TODO: Update for TEA Network bounty system  
    const bountyId = (connection as any).bountyId || (connection as any).slicerId || 1
    const walletAddress = (connection as any).walletAddress || (connection as any).safeAddress || "0x"

    const splitText = text.split("-")
    let botMessage: string

    const indexToStart =
      splitText.findIndex((el) => el.includes(requiredText)) + 1

    const author = payload.issue.user.login

    const pinnedBotComment = await getPinnedComment(
      <PullRequestEvent & IssueCommentEvent>payload
    )
    // Check if comment's user is the PR owner
    if (payload.comment.user.id === payload.issue.user.id) {
      // Set bot message to fire in create comment
      // m is defined based on success
      const [m, success, totalBounty] = await onBountyRequestMessage(
        bountyId,
        splitText,
        indexToStart
      )
      botMessage = m

      // Edit first bot comment
      if (success) {
        const newFirstMessage =
          onPrOpenedMessage(author, bountyId, totalBounty) +
          "\n\n --- \n\n" +
          botMessage

        // If there is a pinned comment
        if (pinnedBotComment) {
          await editComment(
            payload.repository.owner.login,
            payload.repository.name,
            pinnedBotComment.id,
            newFirstMessage,
            payload.installation.id
          )
        } else {
          // TEA Network bounty management - placeholder for future implementation
          await createComment(
            payload.repository.owner.login,
            payload.repository.name,
            payload.issue.number,
            newFirstMessage,
            payload.installation.id
          )
        }
      }
    } else {
      botMessage =
        "User not authorized, only the PR owner can request bounty distributions"
    }
    if (
      pinnedBotComment ||
      !botMessage.includes("### Scheduled bounty distribution")
    ) {
      await createComment(
        payload.repository.owner.login,
        payload.repository.name,
        payload.issue.number,
        botMessage,
        payload.installation.id
      )
    }
  }
}
