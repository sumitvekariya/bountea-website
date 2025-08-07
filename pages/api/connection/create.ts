import prisma from "@lib/prisma"
import fetcher from "@utils/fetcher"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, installationId, repoId, bountyId, walletAddress } = req.body

  try {
    const Authorization = "Bearer " + token
    const body = {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization
      },
      method: "GET"
    }
    console.log(1)

    const repoData = await fetcher(
      `https://api.github.com/user/installations/${installationId}/repositories`,
      body
    )

    console.log(2)
    if (
      repoData?.repositories?.findIndex((el: any) => el.id == Number(repoId)) ==
      -1
    ) {
      throw Error("You haven't installed BounTEA on this repo")
    }

    console.log(3)
    // TODO: Update database connection for TEA Network bounty system
    // const connectionData = await prisma.connection.create({
    //   data: {
    //     repoId: Number(repoId),
    //     bountyId: Number(bountyId),
    //     walletAddress
    //   }
    // })
    const connectionData = { id: 1, repoId: Number(repoId), bountyId: Number(bountyId), walletAddress }
    console.log(4)

    res.status(200).json(connectionData)
  } catch (error) {
    console.log(error)

    res.status(500).json(error)
  }
}

export default handler
