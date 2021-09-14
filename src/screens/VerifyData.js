import { Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import MultiSelect from "react-native-multiple-select";
import { Button } from "react-native-paper";
import {actions} from '../services/State/Reducer';
import {useStateValue} from '../services/State/State';

const TOC = ({ navigation, ...props }) => {
  const initial_bounties = [
    {
      tag: "Roman Letter Bounty",
      desc: "Roman Letter Bounty",
      checked: false,
      disabled: false,
    },
    {
      tag: "Normal",
      desc: "Normal",
      checked: false,
      disabled: false,
    },
    {
      tag: "Anonymization bounty",
      desc: "Anonymization Bounty (photos of faces)",
      checked: false,
      disabled: false,
    },
    {
      tag: "Traffic Sign bounty",
      desc: "Traffiic Sign Bounty",
      checked: false,
      disabled: false,
    },
    {
      tag: "Food bounty",
      desc: "Food Bounty",
      checked: false,
      disabled: false,
    },
    {
      tag: "Project.bb bounty",
      desc: "project.bb bounty(cigarette butt on the beach)",
      checked: false,
      disabled: false,
    },
    {
      tag: "NFT+art bounty",
      desc: "NFT Bounty(photos of NFTs)",
      checked: false,
      disabled: false,
    },
    {
      tag: "OCR bounty",
      desc: "OCR Bounty(photos with text in them)",
      checked: false,
      disabled: false,
    },
    {
      tag: "Meme bounty",
      desc: "Meme Bounty",
      checked: false,
      disabled: false,
    },
    {
      tag: "Product bounty",
      desc: "Product Bounty(photos of products)",
      checked: false,
      disabled: false,
    },
  ];

  const [bounties, setBounties] = useState(initial_bounties);
  const [selectedBounties, setSelectedBounties] = useState([]);
  const [, dispatch] = useStateValue();

  const handleBountySelection = (items) => {
    let _bounties = [];
    items.map((value) => {
      _bounties.push(value);
    });
    setSelectedBounties(items);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 47,
    },
    title: {
      textAlign: "center",
      fontSize: 24,
      color: "#41474E",
      marginTop: 30,
      fontWeight: "600",
      fontFamily: "Inter-Regular",
    },
    description: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "400",
      color: "#41474E",
      marginTop: 17,
      fontFamily: "Inter-Regular",
    },
    verify: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
      marginTop: 17,
      fontFamily: "Inter-Regular",
    },
    boxContainer: {
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 25,
    },
    boxHeader: {
      marginTop: 25,
      height: 50,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: "#E3E7FF",
      justifyContent: "center",
    },
    boxHeaderText: {
      textAlign: "center",
      fontSize: 13,
      color: "#000000",
      fontWeight: "500",
      fontFamily: "Inter-Regular",
    },
    boxContent: {
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      backgroundColor: "#F5F6FC",
      padding: 24,
    },
    textNormal: {
      fontSize: 12,
      lineHeight: 20,
      fontWeight: "300",
      fontFamily: "Inter-Regular",
    },
    textBold: {
      fontSize: 12,
      lineHeight: 20,
      fontWeight: "600",
      fontFamily: "Inter-Regular",
    },
    checkTOC: {
      marginTop: 15,
      fontSize: 12,
    },
    button: {
      backgroundColor: "#4E9CF9",
      borderRadius: 16,
      marginTop: 20,
    },
  });

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.title}>Verify data</Text>
      <Text style={styles.description}>
        Improve the DataUnion.app image dataset &nbsp; receive rewards. Flag
        inappropriate images, check that tags &nbsp; descriptions are fitting,
        and add missing tags. If a description is not fitting you can add
        another one. Bad actors will be weeded out by the democratic system.
      </Text>
      <Text style={styles.verify}>
        Verify-
        <Text>Personal Information, </Text>
        <Text>Tutorial, </Text>
        <Text>Data Bounties</Text>
      </Text>
      <MultiSelect
        hideTags
        hideSubmitButton
        items={bounties}
        uniqueKey="tag"
        selectText="Bounty"
        displayKey="tag"
        single={false}
        showFilter={false}
        canAddItems={false}
        selectedItems={selectedBounties}
        onSelectedItemsChange={(items) => {
          handleBountySelection(items);
        }}
        textInputProps={{
          editable: false,
        }}
        searchInputPlaceholderText="Bounties ..."
        selectedItemTextColor={"#00A5FF"}
        styleDropdownMenu={{
          height: 56,
        }}
      />
      <Button
        mode={"contained"}
        style={styles.button}
        onPress={() => {
          if (!(selectedBounties && selectedBounties.length > 0)) {
            dispatch({
              type: actions.SET_ALERT_SETTINGS,
              alertSettings: {
                show: true,
                type: "error",
                title: "Select atleast one bounty",
                showConfirmButton: true,
                confirmText: "Ok",
              },
            });
          } else {
            props.setBounties(selectedBounties);
          }
        }}
      >
        Next
      </Button>
    </ScrollView>
  );
};

export default TOC;
