import { Installation } from "@octokit/webhooks-types"
import fetcher from "@utils/fetcher"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ error: "Token is required" })
  }

  const Authorization = "Bearer " + token
  const body = {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization
    },
    method: "GET"
  }

  try {
    // For regular OAuth tokens, use the /user/repos endpoint instead
    // The /user/installations endpoint requires GitHub App tokens
    const userRepos = await fetcher(
      "https://api.github.com/user/repos?per_page=100&sort=updated",
      body
    )

    console.log("userRepos response:", Array.isArray(userRepos) ? `Array with ${userRepos.length} items` : userRepos)

    // Check if we got an error response
    if (userRepos.message || userRepos.error) {
      console.error("GitHub API Error:", userRepos.message || userRepos.error)
      return res.status(403).json({ 
        error: "GitHub API Error", 
        message: userRepos.message || userRepos.error
      })
    }

    // Ensure we have an array of repositories
    if (!Array.isArray(userRepos)) {
      console.error("Unexpected response format:", userRepos)
      return res.status(500).json({ 
        error: "Unexpected response format from GitHub API" 
      })
    }

    // Return user repositories in the expected format
    res.status(200).json([{
      installation_id: 0, // Use 0 for OAuth repos (no installation)
      total_count: userRepos.length,
      repositories: userRepos
    }])
    
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    res.status(500).json({ 
      error: "Failed to fetch repositories",
      message: error.message 
    })
  }
}

export default handler
