import React, { FC, ChangeEvent } from "react";
import { Row, Col, Input, Button } from "antd";

// models
import { Message } from "@models/messages";

// components
import { Styled } from "./MessagesBlock.styled";

interface MessagesBlockProps {
  userId: string;
  messages: Message[] | null;
  newMessage: string | undefined;
  handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent) => void;
  handleSendText: () => void;
  newFile: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const MessagesBlock: FC<MessagesBlockProps> = ({
  userId,
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
    <Styled.ChatBlock>
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
      <Row>
        <Col>
          <div>
            <label htmlFor="file">or share a file</label>
          </div>
          <input id="file" type="file" onChange={handleFileChange} />
        </Col>
        <Col>
          {newFile && (
            <section>
              <ul>
                <li>Name: {newFile.name}</li>
                <li>Type: {newFile.type}</li>
                <li>Size: {newFile.size} bytes</li>
              </ul>
            </section>
          )}
          {newFile && <button onClick={handleFileUpload}>Send file</button>}
        </Col>
      </Row>
    </Styled.ChatBlock>
  );
};

export default MessagesBlock;
