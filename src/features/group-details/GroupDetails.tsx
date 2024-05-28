import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography, Input } from "antd";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
// models
import { Group } from "./redux/interfaces";
//utils
import {
  fetchGroupDetails,
  updateChatInGroupFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/group-details/redux";
import { getUserDetails } from "@features/login/redux/selectors";

// components
import { Styled } from "./GroupDetails.styled";

const { Title, Text } = Typography;

const GroupDetails: FC = () => {
  const groupNotLoaded = useSelector(groupSelector.requestGroupInfo);
  const group = useSelector(groupSelector.getGroup);
  const user = useSelector(getUserDetails);

  const [groupId, setGroupId] = useState<string>();
  const [newMessage, setNewMessage] = useState<string>();

  const location = useLocation();
  console.log(location);
  const [groupInfo, setGroupInfo] = useState<Group | null>(group);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getGroupDetails(groupId: string) {
      try {
        const group = await fetchGroupDetails(groupId);
        console.log(group);
        if (group) {
          dispatch(groupAction.getGroupInfoSuccess(group as Group));
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(group);
    console.log(groupNotLoaded);
    if (groupNotLoaded && groupId) {
      getGroupDetails(groupId);
    }
  }, [groupNotLoaded, groupId]);

  useEffect(() => {
    setGroupInfo(group);
  }, [group]);

  useEffect(() => {
    const id = location.pathname.split("/").splice(-1)[0];
    setGroupId(id);
  }, [location.pathname]);

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendText = () => {
    async function updateTextMsg(groupId: string) {
      try {
        const response = await updateChatInGroupFirestore(
          user,
          groupId,
          newMessage
        );
        if (response) {
          dispatch(groupAction.updateGroupInfo());
          setNewMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (user && groupId && newMessage) {
      updateTextMsg(groupId);
    }
  };
  console.log(group);

  return (
    <div>
      <Styled.Row>
        <Col>
          <Link to={`/groups`}>Back to my groups</Link>
        </Col>
      </Styled.Row>
      <Styled.Row>
        <Styled.Col span={18}>
          <Title className="group-name">{group.name}</Title>
          <Text className="group-name">{group.description}</Text>
          <Styled.ChatBlock>
            {group?.chat &&
              group?.chat.length &&
              group.chat.map((message) => {
                return (
                  <Styled.MsgBlock>
                    <Styled.User>{message.userName}</Styled.User>
                    <Styled.Message>{message.text}</Styled.Message>
                  </Styled.MsgBlock>
                );
              })}
            {!group?.chat && <Row>No disscusion started!</Row>}
            <Row>
              <Col span={20}>
                <Input
                  value={newMessage}
                  onChange={(e) => handleChangeText(e)}
                />
              </Col>
              <Col>
                <Button onClick={handleSendText}>Send</Button>
              </Col>
            </Row>
          </Styled.ChatBlock>
        </Styled.Col>
        <Styled.Col span={2}></Styled.Col>
        <Styled.Col span={4}>
          <Styled.UsersBlock>
            <Text className="group-users">Users in Group</Text>
            {group?.users &&
              group.users.map((user) => {
                return <Row>{user.displayName}</Row>;
              })}
          </Styled.UsersBlock>
        </Styled.Col>
      </Styled.Row>
    </div>
  );
};

export default GroupDetails;
