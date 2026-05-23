import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Fonts } from '../../config/fonts';
import COLORS from '../../config/colors';

const TaskSegmentedControl = ({
  tabs = ['Today', 'Lesson Tests', 'Topic Tests', 'Subject Tests', 'My Grade Tests', 'Mock Tests'],
  activeTab = 'Today',
  onTabChange,
  equalWidthTabs = false,
  containerStyle = {},
}) => {
  const scrollViewRef = useRef(null);
  const tabRefs = useRef({});

  const handleTabPress = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Always call hooks first, then branch rendering
  useEffect(() => {
    if ((!(equalWidthTabs || tabs.length === 2)) && scrollViewRef.current && tabRefs.current[activeTab]) {
      setTimeout(() => {
        tabRefs.current[activeTab].measureLayout(
          scrollViewRef.current,
          (x, y, width, height) => {
            scrollViewRef.current.scrollTo({
              x: x - 20, // Subtract padding to align to left
              animated: true,
            });
          }
        );
      }, 100);
    }
  }, [activeTab, equalWidthTabs, tabs.length]);

  if (equalWidthTabs || tabs.length === 2) {
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }, containerStyle]}>
        {tabs.map((tab, idx) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                { flex: 1, minWidth: 140, marginHorizontal: idx === 0 ? 4 : 0 },
                isActive ? styles.activeTab : styles.inactiveTab,
                { maxWidth: 200 },
              ]}
              onPress={() => handleTabPress(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={true}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <View
            key={tab}
            ref={(ref) => {
              if (ref) tabRefs.current[tab] = ref;
            }}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                isActive ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => handleTabPress(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    marginBottom: 16,
    maxHeight: 36,
  },
  contentContainer: {
    gap: 8,
    paddingRight: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minHeight: 36,
    maxHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.PURPLE_PRIMARY,
  },
  inactiveTab: {
    backgroundColor: COLORS.PURPLE_LIGHT,
  },
  tabText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: COLORS.TEXT_SECONDARY,
  },
});

export default TaskSegmentedControl;
