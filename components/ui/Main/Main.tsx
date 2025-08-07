import {
  Button,
  FormGithub
} from "@components/ui"
import { useState } from "react"
import { GithubCircle } from "@components/icons/Social"
import { signIn, useSession } from "next-auth/react"
import fetcher from "@utils/fetcher"
import useSWR from "swr"
import { Repo, RepoResponse } from "../FormGithub/FormGithub"
import saEvent from "@utils/saEvent"

const Main = () => {
  const { data: session } = useSession()
  const [repo, setRepo] = useState<Repo>()

  const {
    data: repoList
  }: {
    data?: RepoResponse[]
  } = useSWR(
    session?.accessToken ? `/api/getRepo?token=${session.accessToken}` : null,
    fetcher
  )

  const { data: isUnsetRepo } = useSWR(
    repo ? `/api/connection/get?repoId=${repo.repoId}` : null,
    fetcher
  )

  return session ? (
    <div className="w-full mx-auto space-y-8 max-w-screen-xs">
      <FormGithub repo={repo} setRepo={setRepo} repoList={repoList} />
      
      {isUnsetRepo && (
        <p className="font-medium text-yellow-600">
          This repo has already been set up
        </p>
      )}

      {repo && !isUnsetRepo && (
        <div className="p-6 bg-tea-50 dark:bg-gray-800 border border-tea-200 dark:border-tea-800 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Repository Selected: {repo.repoId}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            TEA Network integration and bounty management features will be available here soon.
          </p>
          <div className="text-center">
            <p className="text-sm text-tea-600 dark:text-tea-400">
              🚀 Coming Soon: GPG-based Account Abstraction & Bounty Claims
            </p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center space-y-6">
      <Button
        label={
          <span className="flex items-center gap-3">
            <span className="h-5 text-white">
              <GithubCircle />
            </span>
            <span>Sign in with Github</span>
          </span>
        }
        onClick={() => {
          saEvent("signin_github_attempt")
          signIn("github")
        }}
        color="text-white bg-black hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-150"
      />
    </div>
  )
}

export default Main
