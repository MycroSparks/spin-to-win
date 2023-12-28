import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fillerSymbolAmount,
  slotMachineRows,
} from "../../core/game/game.const";
import { symbolImages } from "../../core/game/game.const";
import { Container, Sprite, usePixiTicker } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

interface Props {
  matrix: string[][];
  containerSize: { width: number; height: number };
  spinning: boolean;
  onSpinningStop: () => void;
}

export const SlotMachine: React.FC<Props> = ({
  matrix,
  containerSize,
  spinning,
  onSpinningStop,
}) => {
  const [positionY, setPositionY] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);

  useEffect(() => {
    if (spinning) {
      setAnimationRunning(true);
      setPositionY(0);
    } else {
      setAnimationRunning(false);
    }
  }, [spinning]);

  const squareSize = useMemo(() => {
    return {
      width: containerSize.width / 5,
      height: containerSize.height / slotMachineRows,
    };
  }, [containerSize.height, containerSize.width]);

  const animate = useCallback(
    (delta: number) => {
      if (animationRunning) {
        // Filler symbols + 3x rows of proper non filler matrix at the end so end = filler + 3
        const endElement = fillerSymbolAmount + 3;
        const spinningSpeed = 80;
        const newPositionY = positionY - spinningSpeed * delta;
        if (newPositionY <= -squareSize.height * endElement) {
          setPositionY(-squareSize.height * endElement);
          setAnimationRunning(false);
          onSpinningStop();
          return;
        }
        setPositionY(newPositionY);
      }
    },
    [animationRunning, onSpinningStop, positionY, squareSize.height]
  );
  usePixiTicker(animate);

  const transposed = useMemo(
    () => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex])),
    [matrix]
  );

  return (
    <Container y={positionY}>
      {transposed.map((row, i) => {
        return (
          <Container key={i}>
            {row.map((value, j) => {
              return (
                <Sprite
                  key={j}
                  scale={0.2}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={i * squareSize.width + squareSize.width / 2}
                  y={j * squareSize.height + squareSize.height / 2}
                  texture={PIXI.Texture.from(symbolImages[value])}
                />
              );
            })}
          </Container>
        );
      })}
    </Container>
  );
};
