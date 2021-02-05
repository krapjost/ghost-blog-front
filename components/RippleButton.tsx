import { useColorModeValue, Box } from '@chakra-ui/react';
import React from 'react';

const RippleButton = ({ children }): JSX.Element => {
  const color = useColorModeValue('black', 'white');
  const bg = useColorModeValue('brown.100', 'brown.800');

  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;

    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  return (
    <Box
      className="rippleButton"
      pt="5"
      pb="5"
      position="relative"
      overflow="hidden"
      transition="all 200ms"
      width="100%"
      _hover={{
        boxShadow: `0 0 0 2px ${color} inset`,
        color: color,
        textDecoration: 'none',
      }}
      //   style={{
      //     // background: 'red',
      //     '&:hover': {
      //       background: 'black',
      //     },
      //   }}
      onClick={createRipple}
    >
      {children}
    </Box>
  );
};

export default RippleButton;
