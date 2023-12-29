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
        const spinningSpeed = 50;
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

  {
    /*
    Optional blur filter, I don't like how it looks but maybe
  const blurFilter = new PIXI.filters.BlurFilter();
  blurFilter.blur = animationRunning ? 1 : 0;
  */
  }

  return (
    <Container y={positionY}>
      {transposed.map((row, i) => {
        return (
          <Container key={i}>
            {row.map((value, j) => {
              return (
                <Sprite
                  //optional filter
                  //filters={[blurFilter]}
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
