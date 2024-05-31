import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// moddels
import { BasicUser } from "@app/models/user";

// utils
import { getUserLatestMessages } from "../../externalFeeds/firebase.utils";

// redux
import { actions, selectors } from "./redux";
import useSelection from "antd/lib/table/hooks/useSelection";

interface MyLatestMessagesProps {
  user: BasicUser;
}
const MyLatestMessages: FC<MyLatestMessagesProps> = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();

  const latestMessages = useSelector(selectors.getLatestMessages);

  useEffect(() => {
    // get conversation
    async function getLatestUserMsg() {
      try {
        const messages = await getUserLatestMessages(user.id);

        console.log(messages);

        if (messages) {
          dispatch(
            actions.getLatestMessagesSuccess(
              messages.filter((msg: any) => msg != null)
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (user.id) {
      getLatestUserMsg();
    }
  }, [user.id]);

  if (!user.id) {
    return null;
  }

  return (
    <div>
      {latestMessages && latestMessages.length ? (
        <div>
          {latestMessages.map((message) => (
            <div>
              {message.userName} - {message.text}
            </div>
          ))}
        </div>
      ) : (
        "No messages."
      )}
    </div>
  );
};

export default MyLatestMessages;
