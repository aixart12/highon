import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useQuery } from 'react-query';
import { addLogUsingUuid, getAllLogs } from '../../../apis/logs.api';
import { ActivityLog } from '../../../interface/activityLog';
export type tableDataType = {
  name: string;
  place: string;
  time: string;
};

export const ActivityLogTable = () => {
  const { data: allLogs } = useQuery<ActivityLog[]>('get-allLogs', () => {
    return getAllLogs();
  });
  console.log(
    '🚀 ~ file: activitylogTable.tsx:38 ~ ActivityLogTable ~ allLogs',
    allLogs
  );

  return (
    <FlatGrid
      data={allLogs}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={0}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: '#631f70' }]}>
          <Text style={styles.item}>{item.UserId}</Text>
          <Text style={styles.item}>{item.location}</Text>
          <Text style={styles.item}>{item.updatedAt}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
  },
  itemContainer: {
    padding: 10,
    width: 300,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 7,
    // grid-template-columns: auto auto auto auto;
  },
  item: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
    width: '100%',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
