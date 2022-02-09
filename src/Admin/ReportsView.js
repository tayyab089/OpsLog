import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Surface, Title, List} from 'react-native-paper';

const ReportsView = () => {
  const reportData = [
    {date: 'Date-1', data_pushed_x: 2, data_points_recorded: 200},
    {date: 'Date-2', data_pushed_x: 2, data_points_recorded: 200},
    {date: 'Date-3', data_pushed_x: 2, data_points_recorded: 200},
  ];

  return (
    <View style={styles.container}>
      <Surface style={styles.innercontainer}>
        <ScrollView>
          <Title>Summary Report</Title>
          {reportData.map(item => {
            return (
              <List.Accordion title={item.date} key={item.date}>
                <List.Subheader>Data Pushed X:</List.Subheader>
                <List.Item title={item.data_pushed_x} />
                <List.Subheader>Data Points Recorded:</List.Subheader>
                <List.Item title={item.data_points_recorded} />
              </List.Accordion>
            );
          })}
        </ScrollView>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  innercontainer: {
    height: '100%',
    padding: 20,
  },
  accordionContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default ReportsView;
