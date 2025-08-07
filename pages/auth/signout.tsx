import { useRouter } from "next/router"
import { useEffect } from "react"
import { Container } from "@components/ui"
import Head from "@components/common/Head"

export default function SignOut() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Head />
      <Container page={true}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Signed Out
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                You have been successfully signed out of BounTEA.
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                Redirecting to homepage...
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
