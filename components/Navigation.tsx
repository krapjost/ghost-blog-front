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
import SearchModalComponent from './SearchModal';

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
    strokeWidth="4"
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
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('#151500', '#f9f4e7');
  const colorHover = useColorModeValue('#151500', '#f9f4e7');
  const bg = useColorModeValue('brown.50', 'brown.800');
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
          bottom: '1em',
          right: '1em',
        }}
      >
        {/* NAVIGATION_ */}
        <Button
          outline="none"
          borderRadius="none"
          _active={{
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
            boxShadow: 'none',
            background: 'none',
          }}
          _hover={{ backgroundColor: 'none' }}
          cursor="pointer"
          padding="2"
          w="4em"
          h="4em"
          bg="none"
          onClick={() => toggleOpen()}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <Path
              color={color}
              variants={{
                closed: { d: 'M 10 15 L 50 15' },
                open: { d: 'M 15 15 L 45 45' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 5 30 L 55 30' },
                open: { d: 'M 30 30 L 30 30' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 10 45 L 50 45' },
                open: { d: 'M 15 45 L 45 15' },
              }}
            />
          </svg>

          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-12em',
            }}
          >
            <SearchModalComponent>
              <Icon
                color={color}
                bg={bg}
                _hover={{ backgroundColor: 'green.400' }}
                _active={{ backgroundColor: 'blue.500' }}
                w="4em"
                h="4em"
                padding="1em"
                as={FiSearch}
              />
            </SearchModalComponent>
          </motion.div>

          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-8em',
            }}
          >
            <Icon
              color={color}
              bg={bg}
              _hover={{ backgroundColor: 'green.400' }}
              _active={{ backgroundColor: 'blue.500' }}
              w="4em"
              h="4em"
              padding="1em"
              onClick={() => toggleColorMode()}
              as={colorMode === 'light' ? FiMoon : FiSun}
            />
          </motion.div>
          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-4em',
            }}
          >
            <Link href="/">
              <a
                style={{
                  boxShadow: 'none',
                }}
              >
                <Icon
                  color={color}
                  bg={bg}
                  _hover={{ backgroundColor: 'green.400' }}
                  _active={{ backgroundColor: 'blue.500' }}
                  w="4em"
                  h="4em"
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
