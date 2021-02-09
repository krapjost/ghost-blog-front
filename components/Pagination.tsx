import React from 'react';
import { List, ListItem } from '@chakra-ui/react';

function Pagination({ color, currentPage, pageNumber, setCurrentPage }) {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <List>
      {pageNumber.map((pageNum) => (
        <ListItem
          _hover={{
            cursor: currentPage === pageNum ? 'initial' : 'pointer',
            border: `1px solid ${color}`,
            fontWeight: 'bold',
          }}
          display="inline-block"
          w="50px"
          h="50px"
          border={
            currentPage === pageNum
              ? `1px solid ${color}`
              : '1px solid #00000000'
          }
          textAlign="center"
          lineHeight="3em"
          // background="blue.500"
          padding="0"
          mt="4"
          key={pageNum}
          onClick={currentPage === pageNum ? null : () => paginate(pageNum)}
        >
          {currentPage === pageNum ? <strong>{pageNum}</strong> : pageNum}
        </ListItem>
      ))}
    </List>
  );
}

export default Pagination;
