import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useCallback, useMemo, useState } from 'react';
import { COLOR_MAP } from './square';
import GridCell from './grid-cell';

const GRID_SIZE = 14 as const;
const GRID_GAP = 3 as const;
const PADDING_LEFT = 20 as const;

type ColorBoundaryMap = Record<number, [number, number]>;

const getLinePath = (
  start: { row: number; col: number },
  end: { row: number; col: number },
): Set<string> => {
  const path: { row: number; col: number }[] = [];
  const dx = end.col - start.col;
  const dy = end.row - start.row;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  const isHorizontal = Math.abs(dx) > Math.abs(dy);

  const isWithinBounds = (row: number, col: number): boolean => {
    return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
  };

  const canAddAdjacentSquare = (
    currentCoord: number,
    startCoord: number,
    endCoord: number,
  ): boolean => {
    if (startCoord === endCoord) {
      return true;
    }

    if (endCoord > startCoord) {
      return currentCoord <= endCoord;
    }

    return currentCoord >= endCoord;
  };

  for (let i = 0; i <= steps; i++) {
    const col = start.col + (dx * i) / steps;
    const row = start.row + (dy * i) / steps;
    const roundedCol = Math.round(col);
    const roundedRow = Math.round(row);

    if (isWithinBounds(roundedRow, roundedCol)) {
      path.push({ row: roundedRow, col: roundedCol });

      if (isHorizontal) {
        if (
          isWithinBounds(roundedRow - 1, roundedCol) &&
          canAddAdjacentSquare(roundedRow - 1, start.row, end.row)
        ) {
          path.push({ row: roundedRow - 1, col: roundedCol });
        }
        if (
          isWithinBounds(roundedRow + 1, roundedCol) &&
          canAddAdjacentSquare(roundedRow + 1, start.row, end.row)
        ) {
          path.push({ row: roundedRow + 1, col: roundedCol });
        }
      } else {
        if (
          isWithinBounds(roundedRow, roundedCol - 1) &&
          canAddAdjacentSquare(roundedCol - 1, start.col, end.col)
        ) {
          path.push({ row: roundedRow, col: roundedCol - 1 });
        }
        if (
          isWithinBounds(roundedRow, roundedCol + 1) &&
          canAddAdjacentSquare(roundedCol + 1, start.col, end.col)
        ) {
          path.push({ row: roundedRow, col: roundedCol + 1 });
        }
      }
    }
  }

  return new Set(path.map((square) => `${square.row}.${square.col}`));
};

const Grid = () => {
  const [ballSquare, setBallSquare] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [path, setPath] = useState<Set<string>>(new Set());

  const { width: deviceWidth } = Dimensions.get('window');

  const totalGapSpace = (GRID_SIZE - 1) * GRID_GAP;
  const availableSpaceForSquares = deviceWidth - (totalGapSpace + PADDING_LEFT);

  const squareSize = Math.floor(availableSpaceForSquares / GRID_SIZE);

  const rows = Array.from({ length: GRID_SIZE }, (_, rowIdx) => rowIdx);
  const cols = Array.from({ length: GRID_SIZE }, (_, colIdx) => colIdx);

  const handleBallSquareTap = useCallback((row: number, col: number): void => {
    const throwerSquare = { row: GRID_SIZE - 1, col: 0 };
    if (row === throwerSquare.row && col === throwerSquare.col) return;

    const newBallSquare = { row, col };

    const newPath = getLinePath(throwerSquare, newBallSquare);

    setBallSquare({ row, col });
    setPath(newPath);
  }, []);

  const gridContent = useMemo(() => {
    const AREA_BOUNDARIES: Record<
      keyof typeof COLOR_MAP | 'black',
      ColorBoundaryMap
    > = {
      black: {},
      green: {
        // rowIdx: [minColIdx, maxColIdx]
        0: [0, 3],
        1: [0, 3],
        2: [0, 2],
        3: [0, 1],
      },
      yellow: {
        0: [4, 6],
        1: [4, 6],
        2: [3, 6],
        3: [2, 6],
        4: [0, 5],
        5: [0, 4],
        6: [0, 3],
      },
      orange: {
        0: [7, 10],
        1: [7, 10],
        2: [7, 10],
        3: [7, 9],
        4: [6, 9],
        5: [5, 8],
        6: [4, 8],
        7: [0, 7],
        8: [0, 6],
        9: [0, 4],
        10: [0, 2],
      },
      red: {
        0: [0, 13],
        1: [0, 13],
        2: [0, 13],
        3: [10, 12],
        4: [10, 12],
        5: [9, 11],
        6: [9, 11],
        7: [8, 10],
        8: [7, 10],
        9: [5, 9],
        10: [3, 8],
        11: [0, 6],
        12: [0, 4],
        13: [0, 2],
      },
    };

    const COLOR_PRIORITY: (keyof typeof AREA_BOUNDARIES | 'black')[] = [
      'black',
      'green',
      'yellow',
      'orange',
      'red',
    ];

    return rows.map((rowIdx) => {
      const rowBottomToTopIdx = GRID_SIZE - 1 - rowIdx;

      return (
        <View
          key={`row-${rowIdx}`}
          style={{ flexDirection: 'row', gap: GRID_GAP }}
        >
          {cols.map((colIdx) => {
            let squareColor: keyof typeof COLOR_MAP | undefined = undefined;
            const isThrowerSquare = rowBottomToTopIdx === 0 && colIdx === 0;

            for (const colorName of COLOR_PRIORITY) {
              if (colorName === 'black') {
                if (isThrowerSquare) {
                  squareColor = 'black';
                  break;
                }
              } else {
                const boundsForColor = AREA_BOUNDARIES[colorName];
                const bounds = boundsForColor[rowBottomToTopIdx];
                if (bounds) {
                  const [minCol, maxCol] = boundsForColor[rowBottomToTopIdx];
                  if (colIdx >= minCol && colIdx <= maxCol) {
                    squareColor = colorName;
                    break;
                  }
                }
              }
            }

            const isTapped =
              ballSquare?.row === rowIdx && ballSquare.col === colIdx;

            const isOnPath = path.has(`${rowIdx}.${colIdx}`);

            return (
              <View key={`col-${colIdx}`}>
                <GridCell
                  rowIdx={rowIdx}
                  colIdx={colIdx}
                  squareSize={squareSize}
                  squareColor={squareColor}
                  onPress={handleBallSquareTap}
                  isTapped={isTapped}
                  isOnPath={isOnPath}
                />
              </View>
            );
          })}
        </View>
      );
    });
  }, [
    ballSquare?.col,
    ballSquare?.row,
    cols,
    handleBallSquareTap,
    path,
    rows,
    squareSize,
  ]);

  return (
    <View style={styles.container}>
      <View>
        {rows.map((rowIdx) => {
          const rowBottomToTopIdx = GRID_SIZE - 1 - rowIdx;
          return (
            <View
              key={`row-label-${rowBottomToTopIdx}`}
              style={[
                styles.label,
                {
                  height: squareSize,
                  marginBottom: GRID_GAP,
                  marginHorizontal: 3,
                },
              ]}
            >
              <Text style={styles.labelText}>{rowBottomToTopIdx}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: GRID_GAP,
            padding: 0,
          }}
        >
          {gridContent}
        </View>
        <View style={styles.colLabelContainer}>
          {cols.map((colIdx) => (
            <View
              key={`col-label-${colIdx}`}
              style={[
                styles.label,
                { width: squareSize, marginRight: GRID_GAP },
              ]}
            >
              <Text style={styles.labelText}>{colIdx}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    marginTop: 20,
  },
  colLabelContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Grid;
