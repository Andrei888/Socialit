import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Typography } from "antd";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
// models
import { Group } from "./redux/interfaces";
//utils
import {
  fetchGroupDetails,
  updateChatInGroupFirestore,
  removeUserFromGroupFirestore,
  disableGroupFirestore,
  deleteGroupFirestore,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/group-details/redux";
import {
  selectors as groupsSelector,
  actions as groupsAction,
} from "@features/groups/redux";
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
  const history = useHistory();

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

  const handleLeaveGroup = () => {
    async function removeUserFromGroup(groupId: string) {
      try {
        const response = await removeUserFromGroupFirestore(
          user,
          groupId,
          newMessage
        );
        if (response) {
          dispatch(groupsAction.updateGroupsList());

          history.push("/groups");
          setNewMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (user && groupId) {
      removeUserFromGroup(groupId);
    }
  };

  const handleDisableGroup = (disabled: boolean) => {
    async function disableGroupFromFirestore(groupId: string) {
      try {
        const response = await disableGroupFirestore(user, groupId, disabled);
        if (response) {
          dispatch(groupAction.updateGroupInfo());
          setNewMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (user && groupId) {
      disableGroupFromFirestore(groupId);
    }
  };

  if (group.seo !== groupId) {
    return null;
  }

  const checkGroupOwnerOrAdmin = (
    user: any,
    authorId: string | null,
    isDisabled?: boolean
  ) => {
    if ((isDisabled && authorId === user.id) || (isDisabled && user.isAdmin)) {
      return true;
    }
    return false;
  };

  const handleDeleteGroup = () => {
    async function deleteGroupFromFirestore(groupId: string) {
      try {
        const response = await deleteGroupFirestore(user, groupId);
        if (response) {
          setNewMessage("");
          history.push("/all-groups");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (user.isAdmin && groupId) {
      deleteGroupFromFirestore(groupId);
    }
  };

  return (
    <div>
      <Styled.Row>
        <Col>
          <Link to={`/groups`}>Back to my groups</Link>
        </Col>
      </Styled.Row>
      <Styled.Row
        className={group.isDisabled ? "group group-disabled" : "group"}
      >
        <Styled.Col span={18}>
          <Title className="group-name">{group.name}</Title>
          <Text className="group-name">{group.description}</Text>
          {group.author && (
            <Text className="group-author">Owner: {group.author}</Text>
          )}
          {checkGroupOwnerOrAdmin(user, group.authorId, !group.isDisabled) ? (
            <span className="group-btn-wrap group-author">
              <Button
                className="disable-group"
                onClick={(e) => handleDisableGroup(true)}
              >
                Disable Group
              </Button>
            </span>
          ) : checkGroupOwnerOrAdmin(user, group.authorId, group.isDisabled) ? (
            <span className="group-btn-wrap group-author">
              <Button
                className="disable-group"
                onClick={(e) => handleDisableGroup(false)}
              >
                Enable Group
              </Button>
            </span>
          ) : (
            <span className="group-btn-wrap group-user">
              <Button className="leave-group" onClick={handleLeaveGroup}>
                Leave Group
              </Button>
            </span>
          )}
          {user.isAdmin && (
            <span className="group-btn-wrap group-admin">
              <Button className="delete-group" onClick={handleDeleteGroup}>
                Delete Group
              </Button>
            </span>
          )}
          <MessagesBlock
            isDisabled={group.isDisabled}
            userId={user.id ?? ""}
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
                return <Row key={user.id}>{user.displayName}</Row>;
              })}
          </Styled.UsersBlock>
        </Styled.Col>
      </Styled.Row>
    </div>
  );
};

export default GroupDetails;
