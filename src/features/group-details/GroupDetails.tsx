import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  KeyboardEventHandler,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography, Input, Checkbox } from "antd";
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
import MessagesBlock from "@features/messages/MessagesBlock";
import { Styled } from "./GroupDetails.styled";

const { Title, Text } = Typography;

const GroupDetails: FC = () => {
  const groupNotLoaded = useSelector(groupSelector.requestGroupInfo);
  const group = useSelector(groupSelector.getGroup);
  const user = useSelector(getUserDetails);

  const [groupId, setGroupId] = useState<string>();
  const [newMessage, setNewMessage] = useState<string>();

  const location = useLocation();
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
    if ((groupNotLoaded && groupId) || (groupId && groupId !== group.id)) {
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

  const handleKeyUp = (e: React.KeyboardEvent) => {
    console.log(e);
    if (e.keyCode === 13) {
      handleSendText();
    }
  };

  if (group.seo !== groupId) {
    return null;
  }

  console.log(groupInfo);

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
          {group.author && <Text className="group-author">{group.author}</Text>}
          {group.authorId === user.id ? (
            <Text className="group-author">
              <Button className="disable-group">Disable Group</Button>
            </Text>
          ) : (
            <Text className="group-user">
              <Button className="leave-group">Leave Group</Button>
            </Text>
          )}
          <MessagesBlock
            messages={group.chat}
            newMessage={newMessage}
            handleKeyUp={handleKeyUp}
            handleChangeText={handleChangeText}
            handleSendText={handleSendText}
          />
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
