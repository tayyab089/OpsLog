import React, {useRef, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Portal, Modal, Text} from 'react-native-paper';

const margin = 10;

const TrendModal = ({kks, visible, hideModal, dataItemsM, ready, mounted}) => {
  const labelsM = useRef([]);
  const datasetM = useRef([]);
  const [isThereData, setIsThereData] = useState(true);

  // Line Chart Data and configuration Start-----------------//
  const [dataLineChart, setdataLineChart] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  });

  const lineChartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(24, 165, 88, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(24, 165, 88, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#18A558',
    },
  };
  // Line Chart Data and configuration End-----------------//
  if (ready.current) {
    try {
      datasetM.current = dataItemsM
        .filter(x => x.kks === kks)
        .map(x => x.value);
      labelsM.current = dataItemsM
        .filter(x => x.kks === kks)
        .map(x => x.date.slice(4, 10));
      if (datasetM.current.length === 0 || labelsM.current.length === 0) {
        console.log(dataItemsM);
        setIsThereData(false);
      }
      if (mounted.current) {
        setdataLineChart({
          labels: labelsM.current,
          datasets: [
            {
              data: datasetM.current,
            },
          ],
        });
      }
      ready.current = false;
    } catch (err) {
      console.log(err);
    }
  }

  const containerStyle = {
    backgroundColor: 'white',
    padding: margin,
    margin: margin,
    borderRadius: 10,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        {isThereData ? (
          <View>
            <Text style={styles.heading}>{kks}</Text>
            <LineChart
              data={dataLineChart}
              width={Dimensions.get('window').width - margin * 4} // from react-native
              height={260}
              yAxisLabel=""
              yAxisSuffix=""
              verticalLabelRotation={45}
              //hidePointsAtIndex={ Array.from({length: 50}, (v, k) => (k%2 === 0) ? k : null) }
              chartConfig={lineChartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        ) : (
          <Text style={styles.heading}>
            No Historical Data Present for this KKS
          </Text>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: margin,
  },
  input: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  inputText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#18A558',
    padding: 0,
    height: 30,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  heading: {
    textAlign: 'center',
    color: '#18A558',
  },
});

export default TrendModal;
