import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Input, Select } from "antd";
import { Link } from "react-router-dom";
// models
import { Group } from "./redux/interfaces";
// constants
import { groupSearchFields } from "@constants/options";
//utils
import {
  updateUserFirebase,
  getUserDetailsFirebase,
  findGroupsFirebase,
  joinGroupFirebase,
} from "../../externalFeeds/firebase.utils";

// redux
import {
  selectors as groupSelector,
  actions as groupAction,
} from "@features/groups/redux";
import { getUserDetails } from "@features/login/redux/selectors";

// components
import { Styled } from "./FindGroups.styled";
import { GroupUser } from "../group-details/redux/interfaces";

const { Title } = Typography;

const FindGroups: FC = () => {
  const user = useSelector(getUserDetails);
  const userGroups = useSelector(groupSelector.getGroups);

  const [groups, setUsers] = useState<Group[] | null>(null);
  const [searchIn, setSearchIn] = useState<string>("title");
  const [textQuery, setTextQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const search = async (text: string, searchIn: string) => {
    if (text.length > 2) {
      const foundGroups = await findGroupsFirebase(text, searchIn);
      setUsers(foundGroups);
    } else {
      setUsers(null);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value ?? "");
  };

  const addGroupHandler = async (groupId: string) => {
    if (user && groupId) {
      const updatedUser = await joinGroupFirebase(user, groupId);
      if (updatedUser) {
        dispatch(groupAction.updateGroupsList());
      }
    }
  };

  const handleSelectChange = (value: string) => {
    setSearchIn(value);
  };

  const checkIfUserInGroup = (usersList: GroupUser[] | null) => {
    if (
      usersList &&
      usersList.findIndex((groupUser) => groupUser.id === user.id) !== -1
    ) {
      return true;
    } else {
    }
  };

  useEffect(() => {
    if (textQuery) {
      setTextQuery(textQuery);
    }
  }, [userGroups]);

  useEffect(() => {
    if (textQuery) {
      search(textQuery, searchIn);
    }
  }, [textQuery, searchIn]);

  return (
    <Styled.Wrapper>
      <div>
        <Select
          options={groupSearchFields}
          value={searchIn}
          style={{ width: "100%", marginBottom: "15px" }}
          onChange={handleSelectChange}
        />
      </div>
      <div>
        <Input
          placeholder={`Search by ${searchIn}`}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div>
        {!groups?.length && textQuery && textQuery?.length > 2 && (
          <Styled.Message>No Groups Found!</Styled.Message>
        )}
        {!groups && textQuery && textQuery?.length < 3 && (
          <Styled.Message>Please Type minimum 3 characters!</Styled.Message>
        )}
        {groups &&
          groups?.map((group) => {
            return (
              <Styled.Row justify={"space-between"} align={"middle"}>
                <Styled.Col span={15}>
                  <Title>{group.name}</Title>
                </Styled.Col>
                <Styled.Col>
                  {checkIfUserInGroup(group.users) ? (
                    <Link className="new-group-btn" to={`/group/${group.id}`}>
                      <span>See Group</span>
                    </Link>
                  ) : (
                    <Button onClick={(e) => addGroupHandler(group.id)}>
                      Join Group
                    </Button>
                  )}
                </Styled.Col>
              </Styled.Row>
            );
          })}
      </div>
    </Styled.Wrapper>
  );
};

export default FindGroups;
