import { GluestackUIProvider } from '@gluestack-ui/themed';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { config } from "@gluestack-ui/config";
import { Box, StatusBar, Text } from '@gluestack-ui/themed'

export default function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <View style={styles.container}>
          <StatusBar backgroundColor='#2c3e50' />
          <Box bg='#2c3e50' alignItems='center' justifyContent='center' safeAreaTop py={5}>
            <Text color='#fff' fontSize={20} fontWeight='bold'>
              Recipe App
            </Text>
          </Box>
        </View>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
