import { GetServerSideProps } from "next"
import { getProviders, signIn, getSession, ClientSafeProvider } from "next-auth/react"
import { Container } from "@components/ui"
import Head from "@components/common/Head"
import { Button } from "@components/ui"

interface SignInProps {
  providers: Record<string, ClientSafeProvider>
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <>
      <Head />
      <Container page={true}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to BounTEA
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Connect your GitHub account to manage bounties
              </p>
            </div>
            <div className="mt-8 space-y-6">
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    label={`Sign in with ${provider.name}`}
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const providers = await getProviders()

  return {
    props: {
      providers: providers ?? {},
    },
  }
}
