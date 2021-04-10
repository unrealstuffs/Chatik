import React, { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ChatUserList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";
import LoadingView from "../components/shared/LoadingView";
import Messenger from "../components/Messenger";

import {
    subscribeToChat,
    subscribeToProfile,
    sendChatMessage,
    subscribeToMessages,
} from "../actions/chats";

function Chat() {
    const { id } = useParams();
    const peopleWatchers = useRef({});
    const dispatch = useDispatch();
    const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
    const messages = useSelector(({ chats }) => chats.messages[id]);
    const joinedUsers = activeChat?.joinedUsers;

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));
        dispatch(subscribeToMessages(id));
        return () => {
            unsubFromChat();
            unsubFromJoinedUsers();
        };
    }, []);

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers);
    }, [joinedUsers]);

    const subscribeToJoinedUsers = useCallback(
        (jUsers) => {
            jUsers.forEach((user) => {
                if (!peopleWatchers.current[user.uid]) {
                    peopleWatchers.current[user.uid] = dispatch(
                        subscribeToProfile(user.uid, id)
                    );
                }
            });
        },
        [dispatch, id]
    );

    const sendMessage = useCallback(
        (message) => {
            dispatch(sendChatMessage(message, id));
        },
        [id]
    );

    const unsubFromJoinedUsers = useCallback(() => {
        Object.keys(peopleWatchers.current).forEach((id) =>
            peopleWatchers.current[id]()
        );
    }, [peopleWatchers.current]);

    if (!activeChat?.id) {
        return <LoadingView message="Loading Chat..." />;
    }

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUserList users={activeChat?.joinedUsers} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel ${activeChat?.name}`} />
                <ChatMessagesList messages={messages} />
                <Messenger onSubmit={sendMessage} />
            </div>
        </div>
    );
}

export default withBaseLayout(Chat, { canGoBack: true });
