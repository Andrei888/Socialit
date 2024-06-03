import React, { FC, ChangeEvent } from "react";
import { Row, Col, Input, Button } from "antd";

// models
import { Message } from "@models/messages";

// components
import Spacer from "@app/components/common/elements/Spacer";
import { Styled } from "./MessagesBlock.styled";

interface MessagesBlockProps {
  userId: string;
  friendName?: string;
  isDisabled?: boolean;
  messages: Message[] | null;
  newMessage: string | undefined;
  handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent) => void;
  handleSendText: () => void;
  newFile?: File | null;
  handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const MessagesBlock: FC<MessagesBlockProps> = ({
  userId,
  friendName,
  isDisabled = false,
  messages,
  newMessage,
  handleChangeText,
  handleKeyUp,
  handleSendText,
  newFile,
  handleFileChange,
  handleFileUpload,
}) => {
  return (
    <Styled.ChatBlock
      className={isDisabled ? "chat-block chat-block-disabled" : "chat-block"}
    >
      {messages &&
        messages.length &&
        messages.map((message, index) => {
          return (
            <Styled.MsgBlock
              className={
                message.userId === userId
                  ? "message-block message-block-user"
                  : "message-block"
              }
              key={index}
            >
              <Styled.User>{message.userName}</Styled.User>
              {message.text && (
                <Styled.Message className="message">
                  {message.text}
                </Styled.Message>
              )}
              {message.file && (
                <Styled.Message className="message">
                  {message.fileType?.includes("image") ? (
                    <a href={message.file} target="_blank">
                      <img src={message.file} />
                    </a>
                  ) : (
                    <a href={message.file} target="_blank">
                      See {message.fileType?.split("/")[1]} file
                    </a>
                  )}
                </Styled.Message>
              )}
            </Styled.MsgBlock>
          );
        })}
      {!messages && <Row>No disscusion started!</Row>}
      {!isDisabled && (
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
      )}

      {handleFileUpload && (
        <Row justify="space-between" align="top">
          <Col>
            <Spacer>
              <label htmlFor="file" className="action-btn">
                {newFile
                  ? `Change file`
                  : friendName
                  ? `Share file with - ${friendName}`
                  : "Share file"}
              </label>
            </Spacer>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="sr-only"
            />
            {newFile && <Spacer>{newFile.name}</Spacer>}
          </Col>
          <Col>
            {newFile && (
              <>
                <button onClick={handleFileUpload} className="action-btn">
                  Send file
                </button>
              </>
            )}
          </Col>
        </Row>
      )}
    </Styled.ChatBlock>
  );
};

export default MessagesBlock;
