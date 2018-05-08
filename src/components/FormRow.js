import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const FormRow = (props) => {
  return (
    <View style={styles.container}>
      { props.children }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  }
})

export default FormRow
