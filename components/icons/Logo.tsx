import Image from "next/image"

const Logo = () => {
  return (
    <Image
      src="/favicon/android-chrome-512x512.png"
      alt="BounTEA Logo"
      width={40}
      height={40}
      className="w-full h-full object-contain"
      priority
    />
  )
}

export default Logo
