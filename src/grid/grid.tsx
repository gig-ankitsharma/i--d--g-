type GridProps = {
  data: unknown[];
  onGridClick: (data: unknown[]) => void;
};

export const Grid = ({ data, onGridClick }: GridProps): React.JSX.Element => {
  return (
    <>
      <div
        className={`grid grid-${data[3]}`}
        onClick={() => onGridClick(data)}
      ></div>
    </>
  );
};
