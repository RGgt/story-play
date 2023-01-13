import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pages: [
    {
      slots: [
        {
          name: 'namename',
          base64Texture: 'base64Texturebase64Texture',
          gameData: {
            gameType: '',
            gameDataJson: {},
          },
        },
      ],
    },
  ],
};

const savegamesSlice = createSlice({
  name: 'savegames',
  initialState,
  reducers: {
    createSavegame: (state, action) => {
      return {
        ...state,
        pages: state.pages.map((page, i) => {
          if (i !== action.payload.pageIndex) return page;
          return {
            ...page,
            slots: page.slots.map((slot, j) => {
              if (j !== action.payload.slotIndex) return slot;
              return { ...action.payload.savegame };
            }),
          };
        }),
      };
    },
    updateSavegameName: (state, action) => {
      return {
        ...state,
        pages: state.pages.map((page, i) => {
          if (i !== action.payload.pageIndex) return page;
          return {
            ...page,
            slots: page.slots.map((slot, j) => {
              if (j !== action.payload.slotIndex) return slot;
              return { ...slot, name: action.payload.name };
            }),
          };
        }),
      };
    },
    updateSavegameTexture: (state, action) => {
      return {
        ...state,
        pages: state.pages.map((page, i) => {
          if (i !== action.payload.pageIndex) return page;
          return {
            ...page,
            slots: page.slots.map((slot, j) => {
              if (j !== action.payload.slotIndex) return slot;
              return { ...slot, base64Texture: action.payload.texture };
            }),
          };
        }),
      };
    },
  },
});

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    updateSavegameData: (state, action) => {
      return {
        ...state,
        pages: state.pages.map((page, i) => {
          if (i !== action.payload.pageIndex) return page;
          return {
            ...page,
            slots: page.slots.map((slot, j) => {
              if (j !== action.payload.slotIndex) return slot;
              return {
                ...slot,
                gameData: {
                  ...slot.gameData,
                  gameDataJson: action.payload.data,
                },
              };
            }),
          };
        }),
      };
    },
  },
});

export const { createSavegame, updateSavegameName, updateSavegameTexture } =
  savegamesSlice.actions;
export const { updateSavegameData } = gameDataSlice.actions;

export const savegames = savegamesSlice.reducer;
export const gameData = gameDataSlice.reducer;
