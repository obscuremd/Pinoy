import { Text } from '@/src/Exports/Exports';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <Link href="/_sitemap" style={styles.link}>
          <Text text={'Go to home screen!'} color='text-primary-500'/>
        </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
