import { TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { memo } from 'react';
import { Entypo } from '@expo/vector-icons';

type Color = 'green' | 'yellow' | 'orange' | 'red' | 'black';

const LIGHT_GREY = '#b4b4b4ff' as const;

export const COLOR_MAP: Record<Color, string> = {
  green: '#036900',
  yellow: '#bdce00ff',
  orange: '#c78500ff',
  red: '#c50000ff',
  black: '#000000',
};

interface SquareProps {
  color?: keyof typeof COLOR_MAP;
  size: number;
  onPress: () => void;
  isTapped: boolean;
  isOnPath: boolean;
}

const Square = ({ color, size, onPress, isTapped, isOnPath }: SquareProps) => {
  const backgroundColor = color ? COLOR_MAP[color] : LIGHT_GREY;

  return (
    <TouchableOpacity
      style={{
        width: size,
        height: size,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      {isTapped && <FontAwesome5 name="football-ball" size={16} color="#000" />}

      {!isTapped && isOnPath && <Entypo name="cross" size={16} color="#000" />}
    </TouchableOpacity>
  );
};

export default memo(Square);
