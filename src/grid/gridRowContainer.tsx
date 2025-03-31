import { Key } from 'react';
import { Grid } from './grid';

type GridRowContainerProps = {
  gridRow: unknown[][];
  onGridClick: (data: unknown[]) => void;
};

export const GridRowContainer = ({
  gridRow,
  onGridClick,
}: GridRowContainerProps): React.JSX.Element => {
  if (gridRow.length < 0) {
    return <></>;
  }
  return (
    <>
      <div className="d-flex">
        {gridRow.map((item) => (
          <Grid key={item[2] as Key} data={item} onGridClick={onGridClick} />
        ))}
      </div>
    </>
  );
};
