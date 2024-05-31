import React, { FC, ChangeEvent } from "react";
import { Row, Col, Input, Button } from "antd";

// models
import { Message } from "@models/messages";

// components
import { Styled } from "./MessagesBlock.styled";

interface MessagesBlockProps {
  messages: Message[] | null;
  newMessage: string | undefined;
  handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent) => void;
  handleSendText: () => void;
}
const MessagesBlock: FC<MessagesBlockProps> = ({
  messages,
  newMessage,
  handleChangeText,
  handleKeyUp,
  handleSendText,
}) => {
  return (
    <Styled.ChatBlock>
      {messages &&
        messages.length &&
        messages.map((message) => {
          return (
            <Styled.MsgBlock>
              <Styled.User>{message.userName}</Styled.User>
              <Styled.Message>{message.text}</Styled.Message>
            </Styled.MsgBlock>
          );
        })}
      {!messages && <Row>No disscusion started!</Row>}
      <Row>
        <Col span={20}>
          <Input
            value={newMessage}
            onChange={(e) => handleChangeText(e)}
            onKeyUp={(e) => handleKeyUp(e)}
          />
        </Col>
        <Col span={4}>
          <Button className="submit-btn" onClick={handleSendText}>
            Send
          </Button>
        </Col>
      </Row>
    </Styled.ChatBlock>
  );
};

export default MessagesBlock;
