import { Animate } from 'react-simple-animate';
import React from 'react';

const commonAnimateStyle: React.CSSProperties = {
  position: 'absolute',
  height: '100%',
  transformStyle: 'preserve-3d',
};
const easeType = 'cubic-bezier(0.19, 1, 0.22, 1)';
const revolutionDegrees = 360;
const resetRouteCounter = 1000;
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const rotateDegreePerNumber = 36;

export interface FlipNumberProps {
  position: number;
  length: number;
  fontSize: number;
  color: string;
  background?: string;
  perspective?: number;
  duration?: number;
  activeNumber: number;
  delay?: number;
  play?: boolean;
  numberStyle?: React.CSSProperties;
  className?: string;
}

interface State {
  degree: number;
  rotateCounter: number;
  prevActiveNumber?: number;
}

const calculateDegrees = (rotateCounter: number, activeNumber: number): Partial<State> => {
  const animateDegree = numbers.findIndex((v) => v === activeNumber) * rotateDegreePerNumber;
  const amountDegree = rotateCounter * revolutionDegrees;

  return {
    ...(activeNumber === 0
      ? {
          rotateCounter: rotateCounter > resetRouteCounter ? 0 : rotateCounter + 1,
        }
      : null),
    degree: amountDegree - animateDegree,
  };
};

export default class FlipNumber extends React.PureComponent<FlipNumberProps, State> {
  static getDerivedStateFromProps({ activeNumber }: FlipNumberProps, { rotateCounter, prevActiveNumber }: State) {
    // This runs on every update, so only rotate when the digit actually changes. Otherwise a digit
    // resting on 0 would gain a full revolution each time the parent re-renders.
    if (activeNumber === prevActiveNumber) return null;
    return { ...calculateDegrees(rotateCounter, activeNumber), prevActiveNumber: activeNumber };
  }

  state: State = {
    degree: 0,
    rotateCounter: 0,
  };

  updateNumberTimeout?: ReturnType<typeof setTimeout>;

  componentDidMount() {
    this.updateNumberTimeout = setTimeout(() => this.updateNumber(), 50 * this.props.position);
  }

  componentWillUnmount() {
    clearTimeout(this.updateNumberTimeout);
  }

  updateNumber = () => {
    this.setState(({ rotateCounter }) => calculateDegrees(rotateCounter, this.props.activeNumber) as State);
  };

  render() {
    const {
      activeNumber,
      fontSize,
      color,
      background,
      perspective,
      duration,
      play,
      delay,
      length,
      position,
      numberStyle = {},
      className,
    } = this.props;
    const { degree } = this.state;
    const height = fontSize;
    const viewPortSize: React.CSSProperties = {
      width: '1ch',
      height: `${height}px`,
      fontSize: `${fontSize}px`,
    };
    const translateZ = height * 1.5;

    return (
      <span
        style={{
          ...viewPortSize,
          perspective,
          overflow: 'hidden',
          display: 'inline-block',
          textAlign: 'left',
        }}
        className={className}
        aria-hidden
      >
        <Animate
          play={play}
          start={{
            ...commonAnimateStyle,
          }}
          end={{
            ...commonAnimateStyle,
            transform: `rotateX(${degree}deg)`,
          }}
          {...{ easeType, duration, delay }}
          render={({ style }) => (
            <span style={style}>
              {numbers.map((n, i) => (
                <span
                  style={{
                    ...viewPortSize,
                    lineHeight: `${height}px`,
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    WebkitFontSmoothing: 'antialiased',
                    color,
                    background,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: `rotateX(${rotateDegreePerNumber * i}deg) translateZ(${translateZ}px)`,
                    ...numberStyle,
                  }}
                  key={`${rotateDegreePerNumber * i}`}
                >
                  {n}
                </span>
              ))}
            </span>
          )}
        />

        <span
          style={{
            ...viewPortSize,
            lineHeight: `${height}px`,
            left: `${length - position > 4 ? 0.25 : 0}px`, // hacky fix for weird misalignment in Chrome.
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased',
            color,
            background,
            transform: `rotateX(0deg) translateZ(${translateZ}px)`,
            visibility: 'hidden',
            ...numberStyle,
          }}
        >
          {activeNumber}
        </span>
      </span>
    );
  }
}
