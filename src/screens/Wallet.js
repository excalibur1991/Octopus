import React from 'react';
import {Text, View} from 'react-native';
import Button from '../components/Button';
import CopyTextBox from '../components/CopyTextBox';
import {styles} from '../styles/wallet';

const Wallet = () => {
  const credentials = [
    {
      oneLine: false,
      label: 'Memoric Phrase',
      value:
        'following guitar strings colors rainbow cranial nerves planets hello twitter follow kiss',
    },
    {
      oneLine: true,
      label: 'Password',
      value: '56/)&VS=DBLdjshBP',
    },
    {
      oneLine: true,
      label: 'Public Key',
      value:
        '0x046e386c879d76db3c6944b01e90e1f1825ff64ce1705ca91e76b2c3d8442a86b1ffc074fc5be1223944ad51966f485d5c912e62a128d16014b06f6ccf4068e9',
    },
    {
      oneLine: true,
      label: 'Private Key',
      value:
        '0xa1987de9a2694a9e176bec3c8666f87122f2d9b6ef9e6e3f039ff162e11867d6',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.head1}>1.2 QUICRA-0</Text>
          <Text style={styles.head2}>7.2 Ocean</Text>
        </View>
        <View style={styles.alignEnd}>
          <Text style={styles.head3}>24h Portfolio</Text>
          <Text style={styles.head4}>(+15.53%)</Text>
        </View>
      </View>
      <View style={styles.credentialsContainer}>
        {credentials.map((item, index) => (
          <CopyTextBox key={index} item={item} />
        ))}
      </View>
      <Button
        color="#f2f2f2"
        title="Delete Wallet"
        buttonStyle={styles.button}
        onPress={() => {}}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default Wallet;
