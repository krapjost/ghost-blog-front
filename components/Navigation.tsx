import {
  Icon,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useCycle } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch, FiHome } from 'react-icons/fi';
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
    x: -65,
    transition: {
      delay: 0,
      type: 'spring',
      stiffness: 700,
      damping: 20,
    },
  },
  closed: {
    scale: 0,
    x: 0,
    transition: {
      delay: 0,
      type: 'spring',
      stiffness: 600,
      damping: 40,
    },
  },
};

function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('#151500', '#f9f4e7');
  const bg = useColorModeValue('white', 'black');
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
          borderRadius="0"
          _active={{
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: 'blue.500',
          }}
          _focus={{
            outline: 'none',
          }}
          _hover={{ backgroundColor: 'none' }}
          backgroundColor={bg}
          boxShadow={`0 0 0 1px ${color}`}
          cursor="pointer"
          w="4em"
          h="3em"
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
              top: '0',
              left: '-4em',
            }}
          >
            <SearchModalComponent>
              <Icon
                color={color}
                bg="none"
                _hover={{
                  border: `2px solid ${color}`,
                }}
                _active={{ backgroundColor: 'blue.500' }}
                w="4em"
                h="3em"
                pt="0.5em"
                pb="0.5em"
                backgroundColor={bg}
                boxShadow={`0 0 0 1px ${color}`}
                transition="all 200ms"
                // borderRadius="full"
                as={FiSearch}
              />
            </SearchModalComponent>
          </motion.div>

          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
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
                  bg="none"
                  _hover={{
                    border: `2px solid ${color}`,
                  }}
                  _active={{ backgroundColor: 'blue.500' }}
                  w="4em"
                  h="3em"
                  pt="0.5em"
                  pb="0.5em"
                  backgroundColor={bg}
                  boxShadow={`0 0 0 1px ${color}`}
                  transition="all 200ms"
                  // borderRadius="full"
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
