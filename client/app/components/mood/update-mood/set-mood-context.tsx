import { Box, Flex, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { OptionsType } from "react-select";
import { TagsQuery, useTagsQuery } from "../../../types/graphql";
import { ErrorAlert } from "../../generic/error-alert";
import { Loading } from "../../generic/loading";
import Creatable from "react-select/creatable";
import { customStyles } from "../../generic/styles";
import { TagInput } from "./add-mood-modal";

type Props = {
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  selectedTags: TagInput[];
  setSelectedTags: Dispatch<SetStateAction<TagInput[]>>;
  tags: TagsQuery["tags"];
};

export const SetMoodContext: FunctionComponent<Props> = ({
  note,
  setNote,
  selectedTags,
  setSelectedTags,
  tags,
}) => {
  const handleChange = (values: OptionsType<{ value: string; label: string }>, actionMeta: any) => {
    const mappedValues = values.map(value => ({ name: value.label }));
    setSelectedTags(mappedValues);
  };

  const options = tags.map(tag => ({ value: tag.name, label: tag.name }));
  const initialValues = selectedTags?.map(tag => ({ value: tag.name, label: tag.name }));

  return (
    <>
      <Text mb={10}>You don't need to, but reflecting on your mood never hurts.</Text>
      <Box>
        <Text fontWeight="bold">What where you doing?</Text>
        <Text mb="8px" fontSize="sm">
          You can add anything here. These labels will be saved and you can use as many as you need.
        </Text>
        <Creatable
          styles={customStyles}
          noOptionsMessage={() => "Start typing to create a new label"}
          isMulti
          isSearchable
          options={options}
          placeholder="Select an existing label or create one"
          value={initialValues}
          onChange={handleChange}
        />
      </Box>

      <Box mt={10}>
        <Text fontWeight="bold">Add your thoughts</Text>
        <Text mb="8px" fontSize="sm">
          Self-reflection is the key to awareness. It can lead to growth, positivity and happiness.
        </Text>
        <Textarea value={note} rows={2} onChange={e => setNote(e.target.value)} />
      </Box>
    </>
  );
};
