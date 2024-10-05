import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../../utils/AsyncStorage";
import i18n from "../../utils/i18n";

export const toggleTheme = createAsyncThunk(
  'theme/toggleTheme',
  async (theme) => {
    await setItem('theme', theme);
    return theme;
  }
);

export const getTheme = createAsyncThunk(
  'theme/getTheme',
  async () => {
    const theme = await getItem('theme');
    return theme || 'light';
  }
);

export const changeLangue = createAsyncThunk(
  'lang/changeLang',
  async (lang) => {
    await setItem('lang', lang);
    i18n.changeLanguage(lang)
    return lang;
  }
);


export const getLanguage = createAsyncThunk(
  'lang/getLang',
  async () => {
    const lang = await getItem('lang');
    return lang || 'uz';
  }
);

export const getPermission = createAsyncThunk(
  'permission/get',
  async () => {
    const permission = await getItem('permission');
    return permission;
  }
);
export const setPermission = createAsyncThunk(
  'permission/set',
  async (permission) => {
    await setItem('permission', permission);
    return permission;
  }
);
export const removePermisson = createAsyncThunk(
  'permission/remove',
  async (key) => {
    const permission = await removeItem(key);
    return permission;
  }
);

export const SwitchState = createSlice({
  name: "switchState",
  initialState: {
    theme: "light",
    language: 'uz',
    langLoad: false,
    themeLoad: false,
    isPermission: false,
    permission_load: false,
  },
  extraReducers: (builder) => {
    // function of language 
    builder.addCase(toggleTheme.pending, (state) => {
      state.themeLoad = true
    });
    builder.addCase(toggleTheme.fulfilled, (state, { payload }) => {
      state.theme = payload;
      state.themeLoad = false
    });
    builder.addCase(getTheme.pending, (state) => {
      state.themeLoad = true
    })
    builder.addCase(getTheme.fulfilled, (state, { payload }) => {
      state.theme = payload;
      state.themeLoad = false
    })
    // function of language 
    builder.addCase(changeLangue.pending, (state) => {
      state.langLoad = true
    });
    builder.addCase(changeLangue.fulfilled, (state, { payload }) => {
      state.language = payload;
      state.langLoad = false
    });
    builder.addCase(getLanguage.pending, (state) => {
      state.langLoad = true
    })
    builder.addCase(getLanguage.fulfilled, (state, { payload }) => {
      state.language = payload;
      state.langLoad = false
    })
    // permission function 
    builder.addCase(getPermission.fulfilled, (state, { payload }) => {
      state.isPermission = payload;
      state.permission_load = false
    })
    builder.addCase(getPermission.pending, (state) => {
      state.permission_load = true
    })
    builder.addCase(setPermission.fulfilled, (state, { payload }) => {
      state.isPermission = payload;
      state.permission_load = false
    })
    builder.addCase(setPermission.pending, (state) => {
      state.permission_load = true
    })
    builder.addCase(removePermisson.fulfilled, (state) => {
      state.isPermission = false
      state.permission_load = false
    })
  }
})

export default SwitchState.reducer
