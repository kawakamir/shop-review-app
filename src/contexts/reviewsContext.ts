import {createContext} from "react";
import { Review } from "../types/review";
import {User} from "../types/user";

type ReviewsContextValue = {
    reviews: Review[];
    setReviews: (reviews: Review[]) =>  void;
}

export const ReviewsContext = createContext<ReviewsContextValue>({
    reviews: [],
    setReviews: () => {}
})
