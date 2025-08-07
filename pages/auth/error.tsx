import { Container } from "@components/ui"
import Head from "@components/common/Head"
import { Button } from "@components/ui"
import { useRouter } from "next/router"

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  const getErrorMessage = (error: string | string[] | undefined) => {
    switch (error) {
      case "Configuration":
        return "Server configuration error. Please contact support."
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in."
      case "Verification":
        return "Verification error. Please try again."
      case "Default":
      default:
        return "An authentication error occurred. Please try again."
    }
  }

  return (
    <>
      <Head />
      <Container page={true}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-red-600 dark:text-red-400">
                Authentication Error
              </h2>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {getErrorMessage(error)}
              </p>
              <div className="mt-6 space-y-4">
                <Button
                  label="Try Again"
                  onClick={() => router.push("/auth/signin")}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
                <Button
                  label="Go Home"
                  onClick={() => router.push("/")}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
