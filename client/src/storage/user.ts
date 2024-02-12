import { create } from "zustand";
import { userInfoProps } from "../types/user";

interface userInfoStoreProps extends userInfoProps {
  setNickname: (init: string) => void;
  setTweet: (init: number) => void;
  setComment: (init: number) => void;
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
  setComment: (init) => set(() => ({ commentNum: init })),
  setLike: (init) => set(() => ({ likeNum: init })),
  increaseLike: () => set((state) => ({ likeNum: state.likeNum + 1 })),
  decreaseLike: () => set((state) => ({ likeNum: state.likeNum - 1 })),
}));
