import React, {Component, Fragment} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Dimensions} from 'react-native';
// eslint-disable-next-line no-unused-vars
import {TouchableOpacity, Text, StatusBar, Linking, View} from 'react-native';

// import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class DataTrendQRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: true,
      ScanResult: false,
      result: null,
    };
  }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    this.props.navigation.navigate('DataTrend', {
      type: e.type,
      kks: e.data,
    });
    console.log('scanned data' + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
  };

  activeQR = () => {
    this.setState({
      scan: true,
    });
  };
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };
  render() {
    const {scan, ScanResult, result} = this.state;
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result !</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>
                    Click to Scan again!
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}

          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
            />
          )}
        </Fragment>
      </View>
    );
  }
}

const styles = {
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black',
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonScan: {
    width: 42,
  },
  descText: {
    padding: 16,
    textAlign: 'justify',
    fontSize: 16,
  },

  highlight: {
    fontWeight: '700',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: '#18A558',
    marginTop: 32,

    width: deviceWidth - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default DataTrendQRScanner;
