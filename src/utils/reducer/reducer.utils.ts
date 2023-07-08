import { AnyAction } from "redux";

// export const createAction = (type, payload) => ({ type, payload });

//Typescript Overloading
export type ActionWithPayload<T, P> = {
  // try to change T to S
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>( // try to change T to S
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>; // try to change T to S

export function createAction<T extends string, P>(type: T, payload: P) {
  // try to change T to S
  // Try to remove extends string
  return { type, payload };
}

//typescript intersection

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}
