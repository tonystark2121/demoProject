/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import './gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Routes from './src/routes';

function App(): React.JSX.Element {
  return (
    <>
      <PaperProvider
        theme={{
          colors: {
            ...DefaultTheme.colors,
            primary: '#164B92',
            secondary: '#2789FD',
            outline: 'rgba(12, 47, 73, 0.5)',
            placeholder: 'rgba(12, 47, 73, 0.5)',
            surface: 'rgba(12, 47, 73, 0.5)',
            surfaceVariant: 'rgba(12, 47, 73, 0.5)',
            onSurfaceVariant: 'rgba(12, 47, 73, 0.5)',
            background: '#fff',
          },
        }}>
        <Routes />
      </PaperProvider>
    </>
  );
}

export default App;
