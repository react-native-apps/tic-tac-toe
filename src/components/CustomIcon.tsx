import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {customIconType} from '../types';

type customIconProps = PropsWithChildren<{
  type: customIconType;
}>;

export default function CustomIcon({type}: customIconProps): JSX.Element {
  let iconElement;
  switch (type) {
    case 'circle':
      iconElement = <Icon name="circle-thin" size={58} color="#F7CD2E" />;
      break;
    case 'pencil':
      iconElement = <Icon name="pencil" size={58} color="#0D0D0D" />;
      break;
    default:
      iconElement = <Icon name="times" size={58} color="#38CC77" />;
      break;
  }
  return <Text style={styles.iconText}>{iconElement}</Text>;
}

const styles = StyleSheet.create({
  iconText: {},
});
