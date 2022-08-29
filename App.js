import React,  { useState, useEffect, useRef, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// import { SAMPLE_DATA } from './assets/data/sampleData'
import ListItem from './components/ListItem';
import Chart from './components/Chart';
import { getMarketData } from './services/cryptoService';

const ListHeader = () => (
  <>
      <View style={styles.styleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
      <View style={styles.divider} />
  </>
)

export default function App() {
  const [data, setData] = useState([]); 
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  const [selectedCoinData, setselectedCoinData] = useState(null);

  const openModal = (item) => {
    setselectedCoinData(item)
    bottomSheetModalRef.current.present();
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}>
        <View style={styles.contentContainer}>
          { selectedCoinData &&
            <Chart
              currentPrice={selectedCoinData.current_price}
              symbol={selectedCoinData.symbol}
              logoUrl={selectedCoinData.image}
              name={selectedCoinData.name}
              priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
              sparkline={selectedCoinData.sparkline_in_7d.price}
            />
          }
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  styleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation:5
  }
});
