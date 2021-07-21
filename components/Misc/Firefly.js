import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div` 
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: white;
  overflow: hidden;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.8;
`;

const animFireFly = keyframes`
  from { transform: translateY(-2000px) translateX(-1000px);  }
  to { transform: translateY(0px) translateX(0px); }
`;

const random = (x) => Math.floor(Math.random(x) * x);

const multipleBoxShadow = (length) => {
    const biggestScreenSize = 2560;
    let value = `${random(biggestScreenSize)}px ${random(biggestScreenSize)}px #FFF`;
    for (let i = 0; i < length; i += 1) {
        value += `, ${random(biggestScreenSize)}px ${random(biggestScreenSize)}px #FFF`;
    }
    return value;
};

const fireFlies = (h, w, animationTime, shadow) => styled.div`
  width: ${w}px;
  height: ${h}px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(shadow)};
  animation: ${animFireFly} ${animationTime}s linear infinite;
  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: ${w}px;
    height: ${h}px;
    box-shadow: ${multipleBoxShadow(shadow)};
  }
`;
const SmallFireFly = fireFlies(1, 1, 50, 100);
const MediumFireFly = fireFlies(2, 2, 100, 50);
const BigFireFly = fireFlies(3, 3, 150, 20);

const OppBigFireFly = fireFlies(3, 3, 150, 20);

const FireFly = ({ children, ...props }) => (
    <Container {...props}>
        {children}
        <SmallFireFly />
        <MediumFireFly />
        <BigFireFly />
    </Container>
);

export default FireFly;