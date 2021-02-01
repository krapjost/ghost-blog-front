import {
  Icon,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useCycle, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiHome, FiMoon, FiSun } from 'react-icons/fi';
import React from 'react';

const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={props.color}
    strokeLinecap="round"
    {...props}
  />
);

const navItem = {
  open: {
    scale: 1,
    y: 0,
    transition: {
      delay: 0,
      type: 'spring',
      stiffness: 700,
      damping: 20,
    },
  },
  closed: {
    scale: 0,
    y: 70,
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 600,
      damping: 40,
    },
  },
};

function Navigation() {
  const controllerY = useMotionValue(0);
  const inputY = [-30, 0];
  const outputY = [-80, 0];
  const menuY = useTransform(controllerY, inputY, outputY);
  const { colorMode, toggleColorMode } = useColorMode();
  // const color = useColorModeValue('#f9f4e7', '#151500');
  const color = useColorModeValue('#151500', '#f9f4e7');
  const bg = useColorModeValue('green.400', 'green.700');
  const bgFocus = useColorModeValue('green.600', 'green.500');
  const [rectY, setRectY] = useState(0);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      {/* NAVIGATION_CONTAINER */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        style={{
          position: 'fixed',
          top: '85vh',
          right: '5vw',
        }}
      >
        {/* NAVIGATION_ */}
        <Button
          outline="none"
          borderRadius="0"
          _active={{ boxShadow: 'none', backgroundColor: 'blue.500' }}
          _focus={{
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: bgFocus,
          }}
          _hover={{ backgroundColor: bg }}
          cursor="pointer"
          padding="2"
          w="50px"
          h="50px"
          // bg={bg}
          bg="none"
          onClick={() => toggleOpen()}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <Path
              color={color}
              variants={{
                closed: { d: 'M 38 2 L 38 38' },
                open: { d: 'M 30 10 L 10 30' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 2 2 L 2 38' },
                open: { d: 'M 20 20 L 20 20' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 2 38 L 38 38' },
                open: { d: 'M 20 20 L 20 20' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 2 2 L 38 2' },
                open: { d: 'M 10 10 L 30 30' },
              }}
            />
          </svg>

          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-15em',
            }}
          >
            <Icon
              color={color}
              // bg={bg}
              _hover={{ backgroundColor: bg }}
              w="5em"
              h="5em"
              padding="1em"
              as={FiSearch}
            />
          </motion.div>
          <motion.div
            variants={navItem}
            style={{
              // y: menuY,
              position: 'absolute',
              top: '-10em',
            }}
          >
            <Icon
              color={color}
              // bg={bg}
              _hover={{ backgroundColor: bg }}
              w="5em"
              h="5em"
              padding="1em"
              onClick={() => toggleColorMode()}
              as={colorMode === 'light' ? FiMoon : FiSun}
            />
          </motion.div>
          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-5em',
            }}
          >
            <Link href="/">
              <a>
                <Icon
                  color={color}
                  // bg={bg}
                  _hover={{ backgroundColor: bg }}
                  w="5em"
                  h="5em"
                  padding="1em"
                  as={FiHome}
                />
              </a>
            </Link>
          </motion.div>
        </Button>
      </motion.div>
    </>
  );
}

export default Navigation;
