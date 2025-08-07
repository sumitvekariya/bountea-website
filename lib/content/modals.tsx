import { Button, DoubleText, LoadingStep } from "@components/ui"
import { accounts } from "@components/ui/Social/Social"

export type View = {
  name: ViewNames
  cross?: boolean
  params?: object
}
type ViewNames = "" | "SETUP"

export const SETUP = (params: any) => {
  const { uploadStep, setModalView, bountyId } = params

  let uploadState: string
  switch (uploadStep) {
    case 1:
      uploadState = "Connecting to TEA Network ..."
      break
    case 2:
      uploadState = "Setting up bounty system ..."
      break
    case 3:
      uploadState = "Configuring repository ..."
      break
    case 4:
      uploadState = "Something went wrong"
      break
    case 5:
      uploadState = "Success"
      break
  }
  return (
    <div className="text-center">
      <div className="pb-10 text-center">
        <DoubleText inactive logoText="Initializing BounTEA" />
      </div>
      <div className="grid items-center grid-cols-6 gap-2 px-4">
        <LoadingStep
          initCondition={uploadStep < 2}
          uploadState={uploadState}
          endState={uploadStep != 4 ? "TEA Network connected" : "Reverted"}
        />
        <LoadingStep
          nullCondition={uploadStep < 2}
          initCondition={uploadStep < 3}
          uploadState={uploadState}
          waitingState="Bounty system setup"
          endState={
            uploadStep != 4 ? (
              <>
                Bounty system #{bountyId} configured
              </>
            ) : (
              "Reverted"
            )
          }
        />
        <LoadingStep
          nullCondition={uploadStep < 3}
          initCondition={uploadStep < 4}
          uploadState={uploadState}
          waitingState="Repository setup"
          endState={uploadStep != 4 ? "Repository connected" : "Reverted"}
        />
      </div>
      <div className="pt-8">
        {uploadStep > 3 ? (
          <>
            {uploadStep != 4 && (
              <p className="pb-6 text-sm xs:px-10">
                Check out the{" "}
                <a
                  href={accounts.github + "#merge-to-earn-app"}
                  target="_blank"
                  rel="noreferrer"
                  className="highlight"
                >
                  BounTEA readme
                </a>{" "}
                on how to use the app
              </p>
            )}
            <Button
              label={uploadStep != 4 ? "Set another repo" : "Go back"}
              onClick={() => setModalView({ name: "" })}
            />
          </>
        ) : (
          <p className="max-w-sm mx-auto text-sm font-medium text-yellow-600">
            Wait until the process is completed
          </p>
        )}
      </div>
    </div>
  )
}
