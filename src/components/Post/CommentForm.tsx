import React from "react";
import Form from "../Form";
import styled from "styled-components";
import { CommentType } from "../../context/Posts";
import { Paragraph } from "../Text";
import { Colors, Gutters } from "../../styles";

type Props = {
  onSubmit: (event: React.FormEvent<Element>) => void;
  comment: CommentType;
  onType: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  children: React.ReactNode;
};

const CommentForm = (props: Props): JSX.Element => {
  return (
    <Container>
      <Form
        width="auto"
        marginTop={Gutters.X_LARGE}
        isDisabled={!props.comment || !props.comment.message}
        submitText="Submit"
        onSubmit={props.onSubmit}
      >
        <Paragraph>Comment:</Paragraph>
        <StyledTextArea
          value={props.comment ? props.comment.message : ""}
          onChange={props.onType}
        />
      </Form>
    </Container>
  );
};

export default CommentForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledTextArea = styled.textarea`
  flex: 1;
  background-color: ${Colors.WHITE};
  font-size: 16px;
  border: none;
  border-radius: 0;
  outline: 0;
  resize: none;
  padding: ${Gutters.MEDIUM};
  height: 100px;
`;
