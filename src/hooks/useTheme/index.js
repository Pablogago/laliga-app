import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../actions/theme';
import { setToLS, getFromLS } from '../../utils/storage';

export default () => {
  const dispatch = useDispatch();
  const themes = getFromLS('all-themes');
  let selectedTheme = getFromLS('selected-theme');
  const [_theme, _setTheme] = useState(
    selectedTheme ? themes.data[selectedTheme.name] : themes.data.light
  );
  
  useEffect(() => {
    if (!selectedTheme) {
      setToLS('selected-theme', {"name": "light"});
    }
  }, [selectedTheme]);

  useEffect(() => {
    const themeName = selectedTheme ? selectedTheme.name : 'light';
    dispatch(setTheme({
      data: _theme,
      name: themeName
    }));
  }, [_theme]);

  const setMode = mode => {
    selectedTheme = mode;
    setToLS('selected-theme', mode);
    _setTheme(themes.data[mode.name]);
  };

  return { themeSelected: _theme,  setMode };
};