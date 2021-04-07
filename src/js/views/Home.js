import React, { useEffect } from "react";
import JoinedChatsList from "../components/JoinedChatsList";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

import { useDispatch, useSelector } from "react-redux";

import { fetchChats } from "../actions/chats";
import Notification from "../utils/notifications";

function Home() {
    const dispatch = useDispatch();

    const chats = useSelector(({ chats }) => {
        return chats.items;
    });

    useEffect(() => {
        Notification.setup();
        dispatch(fetchChats());
    }, [dispatch]);

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChatsList chats={chats} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose your channel" />
                <AvailableChatsList chats={chats} />
            </div>
        </div>
    );
}

export default withBaseLayout(Home);
