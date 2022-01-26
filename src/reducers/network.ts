import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

import { Network } from '../services';

const timeStep = createAction<number, 'timestep'>('timestep');
const initNetwork = createAction<void, 'initNetwork'>('initNetwork');
const chooseValidator = createAction<void, 'chooseValidator'>('chooseValidator');

const networkReducer = createReducer(
  {
    validator: null,
    nodes: [],
    locations: [],
    timeCounter: 0,
  } as Network,
  {
    [timeStep.type]: (state, action: PayloadAction<number>) => {
      const stepAmount = action.payload;

      state.timeCounter += stepAmount;
      for (let i = 0; i < state.nodes.length; i++) {
        state.nodes[i].getAction(state.timeCounter); // TODO: Only retrieves action, need to perform it in a way that does not mutate!!
      }
    },
    [initNetwork.type]: (state, action) => {
      state.timeCounter = 1;
      // for (let nodeid = 0; nodeid < numNodes; nodeid++){
      //     let hostRole = new HostRole("general");
      //     let tempHost = new Host(nodeid, hostRole, []);
      //     this.nodeList.push(tempHost);
      // };
    },
    [chooseValidator.type]: (state, action) => {
      let randomNum = Math.floor(Math.random() * state.nodes.length);
      state.validator = state.nodes[randomNum].getId();
    },
  }
);

export default networkReducer;
