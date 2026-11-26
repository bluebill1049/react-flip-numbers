import renderer from 'react-test-renderer';
import React from 'react';
import FlipNumbers from '../src/flipNumbers';

jest.mock('../src/flipNumber', () => 'FlipNumber');

describe('FlipNumbers', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <FlipNumbers
        numbers="00:00"
        fontSize={20}
        color="black"
        background="white"
        perspective={1000}
        duration={0.3}
        delay={0.3}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
