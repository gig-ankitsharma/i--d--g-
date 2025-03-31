import { ChangeEvent, Key, useState } from 'react';
import { GridRowContainer } from './gridRowContainer';

export const GridForm = () => {
  const [gridForm, setGridForm] = useState<{ row: number; columns: number }>({
    row: '' as unknown as number,
    columns: '' as unknown as number,
  });

  const [gridArray, setGridArray] = useState<unknown[][][]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGridForm({ ...gridForm, [e.target.name]: Number(e.target.value) });
  };

  const createGridArray = (result: unknown[][]): unknown[][][] => {
    let startIndex = 0;
    let endIndex = gridForm.columns;
    const finalArray = [];
    if (result.length !== 0) {
      while (finalArray.length !== gridForm.row) {
        finalArray.push([...result.slice(startIndex, endIndex)]);
        startIndex += gridForm.columns;
        endIndex += gridForm.columns;
      }
    }
    return finalArray;
  };

  const createFlatGridArray = (): unknown[][] => {
    const result = [];
    let trackIndex = 0;
    for (let i = 1; i <= (gridForm.row as unknown as number); i++) {
      for (let j = 1; j <= (gridForm.columns as unknown as number); j++) {
        result.push([i, j, trackIndex++, 'white']);
      }
    }
    return result;
  };

  const handleCreateGrid = () => {
    const result = createFlatGridArray();
    const finalArray = createGridArray(result);
    setGridArray([...finalArray]);
  };

  const handleLeftTopDiagonal = (data: unknown[], index: number): unknown[] => {
    let trackIndex = (data[index] as number[])[2] - gridForm.columns - 1;
    let id = (data[index] as number[])[1];
    while (id > 0 && trackIndex >= 0) {
      id = id - 1;
      if (id !== 0) {
        (data[trackIndex] as unknown[])[3] = 'red';
        trackIndex = trackIndex - gridForm.columns - 1;
      }
    }
    return data;
  };

  const handleLeftBottomDiagonal = (
    data: unknown[],
    index: number
  ): unknown[] => {
    let trackIndex = (data[index] as number[])[2] + gridForm.columns - 1;
    let id = (data[index] as number[])[1];
    while (id > 0 && trackIndex < data.length - 1) {
      id = id - 1;
      if (id !== 0) {
        (data[trackIndex] as unknown[])[3] = 'red';
        trackIndex = trackIndex + gridForm.columns - 1;
      }
    }
    return data;
  };

  const handleRightTopDiagonal = (
    data: unknown[],
    index: number
  ): unknown[] => {
    let trackIndex = (data[index] as number[])[2] - gridForm.columns + 1;
    let id = (data[index] as number[])[1];
    while (id < gridForm.columns && trackIndex > 0) {
      id = id + 1;
      if (id <= gridForm.columns) {
        (data[trackIndex] as unknown[])[3] = 'red';
        trackIndex = trackIndex - gridForm.columns + 1;
      }
    }
    return data;
  };

  const handleRightBottomDiagonal = (
    data: unknown[],
    index: number
  ): unknown[] => {
    let trackIndex = (data[index] as number[])[2] + gridForm.columns + 1;
    let id = (data[index] as number[])[1];
    while (id < gridForm.columns && trackIndex < data.length) {
      id = id + 1;
      if (id <= gridForm.columns) {
        (data[trackIndex] as unknown[])[3] = 'red';
        trackIndex = trackIndex + gridForm.columns + 1;
      }
    }
    return data;
  };

  const handleGridClick = (grid: unknown[]) => {
    const result = createFlatGridArray();
    let modifiedFlatGridArray = handleLeftTopDiagonal(
      result,
      grid[2] as number
    );
    modifiedFlatGridArray = handleRightTopDiagonal(
      [...modifiedFlatGridArray],
      grid[2] as number
    );
    modifiedFlatGridArray = handleRightBottomDiagonal(
      [...modifiedFlatGridArray],
      grid[2] as number
    );
    modifiedFlatGridArray = handleLeftBottomDiagonal(
      [...modifiedFlatGridArray],
      grid[2] as number
    );
    (modifiedFlatGridArray[grid[2] as number] as unknown[])[3] = 'yellow';
    const finalArray = createGridArray(modifiedFlatGridArray as unknown[][]);
    setGridArray([...finalArray]);
  };

  const handleReset = () => {
    setGridArray(createGridArray(createFlatGridArray()));
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form>
          <div className="mb-3">
            <label className="form-label">No.of rows</label>
            <input
              type="number"
              name="row"
              className="form-control"
              value={gridForm.row}
              id="row"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">No.of columns</label>
            <input
              type="number"
              value={gridForm.columns}
              className="form-control"
              name="columns"
              id="columns"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateGrid}
            >
              Create Grid
            </button>
          </div>
        </form>
      </div>
      <div
        style={{
          width: '90%',
          overflow: 'scroll',
          position: 'relative',
          padding: '1rem',
        }}
      >
        <div
          style={{ width: 'fit-content' }}
          className="d-flex flex-column align-items-center"
        >
          <>
            {!!gridArray.length && (
              <div className="position-absolute">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </>
          {gridArray.map((item) => (
            <GridRowContainer
              key={item[2] as unknown as Key}
              gridRow={item}
              onGridClick={handleGridClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// check for more optimization
// check for style improvements
