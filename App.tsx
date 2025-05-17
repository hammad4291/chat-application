/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const App = () => {
  const [data, setData] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const doc = await firestore().collection("user").doc("o0XNbFCzUoeJMQ30xocC").get();
      console.warn("Fetched data:", doc.data());
      setData(doc.data() as { name: string });
    } catch (error) {
      console.warn('Error getting document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data ? (
        <Text style={styles.text}>Hello G{data.name}</Text>
      ) : (
        <Text style={styles.text}>No data found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default App;
