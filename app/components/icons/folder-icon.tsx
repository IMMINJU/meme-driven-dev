import { motion } from "framer-motion"

const FolderIcon: React.FC<{ animate: boolean }> = ({ animate }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <motion.path
        d="M12 13l1.27-1.35a1.45 1.45 0 0 1 2.09.11 1.5 1.5 0 0 1 0 2.1L12 17l-3.36-3.14a1.5 1.5 0 0 1 0-2.1 1.45 1.45 0 0 1 2.09-.11L12 13"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          animate
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </svg>
  )
}
export default FolderIcon
