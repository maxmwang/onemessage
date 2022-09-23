import React, { useState } from 'react';
import {
  Input,
  IconButton,
  HStack,
  useToast,
  Text,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { useAppDispatch } from '../app/hooks';
import { headlineUpdate } from '../constants/actionCreators';

const HEADLINE_LENGTH_LIMIT = 64;

function HeadlineInput() {
  const dispatch = useAppDispatch();

  const [inputHeadline, setInputHeadline] = useState('');

  const toast = useToast();

  const inputTooLong = () => inputHeadline.length > HEADLINE_LENGTH_LIMIT;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputTooLong() && !toast.isActive('headline-length-limit')) {
      // input headline is too long
      toast({
        id: 'headline-length-limit',
        title: `Headline must be ${HEADLINE_LENGTH_LIMIT} characters or less.`,
        status: 'error',
        duration: 3000,
      });
    } else if (inputHeadline.trim()) {
      // input headline is valid
      dispatch(headlineUpdate(inputHeadline));
      setInputHeadline('');
      toast.closeAll();
    } else if (!toast.isActive('headline-doens\'t-exist')) {
      // input headline doesn't exist
      toast({
        id: 'headline-doens\'t-exist',
        title: 'Headlines can\'t be empty!',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <HStack className="input">
        <Input
          placeholder="Tap a headline."
          variant="flushed"
          colorScheme="blue"
          width="lg"
          size="sm"
          value={inputHeadline}
          onChange={(e) => setInputHeadline(e.target.value)}
        />
        <Text
          className={`input-length-indicator ${inputTooLong() ? 'error' : ''}`}
        >
          {`${inputHeadline.length} / ${HEADLINE_LENGTH_LIMIT}`}
        </Text>
        <IconButton
          aria-label="Submit"
          variant="ghost"
          colorScheme="blue"
          onClick={handleSubmit}
          icon={<ArrowForwardIcon />}
        />
      </HStack>
    </form>
  );
}

export default HeadlineInput;
