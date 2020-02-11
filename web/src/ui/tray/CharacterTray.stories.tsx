import React from "react";
import CharacterTray from "./CharacterTray";
import dragReducer from "../../state/drag-slice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { DroppableMonitor } from "../drag/DroppableMonitor";
import { Provider } from "react-redux";
import DndContext from "../drag/DndContext";
import { ICONS, IconType } from "../icons";
import noop from "../../util/noop";

export default {
  component: CharacterTray,
  title: "CharacterTray"
};

const monitor = new DroppableMonitor();
const store = configureStore({
  reducer: {
    drag: dragReducer
  },
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: monitor
    }
  })
});

const icons = ICONS.filter(icon => icon.type === IconType.token)
  .take(5)
  .toArray();

export const Default: React.FC = () => (
  <Provider store={store}>
    <DndContext.Provider value={monitor}>
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          left: 0,
          top: 0
        }}
      >
        <CharacterTray icons={icons} onIconRemoved={noop} />
      </div>
    </DndContext.Provider>
  </Provider>
);
