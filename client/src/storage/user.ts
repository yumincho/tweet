import { create } from "zustand";
import { userInfoProps } from "../types/user";

interface userInfoStoreProps extends userInfoProps {
  setNickname: (init: string) => void;

  setTweet: (init: number) => void;
  increaseTweet: () => void;
  // decreaseTweet: () => void;

  setComment: (init: number) => void;
  increaseComment: () => void;
  // decreaseComment: () => void;

  setLike: (init: number) => void;
  increaseLike: () => void;
  decreaseLike: () => void;
}

export const useUserInfoStore = create<userInfoStoreProps>((set) => ({
  nickname: "",
  tweetNum: 0,
  commentNum: 0,
  likeNum: 0,

  setNickname: (init) => set(() => ({ nickname: init })),

  setTweet: (init) => set(() => ({ tweetNum: init })),
  increaseTweet: () => set((state) => ({ tweetNum: state.tweetNum + 1 })),
  // decreaseTweet: () => set((state) => ({ tweetNum: state.tweetNum - 1 })),

  setComment: (init) => set(() => ({ commentNum: init })),
  increaseComment: () => set((state) => ({ commentNum: state.commentNum + 1 })),
  // decreaseComment: () => set((state) => ({ commentNum: state.commentNum - 1 })),

  setLike: (init) => set(() => ({ likeNum: init })),
  increaseLike: () => set((state) => ({ likeNum: state.likeNum + 1 })),
  decreaseLike: () => set((state) => ({ likeNum: state.likeNum - 1 })),
}));
