import { useCallback } from 'react';
import Square, { COLOR_MAP } from './square';

interface GridCellProps {
  rowIdx: number;
  colIdx: number;
  squareSize: number;
  squareColor?: keyof typeof COLOR_MAP;
  isTapped: boolean;
  isOnPath: boolean;
  onPress: (row: number, col: number) => void;
}

const GridCell = ({
  colIdx,
  isTapped,
  isOnPath,
  onPress,
  rowIdx,
  squareSize,
  squareColor,
}: GridCellProps) => {
  const handlePress = useCallback(() => {
    onPress(rowIdx, colIdx);
  }, [onPress, rowIdx, colIdx]);

  return (
    <Square
      size={squareSize}
      color={squareColor}
      onPress={handlePress}
      isTapped={isTapped}
      isOnPath={isOnPath}
    />
  );
};

export default GridCell;
