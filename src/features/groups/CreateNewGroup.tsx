import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "antd";
//import {PlusCircleOutlined} from  'antd/'
// models
import { Group } from "./redux/interfaces";
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
import Input from "antd/lib/input/Input";

const { Title } = Typography;

const CreateNewGroup: FC = () => {
  const user = useSelector(getUserDetails);

  const [groups, setUsers] = useState<Group[] | null>(null);
  const [textQuery, setTextQuery] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      const foundUsers = await findGroupsFirebase(event.target.value);
      setUsers(foundUsers);
    } else {
      setUsers(null);
    }
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

  return (
    <div>
      <div>
        <Input placeholder="find" onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        {!groups && textQuery && textQuery?.length > 2 && (
          <p>No Users Found!</p>
        )}
        {!groups && textQuery && textQuery?.length < 3 && (
          <p>Please Type minimum 3 chars!</p>
        )}
        {groups &&
          groups?.map((group) => {
            return (
              <div>
                <Title>{group.name}</Title>
                <Button onClick={(e) => addGroupHandler(group.id)}>
                  Join Group
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreateNewGroup;
