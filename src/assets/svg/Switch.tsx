interface Props {
  classNames?: string
}

const Switch = ({ classNames }: Props) => {
  return (
    <svg
      className={classNames}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.909099 6.43205C0.821231 6.34418 0.821231 6.20172 0.909099 6.11385L5.36387 1.65908C5.45174 1.57121 5.5942 1.57121 5.68207 1.65908L6.95486 2.93187C7.04273 3.01974 7.04273 3.1622 6.95486 3.25007L3.93198 6.27295L6.95486 9.29583C7.04273 9.3837 7.04273 9.52616 6.95486 9.61403L5.68207 10.8868C5.5942 10.9747 5.45174 10.9747 5.36387 10.8868L0.909099 6.43205Z"
        fill="#E5E8EB"
      />
      <path d="M4.125 5.52295H21.375V7.02295H4.125V5.52295Z" fill="#E5E8EB" stroke="#E5E8EB" strokeWidth="0.75" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.3409 17.2618C22.4288 17.3497 22.4288 17.4921 22.3409 17.58L17.8861 22.0348C17.7983 22.1226 17.6558 22.1226 17.5679 22.0348L16.2951 20.762C16.2073 20.6741 16.2073 20.5316 16.2951 20.4438L19.318 17.4209L16.2951 14.398C16.2073 14.3101 16.2073 14.1677 16.2951 14.0798L17.5679 12.807C17.6558 12.7192 17.7983 12.7192 17.8861 12.807L22.3409 17.2618Z"
        fill="#E5E8EB"
      />
      <path d="M19.125 18.1709H1.875V16.6709H19.125V18.1709Z" fill="#E5E8EB" stroke="#E5E8EB" strokeWidth="0.75" />
    </svg>
  )
}

export default Switch
