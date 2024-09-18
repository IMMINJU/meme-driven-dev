import { SVGProps } from "react"

const FlowerIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" fill="yellow" />
      <path d="M12 2 L12 5" />
      <path d="M12 19 L12 22" />
      <path d="M2 12 L5 12" />
      <path d="M19 12 L22 12" />
      <path d="M4.93 4.93 L7.05 7.05" />
      <path d="M16.95 16.95 L19.07 19.07" />
      <path d="M4.93 19.07 L7.05 16.95" />
      <path d="M16.95 7.05 L19.07 4.93" />
    </svg>
  )
}
export default FlowerIcon
