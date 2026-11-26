<div align="center">
  <a href="https://github.com/bluebill1049/react-flip-numbers" title="React Flip Numbers">
    <img src="logo.svg" alt="React Flip Numbers" width="96" />
  </a>
</div>

<p align="center">Flip your numbers in 3D for React.</p>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/react-flip-numbers.svg?style=for-the-badge)](https://www.npmjs.com/package/react-flip-numbers)
[![npm](https://img.shields.io/npm/dt/react-flip-numbers.svg?style=for-the-badge)](https://www.npmjs.com/package/react-flip-numbers)
[![License](https://img.shields.io/npm/l/react-flip-numbers?style=for-the-badge)](https://github.com/bluebill1049/react-flip-numbers/blob/master/LICENSE)

</div>

<p align="center">
  <a href="#quickstart">Quickstart</a> |
  <a href="#api">API</a> |
  <a href="./example">Example</a>
</p>

<p align="center">
  <img width="600" src="https://raw.githubusercontent.com/bluebill1049/react-flip-numbers/master/react-flip-numbers.gif" alt="react flip numbers demo" />
</p>

### Features

- 3D flip animation for any string of digits, with separators like `:` and `,` left in place
- Sized by a single `fontSize` prop, with an adjustable `gap` between digits
- Written in TypeScript, types included
- Supports React 16.8 through 19

### Install

```sh
npm install react-flip-numbers
```

### Quickstart

```tsx
import FlipNumbers from 'react-flip-numbers';

function Counter() {
  return <FlipNumbers play numbers="12345" fontSize={40} gap={4} color="#fff" background="#333" />;
}
```

### API

| Prop                 | Type                  | Default            | Description                                         |
| :------------------- | :-------------------- | :----------------- | :-------------------------------------------------- |
| `numbers`            | `string`              | required           | The value to display, e.g. `"12:30"`                |
| `fontSize`           | `number`              | required           | Font size in px; sets each digit's size             |
| `color`              | `string`              | required           | Digit color                                         |
| `play`               | `boolean`             | `false`            | Run the flip animation                              |
| `gap`                | `number \| string`    | 10% of `fontSize`  | Space between digits; a number is px, or any CSS length |
| `background`         | `string`              |                    | Digit background color                              |
| `perspective`        | `number`              | `500`              | CSS 3D perspective in px                            |
| `duration`           | `number`              | `0.3`              | Animation duration in seconds                       |
| `delay`              | `number`              | `0`                | Animation delay in seconds                          |
| `animate`            | `boolean`             | `true`             | Set `false` to render plain digits                  |
| `numberStyle`        | `CSSProperties`       |                    | Inline style for each digit                         |
| `nonNumberStyle`     | `CSSProperties`       |                    | Inline style for separators like `:` `,` `.`        |
| `numberClassName`    | `string`              |                    | Class name for each digit                           |
| `nonNumberClassName` | `string`              |                    | Class name for separators                           |
