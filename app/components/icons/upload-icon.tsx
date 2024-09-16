import clsx from "clsx"

const UploadIcon: React.FC<{ animate: boolean }> = ({ animate }) => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <g className={clsx({ "animate-arrow-updown": animate })}>
      <path d="M17 8l-5-5-5 5" />
      <path d="M12 3v12" />
    </g>
  </svg>
)

export default UploadIcon
