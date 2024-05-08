import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.accordionHeader}>
          <Text style={styles.accordionTitle}>{title}</Text>
          <TouchableOpacity onPress={onClick}>
            <Text style={styles.accordionIcon}>{isOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionContent}><Text style={styles.txt}>{content}</Text></View>}
    </View>
  );
};

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <View>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === activeIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
    accordionItem: {
      marginBottom: 10,
      borderBottomWidth:1,
      borderBottomColor:"#DADADA"
    },
    accordionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      padding: 10,
      borderRadius: 5,
    },
    accordionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    accordionIcon: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    accordionContent: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
    },
   
  });