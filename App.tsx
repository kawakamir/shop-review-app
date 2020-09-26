import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ShopReviewItem } from './src/components/ShopReviewItem'

import { getShops } from './src/lib/firebase'

import { Shop } from './src/types/shop'

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(
    () => {
      getFirebaseItems();
    }, []
  );

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  }


  const shopItems = shops.map((shop, index) => (
    <ShopReviewItem shop={shop} key={index.toString()} />
  ));

  return (
    <View style={styles.container}>
      {shopItems}
    </View>
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
