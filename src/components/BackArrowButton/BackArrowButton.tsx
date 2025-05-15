import { Link } from 'react-router-dom'

type BackArrowButtonProps = {
  pathTo: string
  buttonText: string
}
const BackArrowButton = ({ pathTo, buttonText }: BackArrowButtonProps): JSX.Element => {
  return (
    <Link
      to={pathTo}
      className="inline-block mb-6 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1"
      aria-label={buttonText}
      tabIndex={0}
    >
      ← {buttonText}
    </Link>
  )
}
export default BackArrowButton
