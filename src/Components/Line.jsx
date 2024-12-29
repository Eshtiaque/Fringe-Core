
const Line = ({ from, to }) => {
  const fromX = from.x + 50;
  const fromY = from.y + 50;
  const toX = to.x + 50;
  const toY = to.y + 50;

  return (
    <svg
      className="absolute"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      {/* Horizontal */}
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={fromY}
        stroke="black"
        strokeDasharray="5,5"
        strokeWidth="2"
      />
      {/* Vertical */}
      <line
        x1={toX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="black"
        strokeDasharray="5,5"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Line;
