import React from 'react';
import {
  Box,
} from '@chakra-ui/react';

interface HeadlineDisplayProps {
  headline: string;
}

function HeadlineDisplay({ headline }: HeadlineDisplayProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      className="display"
    >
      {headline}
    </Box>
  );
}

export default HeadlineDisplay;
