import React from 'react';
import FlipNumber from './flipNumber';

export interface FlipNumbersProps {
  numbers: string;
  fontSize: number;
  /** Space between digits: a number in px or any CSS length. Defaults to 10% of `fontSize`. */
  gap?: number | string;
  color: string;
  background?: string;
  perspective?: number;
  duration?: number;
  delay?: number;
  animate?: boolean;
  play?: boolean;
  numberStyle?: React.CSSProperties;
  nonNumberStyle?: React.CSSProperties;
  numberClassName?: string;
  nonNumberClassName?: string;
}

export default class FlipNumbers extends React.PureComponent<FlipNumbersProps> {
  static defaultProps = {
    perspective: 500,
    duration: 0.3,
    animate: true,
    play: false,
    delay: 0,
    nonNumberStyle: {},
    numberStyle: {},
  };

  render() {
    const {
      numbers,
      nonNumberStyle,
      numberStyle,
      numberClassName,
      nonNumberClassName,
      fontSize,
      gap = fontSize * 0.1,
      color,
      background,
      perspective,
      duration,
      animate,
      play,
      delay,
    } = this.props;
    let numberCounter = 0;

    return (
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap,
        }}
        aria-label={numbers}
      >
        {Array.from(numbers).map((n, key) => {
          const nonNumber = (
            <span aria-hidden style={nonNumberStyle} className={nonNumberClassName} key={numberCounter}>
              {n}
            </span>
          );

          if (animate) {
            numberCounter += 1;
            return !Number.isNaN(parseInt(n, 10)) ? (
              <FlipNumber
                key={key}
                {...{
                  fontSize,
                  color,
                  background,
                  perspective,
                  duration,
                  play,
                  delay,
                  numberStyle,
                }}
                position={numberCounter}
                length={numbers.length}
                activeNumber={parseInt(n, 10)}
                className={numberClassName}
              />
            ) : (
              nonNumber
            );
          }

          return !Number.isNaN(parseInt(n, 10)) ? (
            <span
              aria-hidden
              style={
                nonNumberStyle || {
                  padding: 0,
                }
              }
              key={numberCounter}
            >
              {n}
            </span>
          ) : (
            nonNumber
          );
        })}
      </section>
    );
  }
}
