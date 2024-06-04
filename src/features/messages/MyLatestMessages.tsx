import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// moddels
import { BasicUser } from "@app/models/user";

// utils
import { getUserLatestMessages } from "../../externalFeeds/firebase.utils";

// redux
import { actions, selectors } from "./redux";
// compoments

import GoToMessages from "@features/user/GoToMessages";
import { Styled } from "./MyLatestMessages.styled";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  if (!user.id) {
    return null;
  }

  return (
    <div>
      {latestMessages && latestMessages.length ? (
        <div>
          {latestMessages.map((message) => (
            <Styled.MsgBlock>
              <Styled.Row justify={"space-between"} align={"top"}>
                <Styled.Col>
                  <Styled.Title>{message.userName}</Styled.Title>
                  <Styled.Message className="message">
                    {message.text}
                  </Styled.Message>
                </Styled.Col>
                <Styled.Col>
                  <GoToMessages myId={user.id} friendId={message.userId} />
                </Styled.Col>
              </Styled.Row>
            </Styled.MsgBlock>
          ))}
        </div>
      ) : (
        "No messages."
      )}
    </div>
  );
};

export default MyLatestMessages;
