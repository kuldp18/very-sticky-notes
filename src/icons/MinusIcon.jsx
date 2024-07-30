// eslint-disable-next-line react/prop-types
const MinusIcon = ({ size = "24", color = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      fill="none"
      strokeWidth="1.5"
    >
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
};

export default MinusIcon;
