import renderer, { act } from 'react-test-renderer';
import React from 'react';
import FlipNumber, { FlipNumberProps } from '../src/flipNumber';

jest.mock('react-simple-animate', () => ({ Animate: 'Animate' }));

describe('FlipNumber', () => {
  const props: FlipNumberProps = {
    fontSize: 20,
    color: 'white',
    background: 'black',
    perspective: 1000,
    duration: 0.3,
    activeNumber: 0,
    delay: 0,
    play: true,
    position: 1,
    length: 1,
  };

  it('should render correctly', () => {
    const tree = renderer.create(<FlipNumber {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should not add rotations when re-rendered with the same digit', () => {
    jest.useFakeTimers();
    const tree = renderer.create(<FlipNumber {...props} />);
    act(() => {
      jest.runAllTimers();
    });
    const instance = tree.getInstance() as unknown as FlipNumber;
    const { degree } = instance.state;

    act(() => tree.update(<FlipNumber {...props} color="red" />));
    act(() => tree.update(<FlipNumber {...props} color="blue" />));
    expect(instance.state.degree).toBe(degree);

    act(() => tree.update(<FlipNumber {...props} activeNumber={9} />));
    expect(instance.state.degree).toBe(degree + 36); // one step, not extra revolutions
    jest.useRealTimers();
  });

  it('should re-render when a style prop changes', () => {
    const tree = renderer.create(<FlipNumber {...props} />);
    act(() => tree.update(<FlipNumber {...props} color="red" />));
    expect(JSON.stringify(tree.toJSON())).toContain('"color":"red"');
  });

  it('should return the correct position for matching number', () => {
    const tree = renderer.create(<FlipNumber {...props} activeNumber={2} />);
    expect(tree).toMatchSnapshot();
  });
});
