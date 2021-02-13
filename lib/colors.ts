import { useColorModeValue } from '@chakra-ui/react';

export const getColor = () => {
    const color = useColorModeValue('black', 'white');
    return color
};
