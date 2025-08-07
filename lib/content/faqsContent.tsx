import Link from "next/link"

export const faqsMain = [
  {
    question: "How does BounTEA work?",
    answer: (
      <>
        <p>
          BounTEA integrates bounties directly into the GitHub workflow using smart contracts on the TEA Network and GPG-based Account Abstraction.
        </p>
        <p>The bounty lifecycle works as follows:</p>
        <ol>
          <li>
            <b>Post Bounty:</b> Anyone comments on a GitHub issue with{" "}
            <code>/bountea post &lt;amount&gt; &lt;TOKEN&gt;</code> to create a bounty
          </li>
          <li>
            <b>Fund Bounty:</b> The bounty creator funds the escrow smart contract on TEA Network with the specified tokens
          </li>
          <li>
            <b>Contribute:</b> Contributors submit GPG-signed pull requests linked to the bountied issue
          </li>
          <li>
            <b>Merge & Notify:</b> When the PR is merged, BounTEA automatically notifies the contributor they can claim the bounty
          </li>
          <li>
            <b>Claim Reward:</b> Contributors use ZK Pass tool and GPG Wallet to prove ownership and claim funds to their GPG-controlled smart account
          </li>
        </ol>
      </>
    ),
    id: "how-it-works"
  },
  {
    question: "What is GPG-based Account Abstraction?",
    answer: (
      <>
        <p>
          BounTEA leverages the TEA Network&apos;s unique GPG Precompile to enable Account Abstraction using GPG keys. This means contributors can receive crypto payments without needing a traditional EVM wallet.
        </p>
        <p>
          When you claim a bounty, the TEA Network&apos;s GPG Precompile validates your GPG key and creates or resolves a smart account address controlled by that key. Funds are sent directly to this GPG-controlled smart account, which you can access using tools like the GPG Wallet.
        </p>
        <p>
          This eliminates the barrier of needing to set up cryptocurrency wallets before contributing to open source projects.
        </p>
      </>
    ),
    id: "gpg-account-abstraction"
  },
  {
    question: "What do contributors need to claim bounties?",
    answer: (
      <>
        <p>
          To claim bounties with BounTEA, contributors need:
        </p>
        <ol>
          <li>
            <b>GPG Key:</b> A configured GPG key for signing commits (most developers already have this)
          </li>
          <li>
            <b>GPG-Signed Commits:</b> All commits in the merged PR must be signed with your GPG key
          </li>
          <li>
            <b>ZK Pass Tool:</b> Used to generate zero-knowledge proofs proving GPG ownership of the merged commit
          </li>
          <li>
            <b>GPG Wallet:</b> A specialized wallet for interacting with GPG-controlled smart accounts on TEA Network
          </li>
        </ol>
        <p>
          The beauty of this system is that contributors don&apos;t need to set up traditional cryptocurrency wallets beforehand - the GPG key they already use for development becomes their wallet through Account Abstraction.
        </p>
      </>
    ),
    id: "requirements"
  },
  {
    question: "What tokens can be used for bounties?",
    answer: (
      <>
        <p>
          BounTEA uses a centrally managed token allowlist on the TEA Network. Only approved tokens can be used for bounties to ensure security and prevent spam.
        </p>
        <p>
          When posting a bounty with <code>/bountea post &lt;amount&gt; &lt;TOKEN&gt;</code>, the token symbol must match one from the approved allowlist. The BounTEA escrow contract automatically validates this during the funding process.
        </p>
        <p>
          The allowlist includes common tokens available on the TEA Network and is managed by the TEA team to maintain security and usability.
        </p>
      </>
    ),
    id: "tokens"
  },
  {
    question: "How do I access my claimed bounty funds?",
    answer: (
      <>
        <p>
          When you successfully claim a bounty, funds are transferred to your GPG-controlled smart account on the TEA Network. You can access and manage these funds using the{" "}
          <b>GPG Wallet</b>, a specialized tool designed for GPG-based Account Abstraction.
        </p>
        <p>
          The GPG Wallet allows you to view your balance, transfer funds, and interact with other DeFi protocols on the TEA Network using your existing GPG key as authentication.
        </p>
      </>
    ),
    id: "access-funds"
  },
  {
    question: "How secure is the BounTEA claim process?",
    answer: (
      <>
        <p>
          BounTEA uses multiple layers of security to ensure only legitimate contributors can claim bounties:
        </p>
        <ol>
          <li>
            <b>GPG Signature Verification:</b> Contributors must GPG-sign their commits, proving identity through cryptographic signatures
          </li>
          <li>
            <b>Zero-Knowledge Proofs:</b> The ZK Pass tool generates proofs that validate GPG ownership without revealing private keys
          </li>
          <li>
            <b>TEA Network Precompile:</b> The GPG Precompile on TEA Network provides secure validation and Account Abstraction
          </li>
          <li>
            <b>Smart Contract Escrow:</b> Funds are held in audited smart contracts until legitimate claims are verified
          </li>
        </ol>
        <p>
          This multi-layered approach ensures that only the actual contributor who signed and merged the code can claim the associated bounty.
        </p>
      </>
    ),
    id: "security"
  },
  {
    question: "How much does BounTEA cost?",
    answer: (
      <>
        <p>
          BounTEA is <b>completely free to use</b>. There are no platform fees or commissions taken from bounties.
        </p>
        <p>
          Users only pay standard transaction fees (gas costs) when interacting with the TEA Network blockchain. This includes:
        </p>
        <ul>
          <li>Funding bounties (paying into the escrow contract)</li>
          <li>Claiming bounties (calling the claim function with ZK proof)</li>
          <li>Transferring funds from GPG-controlled smart accounts</li>
        </ul>
        <p>
          The TEA Network is designed to have low transaction costs, making microbounties economically viable for open source contributions.
        </p>
      </>
    ),
    id: "pricing"
  }
]
