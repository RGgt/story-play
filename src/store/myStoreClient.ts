import { myStore } from './myStore';
import { incrementReducer } from './mySlice';

export function testMe() {
  console.log('testMe called');
  let currentState = myStore.getState();
  console.log(currentState.myData);

  myStore.dispatch(incrementReducer(44));
  console.log('testMe done');
}
